import moment from 'moment';
import BrowserStorage from './BrowserStorage';
import Item from './Item';
import Permissions from './Permissions';
import Request from './Request';
import ActivityActionCreators from './history-sync/ActivityActionCreators';
import TraktWebAPIUtils from './history-sync/TraktWebAPIUtils';

const AUTH_REGEXP = new RegExp(`"authURL":"(.*?)"`);
const BUILD_IDENTIFIER_REGEXP = new RegExp(`"BUILD_IDENTIFIER":"(.*?)"`);
const NETFLIX_HOST = `https://www.netflix.com`;
const NETFLIX_API_HOST = `${NETFLIX_HOST}/api/shakti`;

const netflixApiUtils = {
  authUrl: ``,

  buildIdentifier: ``,

  isActivated: false,

  extractAuthURL(response) {
    return AUTH_REGEXP.exec(response)[1];
  },

  extractBuildIdentifier(response) {
    return BUILD_IDENTIFIER_REGEXP.exec(response)[1];
  },

  activateAPI() {
    return new Promise(async (resolve, reject) => {
      if (this.isActivated) {
        resolve();
        return;
      }
      const defs = await browser.runtime.sendMessage({type: `getApiDefs`});
      if (defs.authUrl && defs.buildIdentifier) {
        this.authUrl = defs.authUrl;
        this.buildIdentifier = defs.buildIdentifier;
        this.isActivated = true;
        resolve();
      } else {
        // noinspection JSIgnoredPromiseFromCall
        Request.send({
          method: `GET`,
          url: `${NETFLIX_HOST}/Activate`,
          success: response => {
            this.authUrl = this.extractAuthURL(response);
            this.buildIdentifier = this.extractBuildIdentifier(response);
            this.isActivated = true;
            resolve();
          },
          error: reject
        });
      }
    });
  },

  /**
   * @param {number} page The first page to load.
   * @param {number} [lastPage] The last page to load. Defaults to the first page. If -1, all pages are loaded.
   */
  async listActivities(page, lastPage) {
    if (!lastPage) {
      lastPage = page;
    }
    let loadAll = lastPage === -1;
    let isLastPage = false;
    const activities = [];
    while (!isLastPage && (loadAll || page <= lastPage)) {
      ActivityActionCreators.updatePage(page);
      try {
        const response = await Request.sendAndWait({
          method: `GET`,
          url: `${NETFLIX_API_HOST}/${this.buildIdentifier}/viewingactivity?languages=en-US&authURL=${this.authUrl}&pg=${page}`,
        });
        const _activities = JSON.parse(response).viewedItems;
        if (_activities.length) {
          activities.push(..._activities);
        } else {
          isLastPage = true;
        }
        page += 1;
      } catch (error) {
        ActivityActionCreators.receiveActivitiesFailed(error.status, error.response);
        console.log(error.status, error.response);
        return;
      }
    }
    const result = (await this.getActivitiesMetadata(activities)).map(this.parseActivity.bind(this));
    const parsedActivities = result.map(item => item.parsedItem);
    const promises = result.map(item => item.promise);
    ActivityActionCreators.receiveActivities(parsedActivities, page);
    const storage = await BrowserStorage.get(`options`);
    if (storage.options && storage.options.sendReceiveSuggestions && (await Permissions.contains(undefined, [`*://script.google.com/*`, `*://script.googleusercontent.com/*`]))) {
      Request.send({
        method: `GET`,
        url: `https://script.google.com/macros/s/AKfycbxaD_VEcZVv9atICZm00TWvF3XqkwykWtlGE8Ne39EMcjW5m3w/exec?ids=${encodeURIComponent(JSON.stringify(parsedActivities.map(activity => TraktWebAPIUtils._getTraktCacheId(activity))))}`,
        success: response => {
          const json = JSON.parse(response);
          for (const key in json) {
            if (!json.hasOwnProperty(key)) {
              continue;
            }
            const activity = parsedActivities.filter(parsedActivity => TraktWebAPIUtils._getTraktCacheId(parsedActivity) === key)[0];
            if (activity) {
              activity.suggestions = json[key].sort((a, b) => {
                if (a.count > b.count) {
                  return -1;
                }
                if (b.count > a.count) {
                  return 1;
                }
                return 0;
              });
            } else {
              activity.suggestions = null;
            }
          }
          ActivityActionCreators.finishLoadingSuggestions();
        },
        error: () => {}
      });
    }
    Promise.all(promises)
      .then(ActivityActionCreators.finishLoadingTraktData.bind(ActivityActionCreators));
  },

  getActivities(page = 0, lastPage = 0) {
    ActivityActionCreators.resetActivities();
    ActivityActionCreators.startLoadingTraktData();
    this.activateAPI()
      .then(() => this.listActivities(page, lastPage));
  },

  /**
   * @param activity
   * @property {string} activity.episodeTitle
   * @property {string} activity.seasonDescriptor
   * @returns {Object}
   */
  parseActivity(activity) {
    const date = moment(activity.date);
    const type = typeof activity.series === `undefined` ? `movie` : `show`;
    let itemProps;
    if (type === `show`) {
      const title = activity.seriesTitle;
      const epTitle = activity.episodeTitle.trim();
      let season = ``;
      let isCollection = false;
      const matches = activity.seasonDescriptor.match(/Season\s(\d+)/);
      if (matches) {
        season = parseInt(matches[1]);
      } else {
        if (activity.season) {
          season = activity.season;
        }
        isCollection = true;
      }
      itemProps = {
        epTitle,
        isCollection,
        title,
        season,
        type
      };
      if (activity.episode) {
        itemProps.episode = activity.episode;
      }
    } else {
      itemProps = {
        title: activity.title,
        type
      };
      if (activity.year) {
        itemProps.year = activity.year;
      }
    }
    const item = new Item(itemProps);
    item.id = activity.movieID;
    item.date = date;
    const parsedItem = {
      add: false,
      netflix: item
    };
    return {parsedItem, promise: TraktWebAPIUtils.getActivity(parsedItem)};
  },

  getActivitiesMetadata(activities) {
    return new Promise(resolve => {
      Request.send({
        method: `POST`,
        params: {
          authURL: this.authUrl,
          paths: activities.map(activity => [`videos`, activity.movieID, [`releaseYear`, `summary`]])
        },
        url: `${NETFLIX_API_HOST}/${this.buildIdentifier}/pathEvaluator?languages=en-US`,
        success: response => {
          const json = JSON.parse(response);
          activities = activities.map(activity => {
            const info = json.value.videos[activity.movieID];
            if (info) {
              activity.episode = info.summary.episode;
              activity.season = info.summary.season;
              activity.year = info.releaseYear;
            }
            return activity;
          });
          resolve(activities);
        },
        error: (status, response) => {
          console.log(status, response);
          resolve(activities);
        }
      })
    });
  },

  getMetadata(id) {
    return new Promise(async resolve => {
      await this.activateAPI();
      Request.send({
        method: `GET`,
        url: `${NETFLIX_API_HOST}/${this.buildIdentifier}/metadata?languages=en-US&movieid=${id}`,
        success: response => {
          resolve(this.parseMetadata(response));
        },
        error: (status, response) => {
          console.log(status, response);
          resolve(null);
        }
      });
    });
  },

  parseMetadata(response) {
    const json = JSON.parse(response);
    const title = json.video.title;
    const type = json.video.type;
    const year = json.video.year;
    if (type === `show`) {
      let episodeInfo;
      const info = json.video.seasons.filter(season => season.episodes.filter(episode => {
        const match = episode.id === json.video.currentEpisode;
        if (match) {
          episodeInfo = episode;
        }
        return match;
      })[0]);
      const seasonInfo = info[0];
      const isCollection = seasonInfo.shortName.match(/C/);
      const season = seasonInfo.seq;
      const episode = episodeInfo.seq;
      const epTitle = episodeInfo.title;
      return new Item({episode, epTitle, isCollection, season, title, type});
    } else {
      return new Item({title, type, year});
    }
  }
};

export default netflixApiUtils;
