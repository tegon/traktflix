import moment from 'moment';
import Request from '../Request';
import Item from '../Item';
import TraktWebAPIUtils from './TraktWebAPIUtils';
import ActivityActionCreators from './ActivityActionCreators';

const AUTH_REGEXP = new RegExp(`"authURL":"(.*?)"`);
const BUILD_IDENTIFIER_REGEXP = new RegExp(`"BUILD_IDENTIFIER":"(.*?)"`);
const NETFLIX_HOST = `https://www.netflix.com`;
const NETFLIX_API_HOST = `${NETFLIX_HOST}/api/shakti`;

export default class NetflixWebAPIUtils {
  static extractAuthURL(response) {
    return AUTH_REGEXP.exec(response)[1];
  }

  static extractBuildIdentifier(response) {
    return BUILD_IDENTIFIER_REGEXP.exec(response)[1];
  }

  static activateAPI() {
    return new Promise((resolve, reject) => {
      // noinspection JSIgnoredPromiseFromCall
      Request.send({
        method: 'GET',
        url: `${NETFLIX_HOST}/Activate`,
        success: function (response) {
          const url = `${NETFLIX_API_HOST}/${NetflixWebAPIUtils.extractBuildIdentifier(response)}/viewingactivity?authURL=${NetflixWebAPIUtils.extractAuthURL(response)}`;
          resolve(url);
        },
        error: reject
      });
    });
  }

  static listActivities(url, page) {
    // noinspection JSIgnoredPromiseFromCall
    Request.send({
      method: 'GET',
      url: `${url}&pg=${page}`,
      success: (response) => {
        /**
         * @property {[]} viewedItems
         */
        const activities = JSON.parse(response).viewedItems;
        const parsedActivities = activities.map(NetflixWebAPIUtils.parseActivity.bind(NetflixWebAPIUtils));

        Promise.all(parsedActivities)
          .then(ActivityActionCreators.receiveActivities.bind(ActivityActionCreators))
          .catch(ActivityActionCreators.receiveActivitiesFailed.bind(ActivityActionCreators));
      },
      error: (response, status) => {
        console.log(response, status);
      }
    });
  }

  static getActivities(page = 0) {
    NetflixWebAPIUtils.activateAPI()
      .then(url => NetflixWebAPIUtils.listActivities(url, page));
  }

  /**
   * @param activity
   * @property {string} activity.episodeTitle
   * @property {string} activity.seasonDescriptor
   * @returns {Promise}
   */
  static parseActivity(activity) {
    const date = moment(activity.date);
    let item;
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
    return new Promise((resolve, reject) => {
      Object.assign(item, {id: activity.movieID});
      TraktWebAPIUtils.getActivity({item, date}).then(resolve).catch(reject);
    });
  }
}
