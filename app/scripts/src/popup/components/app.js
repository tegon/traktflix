'use strict';

var React = require('react');
var LoginButton = require('./login-button.js');
var Header = require('./header.js');
var Watching = require('./watching.js');
var Info = require('./info.js');
var Button = require('./button.js');
var History = require('./history.js');
var Oauth = require('../../oauth.js');

module.exports = React.createClass({
  getInitialState: function() {
    return { logged: false, currentPage: 'watch', loading: false };
  },
  checkUserLogin: function() {
    Oauth.getUserInfo(this.userIsLogged, this.userIsNotLogged);
  },
  userIsLogged: function(response) {
    chrome.storage.local.get(function(data) {
      this.setState({ logged: !!data.access_token });
      this.getCurrentItem();
    }.bind(this));
  },
  userIsNotLogged: function(status, response) {
    this.onTokenFailed(status, response);
  },
  getCurrentItem: function() {
    chrome.tabs.query({ url: 'http://*.netflix.com/*' }, function(tabs) {
      if (tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'getCurrentItem' }, function(response) {
          if (response) {
            this.setState({ item: response.item });
          }
        }.bind(this));
      }
    }.bind(this));
  },
  componentDidMount: function() {
    this.checkUserLogin();
  },
  aboutClicked: function(e) {
    this.setState({ currentPage: 'about' });
  },
  logoutClicked: function(e) {
    chrome.runtime.sendMessage({ type: 'sendEvent', name: 'Logout', value: false });
    chrome.storage.local.clear(function() {
      this.setState({ logged: false, currentPage: 'watch' });
    }.bind(this));
  },
  historyClicked: function(e) {
    this.setState({ currentPage: 'history' });
  },
  onLoginClicked: function(e) {
    this.setState({ loading: true });
  },
  onItemClicked: function(e) {
    if (e.target.classList.contains('item-About')) {
      this.aboutClicked(e);
    } else if (e.target.classList.contains('item-History')) {
      this.historyClicked(e);
    } else {
      this.logoutClicked(e);
    }
  },
  onTokenSuccess: function(response) {
    var options = JSON.parse(response);
    this.setState({ loading: false, logged: !!options.access_token });
    chrome.runtime.sendMessage({ type: 'sendEvent', name: 'TokenSuccess', value:  true });
  },
  onTokenFailed: function(status, response) {
    this.setState({ loading: false });
    chrome.runtime.sendMessage({ type: 'sendEvent', name: 'TokenFailed', value: false });
    console.error('traktflix: Get Token failed', status, response);
  },
  render: function() {
    var content;
    if (this.state.currentPage === 'about') {
      content =
        <Info messages={this.props.aboutMessages}>
          <Button url={'https://github.com/tegon/traktflix'} text={'Read more'} />
        </Info>
    } else {
      if (this.state.logged) {
        if (this.state.item) {
          content = <Watching item={this.state.item} />
        } else if (this.state.currentPage === 'history') {
          content = <History />
        } else {
          content = <Info messages={this.props.notWatchingMessages} />
        }
      } else {
        content =
          <LoginButton
            loading={this.state.loading} onClick={this.onLoginClicked}
            onTokenSuccess={this.onTokenSuccess} onTokenFailed={this.onTokenFailed} />
      }
    }

    return(
      <div className='mdl-layout mdl-layout--fixed-header'>
        <Header
          items={[{ name: 'About', show: true }, { name: 'History', show: this.state.logged }, { name: 'Logout', show: this.state.logged }]}
          onItemClicked={this.onItemClicked} />
        <main className='mdl-layout__content'>
          <div className='overlay'></div>
          <div className='content'>
            {content}
          </div>
        </main>
      </div>
    );
  }
});