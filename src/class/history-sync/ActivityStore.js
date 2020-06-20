import EventEmitter from 'events';
import ActionTypes from '../../modules/history-sync/activity-constants';
import ViewingActivityAppDispatcher from '../../modules/history-sync/viewing-activity-app-dispatcher';
import Rollbar from '../Rollbar';

const CHANGE_EVENT = `CHANGE`;
let _page = 0;
let _activities = [];
let _isLoading = false;
let _isLoadingTraktData = true;
let _message = undefined;
let _addWithReleaseDate = false;

class ActivityStore extends EventEmitter {
  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getAll() {
    return _activities;
  }

  isLoading() {
    return _isLoading;
  }

  isLoadingTraktData() {
    return _isLoadingTraktData;
  }

  getMessage() {
    return _message;
  }

  getPage() {
    return _page;
  }

  toggleActivity(activity, value) {
    let toggle = _activities.find((a) => a === activity);
    toggle.add = value;
  }

  updateActivity(activity) {
    let activityToUpdate = _activities.find((a) => a.netflix.id === activity.netflix.id);
    activityToUpdate.trakt = activity.trakt;
    activityToUpdate.add = activity.add;
  }

  addWithReleaseDate() {
    return _addWithReleaseDate;
  }
}

const activityStore = new ActivityStore();
activityStore.dispatchToken = ViewingActivityAppDispatcher.register((action) => {
  switch (action.type) {
    case ActionTypes.FINISH_LOADING_SUGGESTIONS:
      _message = undefined;
      activityStore.emitChange();
      break;
    case ActionTypes.RESET_ACTIVITIES:
      _activities = [];
      _isLoading = true;
      _message = undefined;
      break;
    case ActionTypes.UPDATE_PAGE:
      _isLoading = true;
      _page = action.page;
      activityStore.emitChange();
      break;
    case ActionTypes.RECEIVE_ACTIVITIES:
      _activities = action.activities;
      _isLoading = false;
      _page = action.page;
      _message = undefined;
      activityStore.emitChange();
      break;
    case ActionTypes.RECEIVE_ACTIVITIES_FAILED:
      Rollbar.init().then(() => Rollbar.error(action));
      _isLoading = false;
      _message = browser.i18n.getMessage(`historyFailed`);
      activityStore.emitChange();
      break;
    case ActionTypes.START_LOADING_TRAKT_DATA:
      _isLoadingTraktData = true;
      _message = undefined;
      activityStore.emitChange();
      break;
    case ActionTypes.FINISH_LOADING_TRAKT_DATA:
      _isLoadingTraktData = false;
      _message = undefined;
      activityStore.emitChange();
      break;
    case ActionTypes.TOGGLE_ACTIVITY:
      activityStore.toggleActivity(action.activity, action.value);
      _isLoading = false;
      _message = undefined;
      activityStore.emitChange();
      break;
    case ActionTypes.UPDATE_ACTIVITY:
      activityStore.updateActivity(action.activity);
      _isLoading = false;
      _message = undefined;
      activityStore.emitChange();
      break;
    case ActionTypes.SYNC_SUCCESS:
      _isLoading = false;
      _message = `${browser.i18n.getMessage(`episodesAdded`)}: ${action.episodesCount}, ${browser.i18n.getMessage(`moviesAdded`)}: ${action.moviesCount}`;
      activityStore.emitChange();
      break;
    case ActionTypes.SYNC_FAILED:
      _isLoading = false;
      _message = browser.i18n.getMessage(`syncFailed`);
      activityStore.emitChange();
      break;
    case ActionTypes.ADD_WITH_RELEASE_DATE:
      _addWithReleaseDate = action.value;
      activityStore.emitChange();
      break;
  }
});
export default activityStore;
