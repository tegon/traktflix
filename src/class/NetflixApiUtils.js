import moment from 'moment';
import Request from './Request';
import Item from './Item';
import TraktWebAPIUtils from './history-sync/TraktWebAPIUtils';
import ActivityActionCreators from './history-sync/ActivityActionCreators';

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
    return new Promise((resolve, reject) => {
      if (this.isActivated) {
        resolve();
        return;
      }
      chrome.runtime.sendMessage({type: `getApiDefs`}, defs => {
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
      })
    });
  },

  listActivities(page) {
    // noinspection JSIgnoredPromiseFromCall
    Request.send({
      method: `GET`,
      url: `${NETFLIX_API_HOST}/${this.buildIdentifier}/viewingactivity?authURL=${this.authUrl}&pg=${page}`,
      success: async response => {
        /**
         * @property {[]} viewedItems
         */
        const activities = JSON.parse(response).viewedItems;
        const result = (await this.getActivitiesMetadata(activities)).map(this.parseActivity.bind(this));
        const parsedActivities = result.map(item => item.parsedItem);
        const promises = result.map(item => item.promise);
        ActivityActionCreators.receiveActivities(parsedActivities);
        Promise.all(promises)
          .then(ActivityActionCreators.finishLoadingTraktData.bind(ActivityActionCreators));
      },
      error: (response, status) => {
        ActivityActionCreators.receiveActivitiesFailed(response, status);
        console.log(response, status);
      }
    });
  },

  getActivities(page = 0) {
    ActivityActionCreators.resetActivities();
    ActivityActionCreators.startLoadingTraktData();
    this.activateAPI()
      .then(() => this.listActivities(page));
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
        url: `${NETFLIX_API_HOST}/${this.buildIdentifier}/pathEvaluator`,
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
        error: (response, status) => {
          console.log(response, status);
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
        url: `${NETFLIX_API_HOST}/${this.buildIdentifier}/metadata?movieid=${id}`,
        success: response => {
          resolve(this.parseMetadata(response));
        },
        error: (response, status) => {
          console.log(response, status);
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
