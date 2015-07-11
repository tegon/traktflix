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
  render: function() {
    if (this.isWatching()) {
      return (
          <div className="watching">
            <img src={this.thumbUrl()} />
            <h3>{this.state.item.title}</h3>
            <h4>{this.state.item.epTitle}</h4>
            <h5>{this.state.scrobble.item.progress}%</h5>
          </div>
      );
    } else {
      return (
          <div className="watching-empty">
            You aren't watching anything right now :/
          </div>
      );
    }
  }
});