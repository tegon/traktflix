'use strict';

var React = require('react');

module.exports = React.createClass({
  thumbUrl: function() {
    if (this.props.item.type === 'show') {
      return this.props.scrobble.item.episode.images.screenshot.thumb;
    } else {
      return this.props.scrobble.item.movie.images.poster.thumb;
    }
  },
  getText: function() {
    if (this.props.item.type === 'show') {
      return this.props.item.title + ' - ' + this.props.item.epTitle;
    } else {
      return this.props.item.title;
    }
  },
  thumbStyle: function() {
    return {
      backgroundImage: 'url(' + this.thumbUrl() + ')'
    }
  },
  render: function() {
    return(
      <div className="mdl-card mdl-shadow--2dp watching-card-thumb" style={this.thumbStyle()}>
        <div className="mdl-card__title mdl-card--expand"></div>
        <div className="mdl-card__actions">
          <span className="watching-card-thumb__title">{this.getText()}</span>
        </div>
      </div>
    );
  }
});