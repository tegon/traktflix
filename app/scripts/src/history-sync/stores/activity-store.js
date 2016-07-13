import EventEmitter from 'events';
import Rollbar from '../../rollbar';

import ViewingActivityAppDispatcher from '../dispatcher/viewing-activity-app-dispatcher';
import ActionTypes from '../constants/activity-constants';
import NetflixWebAPIUtils from '../utils/netflix-web-api-utils';

const CHANGE_EVENT = 'CHANGE';

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

let instance = new ActivityStore();

instance.dispatchToken = ViewingActivityAppDispatcher.register((action) => {
  switch(action.type) {
    case ActionTypes.RECEIVE_ACTIVITIES:
      _activities = action.activities;
      _page++
      _message = undefined;
      instance.emitChange();
      break;
    case ActionTypes.RECEIVE_ACTIVITIES_FAILED:
      console.log(action);
      Rollbar.error(action);
      _message = action;
      instance.emitChange();
      break;
    case ActionTypes.TOGGLE_ACTIVITY:
      instance.toggleActivity(action.activity, action.value);
      _message = undefined;
      instance.emitChange();
      break;
    case ActionTypes.UPDATE_ACTIVITY:
      instance.updateActivity(action.activity);
      _message = undefined;
      instance.emitChange();
      break;
    case ActionTypes.SYNC_SUCCESS:
      _message = `Episodes added: ${action.episodesCount}, Movies added: ${action.moviesCount}`;
      instance.emitChange();
      break;
    case ActionTypes.SYNC_FAILED:
      _message = 'Sync failed :(. We will work on a solution soon.';
      instance.emitChange();
      break;
  }
});

export default instance;
