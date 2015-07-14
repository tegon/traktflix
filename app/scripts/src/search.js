'use strict';

var Request = require('./request.js');

function Search(options) {
  this.item = options.item;
  this.url = 'https://api-v2launch.trakt.tv/search';
  this.episodeUrl = 'https://api-v2launch.trakt.tv/shows';
};

Search.prototype = {
  getUrl: function() {
    return this.url + '?type=' + this.item.type + '&query=' + this.item.title;
  },

  getEpisodeUrl: function(slug) {
    return this.episodeUrl + '/' + slug + '/seasons/' + this.item.season
      + '/episodes/' + this.item.episode + '?extended=images';
  },

  findMovie: function(options) {
    Request.send({
      method: 'GET',
      url: this.getUrl(),
      success: function(response) {
        var data = JSON.parse(response)[0];
        options.success.call(this, data);
      },
      error: function(status, response) {
        options.error.call(this, status, response);
      }
    });
  },

  findEpisode: function(options) {
    Request.send({
      method: 'GET',
      url: this.getUrl(),
      success: function(response) {
        var data = JSON.parse(response)[0];

        /* House of Cards has an 1990 version, with same title
        I need to priorize the 2013 version
        Unfortunately, i couldn't figure out a better way to this by now */
        if (this.item.title === 'House of Cards') {
          JSON.parse(response).map(function(item) {
            if (item.show.year === 2013) {
              data = item;
            }
          });
        }

        Request.send({
          method: 'GET',
          url: this.getEpisodeUrl(data['show']['ids']['slug']),
          success: function(resp) {
            options.success.call(this, JSON.parse(resp));
          },
          error: function(st, resp) {
            options.error.call(this, st, resp);
          }
        });
      }.bind(this),
      error: function(status, response) {
        options.error.call(this, status, response);
      }
    });
  }
}

module.exports = Search;