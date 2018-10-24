import moment from 'moment';
import Settings from '../../settings';
import Request from '../Request';
import Search from '../Search';
import ActivityActionCreators from './ActivityActionCreators';

const URL = `${Settings.apiUri}/sync/history`;

export default class TraktWebAPIUtils {
  static activityUrl(activity) {
    if (activity.type === `show`) {
      return `${URL}/episodes/${activity.ids.trakt}`;
    } else {
      return `${URL}/movies/${activity.ids.trakt}`;
    }
  }

  static addActivities(activities) {
    // noinspection JSIgnoredPromiseFromCall
    Request.send({
      method: `POST`,
      url: URL,
      params: TraktWebAPIUtils.activitiesPayload(activities),
      success: function (response) {
        const json = JSON.parse(response);
        /** @property json.added */
        ActivityActionCreators.syncSuccess(json.added.episodes, json.added.movies);
      },
      error: function (status, response) {
        ActivityActionCreators.syncFailed(status, response);
      }
    });
  }

  static activitiesPayload(activities) {
    const activitiesToAdd = activities.filter((activity) => activity.add);
    const movies = activitiesToAdd
      .filter((activity) => activity.trakt && activity.trakt.type === `movie`)
      .map(TraktWebAPIUtils.activityPayload.bind(TraktWebAPIUtils));
    const episodes = activitiesToAdd
      .filter((activity) => activity.trakt && activity.trakt.type === `show`)
      .map(TraktWebAPIUtils.activityPayload.bind(TraktWebAPIUtils));

    return {movies: movies, episodes: episodes};
  }

  static activityPayload(activity) {
    return {
      watched_at: activity.netflix.date,
      ids: {
        trakt: activity.trakt.ids.trakt
      }
    };
  }

  static async getActivity(options) {
    try {
      options.result = await TraktWebAPIUtils.searchItem(options);
      await TraktWebAPIUtils.getActivityHistory(options);
    } catch (error) {
      console.log(error);
    }
  }

  static getActivityHistory(options) {
    return new Promise((resolve, reject) => {
      // noinspection JSIgnoredPromiseFromCall
      Request.send({
        method: `GET`,
        url: TraktWebAPIUtils.activityUrl(options.result.activity),
        success: function (response) {
          let alreadyOnTrakt = false;
          const history = JSON.parse(response)[0];
          let date;

          if (history && history.watched_at) {
            date = moment(history.watched_at);
            alreadyOnTrakt = date.diff(options.netflix.date, `days`) === 0;
          }
          options.trakt = Object.assign(options.result.activity, {date});
          options.alreadyOnTrakt = alreadyOnTrakt;
          resolve();
        },
        error: reject
      });
    });
  }

  static searchItem(options) {
    const search = new Search({item: options.netflix});
    return new Promise((resolve, reject) => {
      search.find({
        success: function (response) {
          let activity = {
            type: options.netflix.type
          };

          if (options.netflix.type === `movie`) {
            activity = Object.assign(activity, response.movie);
          } else {
            activity = Object.assign(activity, response);
          }

          resolve({activity});
        },
        error: function (status, response) {
          reject(status, response);
        }
      });
    });
  }

  static getActivityFromURL(activity, url) {
    return new Promise((resolve, reject) => {
      if (!url) {
        reject();
      }

      const pathname = url.replace(`https://trakt.tv`, ``);

      // noinspection JSIgnoredPromiseFromCall
      Request.send({
        method: `GET`,
        url: `${Settings.apiUri}${pathname}?extended=images`,
        success: function (response) {
          const result = JSON.parse(response);
          const type = activity.netflix.type;

          if (type === `show`) {
            const slug = pathname.split(`/`)[2];
            // noinspection JSIgnoredPromiseFromCall
            Request.send({
              method: `GET`,
              url: `${Settings.apiUri}/shows/${slug}?extended=images`,
              success: function (res) {
                result.show = JSON.parse(res);
                TraktWebAPIUtils._parseActivityFromURL(activity, result, type)
                  .then(ActivityActionCreators.updateActivity.bind(ActivityActionCreators))
                  .catch(reject);
              },
              error: reject
            });
          } else {
            TraktWebAPIUtils._parseActivityFromURL(activity, result, type)
              .then(ActivityActionCreators.updateActivity.bind(ActivityActionCreators))
              .catch(reject);
          }
        },
        error: reject
      });
    });
  }

  static _parseActivityFromURL(activity, result, type) {
    const traktActivity = Object.assign(result, {type: type});
    return TraktWebAPIUtils.getActivityHistory(Object.assign({netflix: activity.netflix}, {result: {activity: traktActivity}}));
  }
}
