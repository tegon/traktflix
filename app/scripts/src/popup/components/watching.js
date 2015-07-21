'use strict';

var React = require('react');

module.exports = React.createClass({
  thumbUrl: function() {
    if (this.props.item.images.poster) {
      return this.props.item.images.poster.thumb;
    } else {
      return this.props.item.images.screenshot.thumb;
    }
  },
  thumbStyle: function() {
    return {
      backgroundImage: 'url(' + this.thumbUrl() + ')'
    }
  },
  render: function() {
    chrome.runtime.sendMessage({ type: 'sendAppView', view: 'Watching ' + this.props.item.title });

    return(
      <div className="mdl-card mdl-shadow--2dp watching-card-thumb" style={this.thumbStyle()}>
        <div className="mdl-card__title mdl-card--expand"></div>
        <div className="mdl-card__actions">
          <span className="watching-card-thumb__title">{this.props.item.title}</span>
        </div>
      </div>
    );
  }
});