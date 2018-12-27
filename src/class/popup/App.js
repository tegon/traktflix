import ChromeStorage from '../ChromeStorage';
import Oauth from '../Oauth';
import Rollbar from '../Rollbar';
import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import 'material-design-lite';
import {Route, Switch} from "react-router-dom";
import ErrorBoundary from '../ErrorBoundary';
import LoginButton from "./LoginButton";
import About from "./About";
import NotWatching from "./NotWatching";
import Watching from "./Watching";

/* global componentHandler */

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {logged: false, loading: false};
  }

  async checkUserLogin() {
    const data = await ChromeStorage.get(null);
    if (!data.data || !data.data.access_token) {
      this.setState({
        loading: false,
        logged: false
      });
      this.context.router.history.push(`/login`);
      return;
    }
    Oauth.getUserInfo(this.userIsLogged.bind(this), this.userIsNotLogged.bind(this));
  }

  async userIsLogged() {
    const data = await ChromeStorage.get(null);
    this.setState({
      logged: data.data && !!data.data.access_token,
      autoSync: data.data && data.data.auto_sync
    });
    this.getCurrentItem();
    this.context.router.history.push(`/not-watching`);
  }

  userIsNotLogged(status, response) {
    this.onTokenFailed(status, response);
  }

  sendToContentScript(type, callback) {
    chrome.tabs.query({url: `*://*.netflix.com/*`, active: true}, function (tabs) {
      if (tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id, {type: type}, callback);
      }
    });
  }

  getCurrentItem() {
    this.sendToContentScript(`getCurrentItem`, this.onItemReceived.bind(this));
  }

  onItemReceived(response) {
    if (response) {
      this.setState({item: response.item});
      this.context.router.history.push(`/watching/${response.item.ids.trakt}`);
    }
  }

  componentDidMount() {
    // noinspection JSIgnoredPromiseFromCall
    this.checkUserLogin();
  }

  componentDidUpdate() {
    componentHandler.upgradeDom();
  }

  async logoutClicked() {
    chrome.runtime.sendMessage({type: `sendEvent`, name: `Logout`, value: false});
    await ChromeStorage.remove(`data`);
    this.setState({logged: false});
    this.context.router.history.push(`/login`);
  }

  onLoginClicked() {
    this.setState({loading: true});
  }

  onTokenSuccess(response) {
    const options = JSON.parse(response);
    this.setState({loading: false, logged: !!options.access_token});
    this.context.router.history.push(`/not-watching`);
    chrome.runtime.sendMessage({type: `sendEvent`, name: `TokenSuccess`, value: true});
  }

  onTokenFailed(status, response) {
    this.setState({loading: false});
    chrome.runtime.sendMessage({type: `sendEvent`, name: `TokenFailed`, value: false});
    console.log(`traktflix: Get Token failed`, status, response);
    Rollbar.init().then(() => Rollbar.warning(`traktflix: Get Token failed`, {status: status, response: response}));
  }

  render() {
    return (
      <ErrorBoundary>
        <div className='mdl-layout mdl-layout--fixed-header'>
          <Header
            logged={this.state.logged}
            logoutClicked={this.logoutClicked.bind(this)}/>
          <main className='mdl-layout__content'>
            <div className='overlay'/>
            <div className='content'>
              <Switch>
                <Route
                  path='/login'
                  render={
                    props =>
                      <LoginButton {...props}
                                   loading={this.state.loading}
                                   onLoginClicked={this.onLoginClicked.bind(this)}
                                   onTokenSuccess={this.onTokenSuccess.bind(this)}
                                   onTokenFailed={this.onTokenFailed.bind(this)}
                      />
                  }
                />
                <Route path='/about' component={About}/>
                <Route path='/not-watching' component={NotWatching}/>
                <Route path='/watching/:item' render={props => <Watching {...props} item={this.state.item}/>}/>
              </Switch>
            </div>
          </main>
        </div>
      </ErrorBoundary>
    );
  }
}

App.contextTypes = {
  router: PropTypes.object.isRequired
};
App.propTypes = {
  children: PropTypes.node
};

export default App;
