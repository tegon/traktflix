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
    return <div> {this.state.logged ? <Watch /> : <Login />}</div>;
  }
});