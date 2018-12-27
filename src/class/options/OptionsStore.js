import EventEmitter from 'events';
import Rollbar from '../Rollbar';
import ViewingOptionsAppDispatcher from '../../modules/options/viewing-options-app-dispatcher';
import ActionTypes from '../../modules/options/options-constants';

const CHANGE_EVENT = `CHANGE`;
let _options = [];
let _message = undefined;

class OptionsStore extends EventEmitter {
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
    return _options;
  }

  getMessage() {
    return _message;
  }

  toggleOption(option, value) {
    let toggle = _options.find((a) => a === option);
    toggle.add = value;
  }
}

const optionsStore = new OptionsStore();
optionsStore.dispatchToken = ViewingOptionsAppDispatcher.register((action) => {
  switch (action.type) {
    case ActionTypes.RECEIVE_OPTIONS:
      _options = action.options;
      _message = undefined;
      optionsStore.emitChange();
      break;
    case ActionTypes.RECEIVE_OPTIONS_FAILED:
      Rollbar.init().then(() => Rollbar.error(action));
      _message = action;
      optionsStore.emitChange();
      break;
    case ActionTypes.TOGGLE_OPTION:
      optionsStore.toggleOption(action.option, action.value);
      _message = undefined;
      optionsStore.emitChange();
      break;
    case ActionTypes.SAVE_SUCCESS:
      _message = chrome.i18n.getMessage(`saveOptionsSuccess`);
      optionsStore.emitChange();
      break;
    case ActionTypes.SAVE_FAILED:
      Rollbar.init().then(() => Rollbar.error(action));
      _message = chrome.i18n.getMessage(`saveOptionsFailed`);
      optionsStore.emitChange();
      break;
    case ActionTypes.CLEAR_SUCCESS:
      _message = chrome.i18n.getMessage(`clearOptionsSuccess`);
      optionsStore.emitChange();
      break;
    case ActionTypes.CLEAR_FAILED:
      Rollbar.init().then(() => Rollbar.error(action));
      _message = chrome.i18n.getMessage(`clearOptionsFailed`);
      optionsStore.emitChange();
      break;
    case ActionTypes.CLEAR_TRAKT_CACHE_SUCCESS:
      _message = chrome.i18n.getMessage(`clearTraktCacheSuccess`);
      optionsStore.emitChange();
      break;
    case ActionTypes.CLEAR_TRAKT_CACHE_FAILED:
      Rollbar.init().then(() => Rollbar.error(action));
      _message = chrome.i18n.getMessage(`clearTraktCacheFailed`);
      optionsStore.emitChange();
      break;
  }
});
export default optionsStore;
