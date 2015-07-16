var React = require('react');
var Settings = require('./settings.js');
var Request = require('./request.js');
var Utils = require('./utils.js');

module.exports = React.createClass({
  getInitialState: function() {
    return { loading: false }
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
    this.setState({ loading: true });

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
  onTokenSuccess: function(response) {
    this.setState({ loading: false });
    this.props.onTokenSuccess(response);
  },
  onTokenFailed: function(status, response) {
    this.setState({ loading: false });
    this.props.onTokenFailed(status, response);
  },
  render: function() {
    Utils.Analytics.sendView('Login');
    var spinnerStyle;

    if (this.state.loading) {
      spinnerStyle = { display: 'block' };
    } else {
      spinnerStyle = { display: 'none' };
    }

    return(
      <div className="login-wrapper">
        <div className="spinner-wrapper" style={spinnerStyle}>
          <div className="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active" />
        </div>
        <button onClick={this.handleClick} className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect">
          Login with Trakt.tv
        </button>
      </div>
    );
  }
});