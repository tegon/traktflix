var React = require('react');
var Settings = require('./settings.js');
var Request = require('./request.js');
var Utils = require('./utils.js');

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
    Utils.Oauth.launch({ 'url': this.getAuthorizeUrl(), 'interactive': true },
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
    this.props.onTokenSuccess(response);
  },
  onTokenFailed: function(status, response) {
    this.props.onTokenFailed(status, response);
  },
  render: function() {
    var className = 'mdl-button mdl-js-button mdl-button--raised' +
      ' mdl-button--colored mdl-js-ripple-effect login';
    return(
      <button onClick={this.handleClick} className={className}>
        Login with Trakt.tv
      </button>
    );
  }
});