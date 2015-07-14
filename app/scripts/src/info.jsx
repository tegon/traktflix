'use strict';

var React = require('react');

module.exports = React.createClass({
  getRandomMessage: function() {
    return this.props.messages[Math.floor(Math.random() * this.props.messages.length)];
  },
  render: function() {
    return(
      <div className="mdl-card mdl-shadow--2dp info-card">
        <div className="mdl-card__title mdl-card--expand">
          <h4>{this.getRandomMessage()}</h4>
        </div>
      </div>
    );
  }
});