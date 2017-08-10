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
      .filter((activity) => activity.trakt && activity.trakt.type === 'movie')
      .map(TraktWebAPIUtils.activityPayload);
    let episodes = activitiesToAdd
      .filter((activity) => activity.trakt && activity.trakt.type === 'show')
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
          TraktWebAPIUtils.getActivityHistory(Object.assign(options, { result: result })).then(resolve).catch(reject);
        })
        .catch((status, response) => {
          let netflix = Object.assign(options.item, { date: options.date });
          resolve(Object.assign({ netflix }, { add: false }));
        });
    });
  }

  static getActivityHistory(options) {
    return new Promise((resolve, reject) => {
      Request.send({
        method: 'GET',
        url: TraktWebAPIUtils.activityUrl(options.result.activity),
        success: function(response) {
          let exclude = false;
          let history = JSON.parse(response)[0];
          let date;

          if (history && history.watched_at) {
            date = moment(history.watched_at);
            exclude = date.diff(options.result.date, 'days') == 0;
          }
          let trakt = Object.assign(options.result.activity, { date: date });
          let netflix = Object.assign(options.item, { date: options.date });

          resolve(Object.assign({ netflix, trakt }, { add: !exclude }));
        },
        error: reject
      });
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

  static getActivityFromURL(activity, url) {
    return new Promise((resolve, reject) => {
      if (!url) { reject(); }

      let pathname = url.replace('https://trakt.tv', '');

      Request.send({
        method: 'GET',
        url: `${Settings.apiUri}${pathname}?extended=images`,
        success: function(response) {
          let result = JSON.parse(response);
          let type = activity.netflix.type;

          if (type === 'show') {
            let slug = pathname.split('/')[2];
            Request.send({
              method: 'GET',
              url: `${Settings.apiUri}/shows/${slug}?extended=images`,
              success: function(res) {
                result.show = JSON.parse(res);
                TraktWebAPIUtils._parseActivityFromURL(activity, result, type)
                  .then(ActivityActionCreators.updateActivity)
                  .catch(reject);
              },
              error: reject
            });
          } else {
            TraktWebAPIUtils._parseActivityFromURL(activity, result, type)
              .then(ActivityActionCreators.updateActivity)
              .catch(reject);
          }
        },
        error: reject
      });
    });
  }

  static _parseActivityFromURL(activity, result, type) {
    let traktActivity = Object.assign(result, { type: type });
    return TraktWebAPIUtils.getActivityHistory(Object.assign({ item: activity.netflix }, { result: { activity: traktActivity } }, { date: activity.netflix.date }));
  }
}
