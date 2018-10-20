import ChromeStorage from '../ChromeStorage';
import React from 'react';
import PropTypes from 'prop-types';
import OptionsList from './OptionsList';
import 'material-design-lite';

/* global componentHandler */

 class ViewingOptionsApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      options: this.props.options
    };
  }

  componentDidUpdate() {
    componentHandler.upgradeDom();
    if (this.state.message) {
      this.showSnackbar();
    }
  }

  async _onSaveClick() {
    const options = {};
    for (const option of this.state.options) {
      options[option.id] = option.value;
    }
    await ChromeStorage.set({options});
    this.setState({ message: `Options saved.`});
  }

  async _onClearClick() {
    const confirmationMessage = `Are you sure you want to clear your storage? This will reset all of the options to their default values and clear all of your data (you will have to login again).`;
    if (confirm(confirmationMessage)) {
      await ChromeStorage.clear();
      this.setState({ message: `Storage cleared.`});
    }
  }

  showSnackbar() {
    const snackbar = document.querySelector('.mdl-js-snackbar');
    snackbar.MaterialSnackbar.showSnackbar({ message: this.state.message });
  }

  render() {
    return(
      <div>
        <div>
          <OptionsList options={this.state.options} />
          <div className='mdl-actions-wrapper'>
            <button onClick={this._onSaveClick.bind(this)} className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect'>
              Save
            </button>

            <button onClick={this._onClearClick.bind(this)} className='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect'>
              Clear Storage
            </button>
          </div>
        </div>
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
