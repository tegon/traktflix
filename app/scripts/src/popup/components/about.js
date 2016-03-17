'use strict';

var React = require('react');

var Info = require('./info.js');
var Button = require('./button.js');
var messages = require('../messages.js').aboutMessages;

module.exports = React.createClass({
  render: function() {
    return(
      <Info messages={messages}>
        <Button url={'https://github.com/tegon/traktflix'} text={'Read more'} />
      </Info>
    );
  }
});
