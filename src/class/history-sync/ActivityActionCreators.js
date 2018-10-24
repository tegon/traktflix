import ViewingActivityAppDispatcher from '../../modules/history-sync/viewing-activity-app-dispatcher';
import ActionTypes from '../../modules/history-sync/activity-constants';

export default class ActivityActionCreators {
  static resetActivities() {
    ViewingActivityAppDispatcher.dispatch({
      type: ActionTypes.RESET_ACTIVITIES
    });
  }

  static receiveActivities(activities) {
    ViewingActivityAppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_ACTIVITIES,
      activities: activities.filter((activity) => !!activity)
    });
  }

  static receiveActivitiesFailed(status, response) {
    ViewingActivityAppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_ACTIVITIES_FAILED,
      status: status,
      response: response
    });
  }

  static startLoadingTraktData() {
    ViewingActivityAppDispatcher.dispatch({
      type: ActionTypes.START_LOADING_TRAKT_DATA
    });
  }

  static finishLoadingTraktData() {
    ViewingActivityAppDispatcher.dispatch({
      type: ActionTypes.FINISH_LOADING_TRAKT_DATA
    });
  }

  static toggleActivity(activity, value) {
    ViewingActivityAppDispatcher.dispatch({
      type: ActionTypes.TOGGLE_ACTIVITY,
      activity: activity,
      value: value
    });
  }

  static updateActivity(activity) {
    ViewingActivityAppDispatcher.dispatch({
      type: ActionTypes.UPDATE_ACTIVITY,
      activity: activity
    });
  }

  static syncSuccess(episodesCount, moviesCount) {
    ViewingActivityAppDispatcher.dispatch({
      type: ActionTypes.SYNC_SUCCESS,
      episodesCount: episodesCount,
      moviesCount: moviesCount
    });
  }

  static syncFailed(status, response) {
    ViewingActivityAppDispatcher.dispatch({
      type: ActionTypes.SYNC_FAILED,
      status: status,
      response: response
    });
  }
}
