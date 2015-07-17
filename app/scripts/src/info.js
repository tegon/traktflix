'use strict';

var React = require('react');
var Utils = require('./utils.js');

module.exports = React.createClass({
  getRandomMessage: function() {
    return this.props.messages[Math.floor(Math.random() * this.props.messages.length)];
  },
  render: function() {
    var message = this.getRandomMessage();
    Utils.Analytics.sendView('Info ' + message);

    return(
      <div className="mdl-card mdl-shadow--2dp info-card">
        <div className="mdl-card__title mdl-card--expand">
          <h4>{message}</h4>
        </div>
      </div>
    );
  }
});