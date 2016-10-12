'use strict';

var React = require('react');
var Settings = require('./settings.js');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      imageHost: null,
      imageWidth: {
        show: null,
        movie: null
      }
    }
  },
  componentDidMount: function() {
    fetch('https://api.themoviedb.org/3/configuration?api_key=' + Settings.tmdbApiKey).then(this.parseJsonResponse).then(this.onConfigLoaded);
  },
  parseJsonResponse: function(response) {
    return response.json();
  },
  onConfigLoaded: function(response) {
    this.setState({
      imageHost: response.images.secure_base_url,
      imageWidth: { show: response.images.still_sizes[2], movie: response.images.poster_sizes[2] }
    });
  },
  render: function() {
    return(
      <div>
        {this.props.children && React.cloneElement(this.props.children, {
          imageHost: this.state.imageHost,
          imageWidth: this.state.imageWidth
        })}
      </div>
    );
  }
});
