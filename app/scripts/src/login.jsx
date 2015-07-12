var React = require('react');
var Settings = require('./settings.js');
var Request = require('./request.js');

module.exports = React.createClass({
  getAuthorizeUrl: function() {
    return Settings.authorizeUri + '?client_id=' + Settings.clientId +
      '&redirect_uri=' + Settings.redirectUri + '&response_type=code';
  },
  getCode: function(redirectUrl) {
    var code = redirectUrl.split('?')[1];
    return code.split('=')[1];
  },
  handleClick: function(e) {
    chrome.identity.launchWebAuthFlow(
      { 'url': this.getAuthorizeUrl(), 'interactive': true },
      function(redirectUrl) {
        var params = {
          code: this.getCode(redirectUrl),
          client_id: Settings.clientId,
          client_secret: Settings.clientSecret,
          redirect_uri: Settings.redirectUri,
          grant_type: 'authorization_code'
        };

        this.requestToken(params);
    }.bind(this));
  },
  requestToken: function(params) {
    Request.send({
      method: 'POST',
      url: Settings.tokenUri,
      params: params,
      success: this.onTokenSuccess,
      error: this.onTokenFailed
    });
  },
  onTokenSuccess: function(response) {
    this.saveToken(JSON.parse(response), function() {
      console.log('saved===========');
      var html = document.querySelector('html');
      html.classList.remove('is-unlogged');
      html.classList.add('is-logged');
    });
  },
  onTokenFailed: function(status, response) {
    console.log('failed', status, response);
  },
  saveToken: function(options, callback) {
    chrome.storage.sync.set({
      'access_token': options.access_token,
      'refresh_token': options.refresh_token,
      'expires_in': options.expires_in
    }, function() {
      callback.call();
    });
  },
  render: function() {
    return(
      <button onClick={this.handleClick} className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect login">
        Login with Trakt.tv
      </button>
    );
  }
});