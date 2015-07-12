'use strict';

var React = require('react');
var Login = require('./login.jsx');
var Watch = require('./watch.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return { logged: false };
  },
  getAccessToken: function() {
    chrome.storage.sync.get(function(data) {
      this.setState({ logged: !!data.access_token });
    }.bind(this));
  },
  componentDidMount: function() {
    this.getAccessToken();
  },
  render: function() {
    return(
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <header className="mdl-layout__header mdl-shadow--7dp">
          <div className="mdl-layout__header-row">
            <span className="mdl-layout-title">traktflix</span>
            <div className="mdl-layout-spacer"></div>
            <nav className="mdl-navigation">
              <a className="mdl-navigation__link about" href="">About</a>
              <a className="mdl-navigation__link logout" href="">Logout</a>
            </nav>
          </div>
        </header>
        <main className="mdl-layout__content">
          <div className="overlay"></div>
          <div className="content">
            {this.state.logged ? <Watch /> : <Login />}
          </div>
        </main>
      </div>
    );
  }
});