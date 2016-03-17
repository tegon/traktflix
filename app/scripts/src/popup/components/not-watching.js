'use strict';

var React = require('react');

var Info = require('./info.js');
var Button = require('./button.js');
var messages = require('../messages.js').notWatchingMessages;

module.exports = React.createClass({
  render: function() {
    return(<Info messages={messages} />);
  }
});
