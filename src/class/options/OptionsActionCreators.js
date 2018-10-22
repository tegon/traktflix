import ViewingOptionsAppDispatcher from '../../modules/options/viewing-options-app-dispatcher';
import ActionTypes from '../../modules/options/options-constants';

export default class OptionsActionCreators {
  static receiveOptions(options) {
    ViewingOptionsAppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_OPTIONS,
      options: options.filter((option) => !!option)
    });
  }

  static receiveOptionsFailed(error) {
    ViewingOptionsAppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_OPTIONS_FAILED,
      error
    });
  }

  static toggleOption(option, value) {
    ViewingOptionsAppDispatcher.dispatch({
      type: ActionTypes.TOGGLE_OPTION,
      option: option,
      value: value
    });
  }

  static saveSuccess() {
    ViewingOptionsAppDispatcher.dispatch({
      type: ActionTypes.SAVE_SUCCESS
    });
  }

  static saveFailed(error) {
    ViewingOptionsAppDispatcher.dispatch({
      type: ActionTypes.SAVE_FAILED,
      error
    });
  }

  static clearSuccess() {
    ViewingOptionsAppDispatcher.dispatch({
      type: ActionTypes.CLEAR_SUCCESS
    });
  }

  static clearFailed(error) {
    ViewingOptionsAppDispatcher.dispatch({
      type: ActionTypes.CLEAR_FAILED,
      error
    });
  }
}
