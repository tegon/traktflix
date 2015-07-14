'use strict';

var React = require('react');
var LoginButton = require('./login-button.jsx');
var Header = require('./header.jsx');
var Watching = require('./watching.jsx');
var Info = require('./info.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return { logged: false, currentPage: 'watch' };
  },
  getAccessToken: function() {
    chrome.storage.sync.get(function(data) {
      this.setState({ logged: !!data.access_token });
      this.getCurrentItem();
    }.bind(this));
  },
  getCurrentItem: function() {
    chrome.tabs.query({ url: 'http://*.netflix.com/*' }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { getCurrentItem: true }, function(response) {
        console.log(response);
        this.setState({ item: response.item, scrobble: response.scrobble });
      }.bind(this));
    }.bind(this));
  },
  componentDidMount: function() {
    this.getAccessToken();
  },
  aboutClicked: function(e) {
    this.setState({ currentPage: 'about' });
  },
  logoutClicked: function(e) {
    chrome.storage.sync.clear(function() {
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
    console.error('Token failed', status, response);
  },
  saveToken: function(options, callback) {
    chrome.storage.sync.set(options, function() {
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