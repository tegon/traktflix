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
    });
  },

  listActivities(page) {
    // noinspection JSIgnoredPromiseFromCall
    Request.send({
      method: `GET`,
      url: `${NETFLIX_API_HOST}/${this.buildIdentifier}/viewingactivity?authURL=${this.authUrl}&pg=${page}`,
      success: (response) => {
        /**
         * @property {[]} viewedItems
         */
        const activities = JSON.parse(response).viewedItems;
        const parsedActivities = activities.map(this.parseActivity.bind(this));

        Promise.all(parsedActivities)
          .then(ActivityActionCreators.receiveActivities.bind(ActivityActionCreators))
          .catch(ActivityActionCreators.receiveActivitiesFailed.bind(ActivityActionCreators));
      },
      error: (response, status) => {
        console.log(response, status);
      }
    });
  },

  getActivities(page = 0) {
    this.activateAPI()
      .then(() => this.listActivities(page));
  },

  /**
   * @param activity
   * @property {string} activity.episodeTitle
   * @property {string} activity.seasonDescriptor
   * @returns {Promise}
   */
  parseActivity(activity) {
    return new Promise(async (resolve, reject) => {
      const date = moment(activity.date);
      let item = await this.getMetadata(activity.movieID);
      if (!item) {
        const type = typeof activity.series === `undefined` ? `movie` : `show`;
        if (type === `show`) {
          const title = activity.seriesTitle;
          let season = activity.seasonDescriptor.match(/\d+/g);
          const epTitle = activity.episodeTitle.trim();
          if (season) {
            season = parseInt(season[0]);
          }
          item = new Item({
            epTitle: epTitle,
            title: title,
            season: season,
            type: type
          });
        } else {
          item = new Item({title: activity.title, type: type});
        }
      }
      Object.assign(item, {id: activity.movieID});
      TraktWebAPIUtils.getActivity({item, date}).then(resolve).catch(reject);
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
