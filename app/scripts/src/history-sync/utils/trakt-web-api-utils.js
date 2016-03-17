import moment from 'moment';

import Settings from '../../settings';
import Request from '../../request';
import Search from '../../content/search';

import ActivityActionCreators from '../actions/activity-action-creators';

const URL = `${Settings.apiUri}/sync/history`;

export default class TraktWebAPIUtils {
  static activityUrl(activity) {
    if (activity.type === 'show') {
      return `${URL}/episodes/${activity.ids.trakt}`;
    } else {
      return `${URL}/movies/${activity.ids.trakt}`;
    }
  }

  static addActivities(activities) {
    Request.send({
      method: 'POST',
      url: URL,
      params: TraktWebAPIUtils.activitiesPayload(activities),
      success: function(response) {
        let json = JSON.parse(response);
        ActivityActionCreators.syncSuccess(json.added.episodes, json.added.movies);
      },
      error: function(status, response) {
        ActivityActionCreators.syncFailed(status, response);
      }
    });
  }

  static activitiesPayload(activities) {
    let activitiesToAdd = activities.filter((activity) => activity.add);
    let movies = activitiesToAdd
      .filter((activity) => activity.trakt.type === 'movie')
      .map(TraktWebAPIUtils.activityPayload);
    let episodes = activitiesToAdd
      .filter((activity) => activity.trakt.type === 'show')
      .map(TraktWebAPIUtils.activityPayload);

    return { movies: movies, episodes: episodes };
  }

  static activityPayload(activity) {
    return {
      'watched_at': activity.netflix.date,
      'ids': {
        'trakt': activity.trakt.ids.trakt
      }
    }
  }

  static getActivity(options) {
    return new Promise((resolve, reject) => {
      TraktWebAPIUtils.searchItem(options)
        .then((result) => {
          Request.send({
            method: 'GET',
            url: TraktWebAPIUtils.activityUrl(result.activity),
            success: function(response) {
              let include = false;
              let history = JSON.parse(response)[0];
              let date;

              if (history && history.watched_at) {
                date = moment(history.watched_at);
                include = date.diff(result.date, 'days') == 0;
              }
              let trakt = Object.assign(result.activity, { date: date });
              let netflix = Object.assign(options.item, { date: options.date });

              resolve(Object.assign({ netflix, trakt }, { add: !include }));
            },
            error: function(status, response) {
              reject(status, response);
            }
          });
        })
        .catch((status, response) => resolve(null));
    });
  }

  static searchItem(options) {
    let search = new Search({ item: options.item });
    return new Promise((resolve, reject) => {
      search.find({
        success: function(response) {
          let activity = {
            type: options.item.type
          };

          if (options.item.type === 'movie') {
            activity = Object.assign(activity, response.movie);
          } else {
            activity = Object.assign(activity, response);
          }

          resolve({ activity: activity, date: options.date });
        },
        error: function(status, response) {
          reject(status, response);
        }
      });
    });
  }
}
