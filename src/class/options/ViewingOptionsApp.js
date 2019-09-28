import 'material-design-lite';
import PropTypes from 'prop-types';
import React from 'react';
import BrowserStorage from '../BrowserStorage';
import OptionsActionCreators from './OptionsActionCreators';
import OptionsList from './OptionsList';
import OptionsStore from './OptionsStore';

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

  async componentDidMount() {
    OptionsStore.addChangeListener(this._onChange.bind(this));
    document.getElementById(`traktCacheSize`).textContent =  await this._getTraktCacheSize();
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

  async _getTraktCacheSize() {
    const storage = await BrowserStorage.get(`traktCache`);
    let size = (JSON.stringify(storage.traktCache) || ``).length;
    if (size < 1024) {
      return `${size.toFixed(2)} B`;
    }
    size /= 1024;
    if (size < 1024) {
      return `${size.toFixed(2)} KB`;
    }
    size /= 1024;
    return `${size.toFixed(2)} MB`;
  }

  _onChange() {
    const state = this.getStateFromStores();
    this.setState(Object.assign(state, {loading: false}));
  }

  _onSaveClick() {
    const options = {};
    const permissionsToAdd = [];
    const permissionsToRemove = [];
    const originsToAdd = [];
    const originsToRemove = [];
    for (const option of this.state.options) {
      options[option.id] = option.add;
      if (option.permissions) {
        (option.add ? permissionsToAdd : permissionsToRemove).push(...option.permissions);
      }
      if (option.origins) {
        (option.add ? originsToAdd : originsToRemove).push(...option.origins);
      }
    }
    browser.permissions.request({ permissions: permissionsToAdd, origins: originsToAdd });
    browser.permissions.remove({ permissions: permissionsToRemove, origins: originsToRemove });
    BrowserStorage.set({options}, true)
      .then(() => OptionsActionCreators.saveSuccess())
      .catch(error => OptionsActionCreators.saveFailed(error));
  }

  async _onClearClick() {
    try {
      const confirmationMessage = browser.i18n.getMessage(`confirmClear`);
      if (confirm(confirmationMessage)) {
        await BrowserStorage.clear(true);
      }
      OptionsActionCreators.clearSuccess();
    } catch (error) {
      OptionsActionCreators.clearFailed(error);
    }
  }

  async _onClearTraktCacheClick() {
    try {
      const confirmationMessage = browser.i18n.getMessage(`confirmClearTraktCache`);
      if (confirm(confirmationMessage)) {
        await BrowserStorage.remove(`traktCache`);
      }
      OptionsActionCreators.clearTraktCacheSuccess();
    } catch (error) {
      OptionsActionCreators.clearTraktCacheFailed(error);
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
              {browser.i18n.getMessage(`save`)}
            </button>

            <button onClick={this._onClearClick.bind(this)}
                    className='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect'>
              {browser.i18n.getMessage(`clearStorage`)}
            </button>

            <button onClick={this._onClearTraktCacheClick.bind(this)}
                    className='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect'>
              {browser.i18n.getMessage(`clearTraktCache`)} (<span id='traktCacheSize'/>)
            </button>
          </div>
        </div>
      );
    } else {
      content = (<div><h4>{browser.i18n.getMessage(`failedOptions`)}</h4></div>);
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
