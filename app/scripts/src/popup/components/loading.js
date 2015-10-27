'use strict';

var React = require('react');

module.exports = React.createClass({
  getSpinnerStyle: function() {
    if (this.props.show) {
      return { display: 'block' };
    } else {
      return { display: 'none' };
    }
  },
  render: function() {
    return(
      <div className='spinner-wrapper' style={this.getSpinnerStyle()}>
        <div className='mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active' />
      </div>
    )
  }
});