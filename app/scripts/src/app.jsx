'use strict';

var React = require('react');
var Login = require('./login.jsx');
var Watch = require('./watch.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return { logged: false, currentPage: 'watch' };
  },
  getAccessToken: function() {
    chrome.storage.sync.get(function(data) {
      this.setState({ logged: !!data.access_token });
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
      this.setState({ logged: false });
    }.bind(this));
  },
  render: function() {
    var content;

    if (this.state.currentPage === 'about') {
      content =
        <div className="mdl-card mdl-shadow--2dp watch-empty-card">
          <div className="mdl-card__title mdl-card--expand">
            <h4>traktflix is a extension bla bla bla</h4>
          </div>
        </div>;
    } else {
      content = this.state.logged ? <Watch /> : <Login />;
    }

    return(
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <header className="mdl-layout__header mdl-shadow--7dp">
          <div className="mdl-layout__header-row">
            <span className="mdl-layout-title">traktflix</span>
            <div className="mdl-layout-spacer"></div>
            <nav className="mdl-navigation">
              <a className="mdl-navigation__link about" href="#" onClick={this.aboutClicked} >About</a>
              <a className="mdl-navigation__link logout" href="#" onClick={this.logoutClicked}>Logout</a>
            </nav>
          </div>
        </header>
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