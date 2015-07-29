'use strict';

var Request = require('../request.js');
var Settings = require('../settings.js');

function Search(options) {
  this.item = options.item;
  this.url = Settings.apiUri + '/search';
  this.showsUrl = Settings.apiUri + '/shows';
};

Search.prototype = {
  getUrl: function() {
    return this.url + '?type=' + this.item.type + '&query=' + this.item.title;
  },

  getEpisodeUrl: function(slug) {
    return this.showsUrl + '/' + slug + '/seasons/' + this.item.season
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
  },

  find: function(options) {
    if (this.item.type == 'show') {
      this.findEpisode(options);
    } else {
      this.findMovie(options);
    }
  }
};

module.exports = Search;