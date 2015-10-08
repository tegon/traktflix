'use strict';

var React = require('react');

module.exports = React.createClass({
  componentDidMount: function() {
    componentHandler.upgradeDom();
  },
  render: function() {
    chrome.runtime.sendMessage({ type: 'sendAppView', view: 'History' });

    return(
      <div className='mdl-card mdl-shadow--2dp info-card history-card'>
        <div className='mdl-card__title mdl-card--expand'>
          <h5>Sync your viewing activity from other devices</h5>
        </div>

        <label htmlFor='autoSync' className='mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect'>
          <input type='checkbox' id='autoSync' className='mdl-checkbox__input' checked={this.props.autoSync} />
          <span className='mdl-checkbox__label'>Automatically sync</span>
        </label>

        <label htmlFor='showSyncButton' className='mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect'>
          <input type='checkbox' id='showSyncButton' className='mdl-checkbox__input' checked={this.props.showSyncButton} />
          <span className='mdl-checkbox__label'>Show sync button</span>
        </label>

        <button onClick={this.props.onSyncClicked} className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect'>
          Sync Now
        </button>
      </div>
    );
  }
});