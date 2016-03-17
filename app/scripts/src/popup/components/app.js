'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var Handler = ReactRouter.Handler;

var Header = require('./header.js');
var Oauth = require('../../oauth.js');
var ChromeStorage = require('../../chrome-storage.js');

module.exports = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function() {
    return { logged: false, loading: false };
  },
  checkUserLogin: function() {
    Oauth.getUserInfo(this.userIsLogged, this.userIsNotLogged);
  },
  userIsLogged: function(response) {
    ChromeStorage.get(null, function(data) {
      this.setState({
        logged: !!data.access_token,
        autoSync: data.auto_sync
      });
      this.getCurrentItem();
      this.context.router.push('/not-watching');
    }.bind(this));
  },
  userIsNotLogged: function(status, response) {
    this.onTokenFailed(status, response);
  },
  sendToContentScript: function(type, callback) {
    chrome.tabs.query({ url: '*://*.netflix.com/*' }, function(tabs) {
      if (tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id, { type: type }, callback);
      }
    });
  },
  getCurrentItem: function() {
    this.sendToContentScript('getCurrentItem', this.onItemReceived);
  },
  onItemReceived: function(response) {
    if (response) {
      this.setState({ item: response.item });
      this.context.router.push('/watching/' + response.item.ids.trakt);
    }
  },
  componentDidMount: function() {
    this.checkUserLogin();
  },
  logoutClicked: function(e) {
    chrome.runtime.sendMessage({ type: 'sendEvent', name: 'Logout', value: false });
    ChromeStorage.clear(function() {
      this.setState({ logged: false });
      this.context.router.push('/login');
    }.bind(this));
  },
  onLoginClicked: function(e) {
    this.setState({ loading: true });
  },
  onTokenSuccess: function(response) {
    var options = JSON.parse(response);
    this.setState({ loading: false, logged: !!options.access_token });
    this.context.router.push('/not-watching');
    chrome.runtime.sendMessage({ type: 'sendEvent', name: 'TokenSuccess', value:  true });
  },
  onTokenFailed: function(status, response) {
    this.setState({ loading: false });
    chrome.runtime.sendMessage({ type: 'sendEvent', name: 'TokenFailed', value: false });
    console.error('traktflix: Get Token failed', status, response);
  },
  render: function() {
    return(
      <div className='mdl-layout mdl-layout--fixed-header'>
        <Header
          logged={this.state.logged}
          logoutClicked={this.logoutClicked} />
        <main className='mdl-layout__content'>
          <div className='overlay'></div>
          <div className='content'>
            {this.props.children && React.cloneElement(this.props.children, {
              item: this.state.item,
              loading: this.state.loading,
              onLoginClicked: this.onLoginClicked,
              onTokenSuccess: this.onTokenSuccess,
              onTokenFailed: this.onTokenFailed
            })}
          </div>
        </main>
      </div>
    );
  }
});
