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
    return this.url + '/' + this.item.type + '?query=' + encodeURIComponent(this.item.title);
  },

  getEpisodeUrl: function(slug) {
    if (this.item.episode) {
      return this.showsUrl + '/' + slug + '/seasons/' + this.item.season
        + '/episodes/' + this.item.episode + '?extended=images';
    } else {
      return this.showsUrl + '/' + slug + '/seasons/' + this.item.season
        + '?extended=images';
    }
  },

  findItem: function(options) {
    Request.send({
      method: 'GET',
      url: this.getUrl(),
      success: function(response) {
        var data = JSON.parse(response)[0];
        if (data == undefined) {
          options.error.call(this, 404);
        } else {
          options.success.call(this, data);
        }
      },
      error: function(status, response, opts) {
        options.error.call(this, status, response, opts);
      }
    });
  },

  findEpisodeByTitle: function(show, response, options) {
    var episodes = JSON.parse(response);
    var episode;

    for (var i = 0; i < episodes.length; i++) {
      if (this.item.epTitle && episodes[i].title && episodes[i].title.toLowerCase() === this.item.epTitle.toLowerCase()) {
        episode = episodes[i];
        break;
      }
    }

    if (episode) {
      options.success.call(this, Object.assign(episode, show));
    } else {
      options.error.call(this, 404, 'Episode not found.', {show: show, item: this.item});
    }
  },

  findEpisode: function(options) {
    this.findItem({
      success: function(response) {
        Request.send({
          method: 'GET',
          url: this.getEpisodeUrl(response['show']['ids']['slug']),
          success: function(resp) {
            if (this.item.episode) {
              options.success.call(this, Object.assign(JSON.parse(resp), response));
            } else {
              this.findEpisodeByTitle(response, resp, options);
            }
          }.bind(this),
          error: function(st, resp, opts) {
            options.error.call(this, st, resp, opts);
          }
        });
      }.bind(this),
      error: function(status, response, opts) {
        options.error.call(this, status, response, opts);
      }
    });
  },

  find: function(options) {
    if (this.item.type == 'show') {
      this.findEpisode(options);
    } else {
      this.findItem(options);
    }
  }
};

module.exports = Search;
