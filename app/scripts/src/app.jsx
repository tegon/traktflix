'use strict';

var React = require('react');
var LoginButton = require('./login-button.jsx');
var Header = require('./header.jsx');
var Watching = require('./watching.jsx');
var Info = require('./info.jsx');
var Utils = require('./utils.js');
var Settings = require('./settings.js');
var Request = require('./request.js');

module.exports = React.createClass({
  getInitialState: function() {
    return { logged: false, currentPage: 'watch' };
  },
  checkUserLogin: function() {
    Request.send({
      method: 'GET',
      url: Settings.apiUri + '/users/requests',
      success: this.userIsLogged,
      error: this.userIsNotLogged
    });
  },
  userIsLogged: function(response) {
    Utils.Storage.get(function(data) {
      this.setState({ logged: !!data.access_token });
      this.getCurrentItem();
    }.bind(this));
  },
  userIsNotLogged: function(status, response) {
    if (status === 401) {
      Utils.Storage.get(function(data) {
        if (data.refresh_token) {
          var params = {
            refresh_token: data.refresh_token,
            client_id: Settings.clientId,
            client_secret: Settings.clientSecret,
            redirect_uri: Settings.redirectUri,
            grant_type: 'refresh_token'
          };

          this.requestRefreshToken(params);
        } else {
          this.onTokenFailed(status, response);
        }
      }.bind(this));
    } else {
      this.onTokenFailed(status, response);
    }
  },
  requestRefreshToken: function(params) {
    Request.send({
      method: 'POST',
      url: Settings.apiUri + '/oauth/token',
      params: params,
      success: this.onTokenSuccess,
      error: this.onTokenFailed
    });
  },
  getCurrentItem: function() {
    Utils.Messages.send('getCurrentItem', function(response) {
      this.setState({ item: response.item, scrobble: response.scrobble });
    }.bind(this));
  },
  componentDidMount: function() {
    this.checkUserLogin();
  },
  aboutClicked: function(e) {
    this.setState({ currentPage: 'about' });
  },
  logoutClicked: function(e) {
    Utils.Analytics.sendEvent('Logout', false);
    Utils.Storage.clear(function() {
      this.setState({ logged: false, currentPage: 'watch' });
    }.bind(this));
  },
  onItemClicked: function(e) {
    if (e.target.classList.contains('item-About')) {
      this.aboutClicked(e);
    } else {
      this.logoutClicked(e);
    }
  },
  onTokenSuccess: function(response) {
    Utils.Analytics.sendEvent('TokenSuccess', true);
    this.saveToken(JSON.parse(response));
  },
  onTokenFailed: function(status, response) {
    Utils.Analytics.sendEvent('TokenFailed', false);
    Utils.Storage.clear(function() {});
    console.error('traktflix: Get Token failed', status, response);
  },
  saveToken: function(options, callback) {
    Utils.Storage.set(options, function() {
      this.setState({ logged: !!options.access_token });
    }.bind(this));
  },
  render: function() {
    var content;
    if (this.state.currentPage === 'about') {
      content = <Info messages={this.props.aboutMessages} />
    } else {
      if (this.state.logged) {
        if (this.state.item && this.state.scrobble) {
          content = <Watching item={this.state.item} scrobble={this.state.scrobble} />
        } else {
          content = <Info messages={this.props.notWatchingMessages} />
        }
      } else {
        content =
          <LoginButton
            onTokenSuccess={this.onTokenSuccess} onTokenFailed={this.onTokenFailed} />
      }
    }

    return(
      <div className="mdl-layout mdl-layout--fixed-header">
        <Header
          items={[{ name: 'About', show: true }, { name: 'Logout', show: this.state.logged }]}
          onItemClicked={this.onItemClicked} />
        <main className="mdl-layout__content">
          <div className="overlay"></div>
          <div className="content">
            {content}
          </div>
        </main>
      </div>
    );
  }
});