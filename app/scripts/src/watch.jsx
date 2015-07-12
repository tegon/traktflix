'use strict';

var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return { item: undefined, scrobble: undefined };
  },
  getCurrentItem: function() {
    chrome.tabs.query({ url: 'http://*.netflix.com/*' }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { getCurrentItem: true }, function(response) {
        console.log(response);
        this.setState({ item: response.item, scrobble: response.scrobble });
      }.bind(this));
    }.bind(this));
  },
  componentDidMount: function() {
    this.getCurrentItem();
  },
  isWatching: function() {
    return this.state.item && this.state.scrobble;
  },
  thumbUrl: function() {
    if (this.state.item.type === 'show') {
      return this.state.scrobble.item.episode.images.screenshot.thumb;
    } else {
      return this.state.scrobble.item.movie.images.poster.thumb;
    }
  },
  getText: function() {
    if (this.state.item.type === 'show') {
      return this.state.item.title + ' - ' + this.state.item.epTitle;
    } else {
      return this.state.item.title;
    }
  },
  thumbStyle: function() {
    return {
      backgroundImage: 'url(' + this.thumbUrl() + ')',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      backgroundSize: 'cover'
    };
  },
  render: function() {
    if (this.isWatching()) {
      return (
        <div className="mdl-card mdl-shadow--2dp watch-card-thumb" style={this.thumbStyle()}>
          <div className="mdl-card__title mdl-card--expand"></div>
          <div className="mdl-card__actions">
            <span className="watch-card-thumb__title">{this.getText()}</span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="mdl-card mdl-shadow--2dp watch-empty-card">
          <div className="mdl-card__title mdl-card--expand">
            <h4>You're not watching anything right now :/</h4>
          </div>
        </div>
      );
    }
  }
});