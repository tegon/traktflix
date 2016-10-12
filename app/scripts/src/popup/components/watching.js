'use strict';

var React = require('react');
var TmdbImageContainer = require('../../tmdb-image-container.js');
var TmdbImage = require('../../tmdb-image.js');

module.exports = React.createClass({
  render: function() {
    chrome.runtime.sendMessage({ type: 'sendAppView', view: 'Watching ' + this.props.item.title });

    return(
      <TmdbImageContainer>
        <TmdbImage className='mdl-card mdl-shadow--2dp watching-card-thumb' item={this.props.item}>
          <div className='mdl-card__title mdl-card--expand'></div>
          <div className='mdl-card__actions'>
            <span className='watching-card-thumb__title'>{this.props.item.title}</span>
          </div>
        </TmdbImage>
      </TmdbImageContainer>
    );
  }
});
