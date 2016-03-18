import moment from 'moment';

import Request from '../../request';
import Item from '../../content/item';

import TraktWebAPIUtils from './trakt-web-api-utils';
import ActivityActionCreators from '../actions/activity-action-creators';

const AUTH_REGEXP = new RegExp("\"authURL\":\"(.*?)\"");
const BUILD_IDENTIFIER_REGEXP = new RegExp("\"BUILD_IDENTIFIER\":\"(.*?)\"");
const NETFLIX_HOST = 'https://www.netflix.com';
const NETFLIX_API_HOST = `${NETFLIX_HOST}/api/shakti`;

export default class NetflixWebAPIUtils {
  static extractAuthURL(response) {
    return AUTH_REGEXP.exec(response)[1];
  }

  static extractBuildIndentifier(response) {
    return BUILD_IDENTIFIER_REGEXP.exec(response)[1];
  }

  static activateAPI() {
    return new Promise((resolve, reject) => {
      Request.send({
        method: 'GET',
        url: `${NETFLIX_HOST}/Activate`,
        success: function(response) {
          let url = `${NETFLIX_API_HOST}/${NetflixWebAPIUtils.extractBuildIndentifier(response)}/viewingactivity?authURL=${NetflixWebAPIUtils.extractAuthURL(response)}`;
          resolve(url);
        },
        error: reject
      });
    });
  }

  static listActivities(url, page) {
    Request.send({
      method: 'GET',
      url: `${url}&pg=${page}`,
      success: (response) => {
        let activities = JSON.parse(response).viewedItems;
        let parsedActivities = activities
          .map(NetflixWebAPIUtils.parseActivity)
          .filter((activity) => !!activity);

        Promise.all(parsedActivities)
          .then(ActivityActionCreators.receiveActivities)
          .catch(ActivityActionCreators.receiveActivitiesFailed);
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

  static parseActivity(activity) {
    let date = moment(activity.date);
    let item;
    let type = activity.series == undefined ? 'movie' : 'show';

    if (type === 'show') {
      let title = activity.seriesTitle;
      let splittedTitle = activity.title.split(':');
      let season = splittedTitle[0].match(/\d+/g);
      if (season) {
        season = parseInt(season[0]);
      } else {
        return;
      }
      let epTitle = splittedTitle[1].trim().replace('"', '').replace('"', '');

      item = new Item({
        epTitle: epTitle,
        title: title,
        season: season,
        type: type
      });
    } else {
      item = new Item({ title: activity.title, type: type });
    }

    return new Promise((resolve, reject) => {
      TraktWebAPIUtils.getActivity({ item, date }).then(resolve).catch(reject);
    });
  }
}
