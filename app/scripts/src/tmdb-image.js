'use strict';

var React = require('react');
var Settings = require('./settings.js');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      imageUrl: 'https://trakt.tv/assets/placeholders/thumb/poster-2d5709c1b640929ca1ab60137044b152.png'
    }
  },
  componentDidMount: function() {
    if (this.props.item && this.props.imageHost) {
      this.getItemFromTmdb();
    }
  },
  componentDidUpdate: function(prevProps) {
    var shouldUpdate = false;

    if (!prevProps.item && this.props.item) {
      shouldUpdate = true;
    } else if (prevProps.item && this.props.item) {
      if (prevProps.imageHost !== this.props.imageHost) {
        shouldUpdate = true;
      } else if (prevProps.item.ids.tmdb !== this.props.item.ids.tmdb) {
        shouldUpdate = true;
      } else if (prevProps.item.show && this.props.item.show && prevProps.item.show.ids.tmdb !== this.props.item.show.ids.tmdb) {
        shouldUpdate = true;
      }
    }

    if (shouldUpdate) {
      this.getItemFromTmdb();
    }
  },
  getItemFromTmdb: function() {
    fetch(this.getApiUrl()).then(this.parseJsonResponse).then(this.onItemLoaded);
  },
  getApiUrl: function() {
    var type = this.props.item.type === 'show' ? 'tv' : 'movie';
    var path = this.props.item.ids.tmdb;

    if (this.props.item.type === 'show') {
      path = this.props.item.show.ids.tmdb + '/season/' + this.props.item.season + '/episode/' + this.props.item.number;
    }

    return 'https://api.themoviedb.org/3/' + type + '/' + path + '/images?api_key=' + Settings.tmdbApiKey;
  },
  parseJsonResponse: function(response) {
    return response.json();
  },
  onItemLoaded: function(response) {
    clearTimeout(this.requestTimeout);

    if (response.status_code && response.status_code === 25) {
      // we've reached the API limit
      this.onItemFailed();
    } else {
      var imageKey = this.props.item.type === 'show' ? 'stills' : 'posters';
      this.setState({ imageUrl: this.props.imageHost + this.props.imageWidth[this.props.item.type] + response[imageKey][0].file_path });
    }
  },
  onItemFailed: function() {
    this.requestTimeout = setTimeout(this.getItemFromTmdb, 10000);
  },
  thumbStyle: function() {
    return {
      backgroundImage: 'url(' + this.state.imageUrl + ')',
      backgroundSize: 'cover'
    }
  },
  render: function() {
    return(
      <div className={this.props.className} style={this.thumbStyle()}>
        {this.props.children}
      </div>
    );
  }
});
