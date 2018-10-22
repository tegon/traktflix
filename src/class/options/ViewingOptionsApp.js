import ChromeStorage from '../ChromeStorage';
import React from 'react';
import PropTypes from 'prop-types';
import OptionsActionCreators from './OptionsActionCreators';
import OptionsList from './OptionsList';
import OptionsStore from './OptionsStore';
import 'material-design-lite';

/* global componentHandler */

class ViewingOptionsApp extends React.Component {
  getStateFromStores() {
    return {
      options: OptionsStore.getAll(),
      message: OptionsStore.getMessage()
    };
  }

  constructor(props) {
    super(props);
    const state = this.getStateFromStores();
    this.state = Object.assign(state, {loading: state.options.length === 0});
  }

  componentDidMount() {
    OptionsStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    OptionsStore.removeChangeListener(this._onChange.bind(this));
  }

  componentDidUpdate() {
    componentHandler.upgradeDom();
    if (this.state.message) {
      this.showSnackbar();
    }
  }

  _onChange() {
    const state = this.getStateFromStores();
    this.setState(Object.assign(state, {loading: false}));
  }

  async _onSaveClick() {
    try {
      const options = {};
      for (const option of this.state.options) {
        options[option.id] = option.add;
      }
      await ChromeStorage.set({options});
      OptionsActionCreators.saveSuccess();
    } catch (error) {
      OptionsActionCreators.saveFailed(error);
    }
  }

  async _onClearClick() {
    try {
      const confirmationMessage = chrome.i18n.getMessage(`confirmClear`);
      if (confirm(confirmationMessage)) {
        await ChromeStorage.clear();
      }
      OptionsActionCreators.clearSuccess();
    } catch (error) {
      OptionsActionCreators.clearFailed(error);
    }
  }

  showSnackbar() {
    const snackbar = document.querySelector('.mdl-js-snackbar');
    snackbar.MaterialSnackbar.showSnackbar({message: this.state.message});
  }

  render() {
    let content;
    if (this.state.loading) {
      content = (
        <div style={{textAlign: 'center', marginTop: 25}}>
          <div className='mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active'/>
        </div>
      );
    } else if (this.state.options.length) {
      content = (
        <div>
          <OptionsList options={this.state.options}/>
          <div className='mdl-actions-wrapper'>
            <button onClick={this._onSaveClick.bind(this)}
                    className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect'>
              {chrome.i18n.getMessage(`save`)}
            </button>

            <button onClick={this._onClearClick.bind(this)}
                    className='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect'>
              {chrome.i18n.getMessage(`clearStorage`)}
            </button>
          </div>
        </div>
      );
    } else {
      content = (<div><h4>{chrome.i18n.getMessage(`failedOptions`)}</h4></div>);
    }

    return (
      <div>
        {content}
        <div aria-live='assertive' aria-atomic='true' aria-relevant='text' className='mdl-snackbar mdl-js-snackbar'>
          <div className='mdl-snackbar__text'/>
          <button type='button' className='mdl-snackbar__action'/>
        </div>
      </div>
    );
  }
}

ViewingOptionsApp.propTypes = {
  options: PropTypes.array
};

export default ViewingOptionsApp;
