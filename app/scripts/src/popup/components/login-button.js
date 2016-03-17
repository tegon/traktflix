'use strict';

var React = require('react');
var Loading = require('./loading.js');

module.exports = React.createClass({
  handleClick: function(e) {
    this.props.onLoginClicked(e);
    chrome.runtime.sendMessage({ type: 'launchAuthorize' }, this.oauthCallback);
  },
  oauthCallback: function(options) {
    if (options.error) {
      this.props.onTokenFailed(options.status, options.response);
    } else {
      this.props.onTokenSuccess(options.response);
    }
  },

  render: function() {
    chrome.runtime.sendMessage({ type: 'sendAppView', view: 'Login' });

    return(
      <div className='login-wrapper'>
        <Loading show={this.props.loading} />
        <button onClick={this.handleClick} className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect'>
          Login with Trakt.tv
        </button>
      </div>
    );
  }
});
