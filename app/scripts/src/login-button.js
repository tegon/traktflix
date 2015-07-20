var React = require('react');
var Settings = require('./settings.js');
var Request = require('./request.js');
var Utils = require('./utils.js');
var Oauth = require('./oauth.js');

module.exports = React.createClass({
  componentDidUpdate: function() {
    if (this.props.refreshToken) {
      Oauth.requestRefreshToken(this.props.refreshToken, this.oauthCallback);
    }
  },
  getAuthorizeUrl: function() {
    return Settings.authorizeUri + '?client_id=' + Settings.clientId +
      '&redirect_uri=' + Settings.redirectUri + '&response_type=code';
  },
  handleClick: function(e) {
    this.props.onClick(e);
    Oauth.authorize(this.getAuthorizeUrl(), this.oauthCallback);
  },
  oauthCallback: function(err, response, status) {
    if (err) {
      this.onTokenFailed(status, response);
    } else {
      this.onTokenSuccess(response);
    }
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