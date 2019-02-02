import ActionTypes from '../../modules/history-sync/activity-constants';
import ViewingActivityAppDispatcher from '../../modules/history-sync/viewing-activity-app-dispatcher';

export default class ActivityActionCreators {
  static finishLoadingSuggestions() {
    ViewingActivityAppDispatcher.dispatch({
      type: ActionTypes.FINISH_LOADING_SUGGESTIONS
    });
  }

  static resetActivities() {
    ViewingActivityAppDispatcher.dispatch({
      type: ActionTypes.RESET_ACTIVITIES
    });
  }

  static updatePage(page) {
    ViewingActivityAppDispatcher.dispatch({
      type: ActionTypes.UPDATE_PAGE,
      page
    });
  }

  static receiveActivities(activities, page) {
    ViewingActivityAppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_ACTIVITIES,
      activities: activities.filter((activity) => !!activity),
      page
    });
  }

  static receiveActivitiesFailed(status, response) {
    ViewingActivityAppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_ACTIVITIES_FAILED,
      status,
      response
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
      activity,
      value
    });
  }

  static updateActivity(activity) {
    ViewingActivityAppDispatcher.dispatch({
      type: ActionTypes.UPDATE_ACTIVITY,
      activity
    });
  }

  static syncSuccess(episodesCount, moviesCount) {
    ViewingActivityAppDispatcher.dispatch({
      type: ActionTypes.SYNC_SUCCESS,
      episodesCount,
      moviesCount
    });
  }

  static syncFailed(status, response) {
    ViewingActivityAppDispatcher.dispatch({
      type: ActionTypes.SYNC_FAILED,
      status,
      response
    });
  }
}
