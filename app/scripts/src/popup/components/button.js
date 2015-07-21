'use strict';

var React = require('react');

module.exports = React.createClass({
  handleClick: function(e) {
    chrome.tabs.create({ url: this.props.url, active: true });
  },
  render: function() {
    return(
      <button onClick={this.handleClick} className='mdl-button mdl-js-button mdl-button--primary'>
        {this.props.text}
      </button>
    );
  }
});