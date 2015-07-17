var React = require('react');
var Settings = require('./settings.js');
var Request = require('./request.js');
var Utils = require('./utils.js');

module.exports = React.createClass({
  componentDidUpdate: function() {
    if (this.props.refreshToken) {
      this.requestRefreshToken();
    }
  },
  getAuthorizeUrl: function() {
    return Settings.authorizeUri + '?client_id=' + Settings.clientId +
      '&redirect_uri=' + Settings.redirectUri + '&response_type=code';
  },
  getCode: function(redirectUrl) {
    var code = redirectUrl.split('?')[1];
    return code.split('=')[1];
  },
  handleClick: function(e) {
    this.props.onClick(e);

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
      url: Settings.apiUri + '/oauth/token',
      params: params,
      success: this.onTokenSuccess,
      error: this.onTokenFailed
    });
  },
  requestRefreshToken: function() {
    var params = {
      refresh_token: this.props.refreshToken,
      client_id: Settings.clientId,
      client_secret: Settings.clientSecret,
      redirect_uri: Settings.redirectUri,
      grant_type: 'refresh_token'
    };

    this.requestToken(params);
  },
  onTokenSuccess: function(response) {
    this.props.onTokenSuccess(response);
  },
  onTokenFailed: function(status, response) {
    this.props.onTokenFailed(status, response);
  },
  getSpinnerStyle: function() {
    if (this.props.loading) {
      return { display: 'block' };
    } else {
      return { display: 'none' };
    }
  },
  render: function() {
    Utils.Analytics.sendView('Login');

    return(
      <div className="login-wrapper">
        <div className="spinner-wrapper" style={this.getSpinnerStyle()}>
          <div className="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active" />
        </div>
        <button onClick={this.handleClick} className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect">
          Login with Trakt.tv
        </button>
      </div>
    );
  }
});