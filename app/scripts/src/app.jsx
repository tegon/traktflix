'use strict';

var React = require('react');
var LoginButton = require('./login-button.jsx');
var Header = require('./header.jsx');
var Watching = require('./watching.jsx');
var Info = require('./info.jsx');
var Utils = require('./utils.js');

module.exports = React.createClass({
  getInitialState: function() {
    return { logged: false, currentPage: 'watch' };
  },
  getAccessToken: function() {
    Utils.Storage.get(function(data) {
      this.setState({ logged: !!data.access_token });
      this.getCurrentItem();
    }.bind(this));
  },
  getCurrentItem: function() {
    Utils.Messages.send('getCurrentItem', function(response) {
      this.setState({ item: response.item, scrobble: response.scrobble });
    }.bind(this));
  },
  componentDidMount: function() {
    this.getAccessToken();
  },
  aboutClicked: function(e) {
    this.setState({ currentPage: 'about' });
  },
  logoutClicked: function(e) {
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
    this.saveToken(JSON.parse(response));
  },
  onTokenFailed: function(status, response) {
    console.error('traktflix: Get Token failed', status, response);
  },
  saveToken: function(options, callback) {
    Utils.Storage.set({ access_token: options.access_token }, function() {
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