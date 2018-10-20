import EventEmitter from 'events';
import Rollbar from '../Rollbar';
import ViewingActivityAppDispatcher from '../../modules/history-sync/viewing-activity-app-dispatcher';
import ActionTypes from '../../modules/history-sync/activity-constants';

const CHANGE_EVENT = `CHANGE`;
let _page = 0;
let _activities = [];
let _message = undefined;

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
}

const activityStore = new ActivityStore();
activityStore.dispatchToken = ViewingActivityAppDispatcher.register((action) => {
  switch(action.type) {
    case ActionTypes.RECEIVE_ACTIVITIES:
      _activities = action.activities;
      _page += 1;
      _message = undefined;
      activityStore.emitChange();
      break;
    case ActionTypes.RECEIVE_ACTIVITIES_FAILED:
      console.log(action);
      Rollbar.init().then(() => Rollbar.error(action));
      _message = action;
      activityStore.emitChange();
      break;
    case ActionTypes.TOGGLE_ACTIVITY:
      activityStore.toggleActivity(action.activity, action.value);
      _message = undefined;
      activityStore.emitChange();
      break;
    case ActionTypes.UPDATE_ACTIVITY:
      activityStore.updateActivity(action.activity);
      _message = undefined;
      activityStore.emitChange();
      break;
    case ActionTypes.SYNC_SUCCESS:
      _message = `Episodes added: ${action.episodesCount}, Movies added: ${action.moviesCount}`;
      activityStore.emitChange();
      break;
    case ActionTypes.SYNC_FAILED:
      _message = `Sync failed :(. We will work on a solution soon.`;
      activityStore.emitChange();
      break;
  }
});
export default activityStore;
