'use strict';

var Settings = require('../settings.js');
var Request = require('../request.js');
var Search = require('./search.js');

function WatchedHistory() {
  this.url = Settings.apiUri + '/sync/history';
}

WatchedHistory.prototype = {
  includeUrl: function(activity) {
    if (activity.item.type === 'show') {
      return this.url + '/episodes/' + activity.item.id;
    } else {
      return this.url + '/movies/' + activity.item.id;
    }
  },

  send: function(activities, callback) {
    Request.send({
      method: 'POST',
      url: this.url,
      params: this.params(activities),
      success: function(response) {
        console.log('sync success', callback);
        callback.call(this, true);
      },
      error: function(status, response) {
        console.log('sync error', status, response);
        callback.call(this, false);
      }
    });
  },

  params: function(activities) {
    var movies = [];
    var episodes = [];

    activities.forEach(function(activity) {
      var item = {
        'watched_at': activity.date,
        'ids': {
          'trakt': activity.item.id
        }
      };

      if (activity.item.type === 'movie') {
        movies.push(item);
      } else {
        episodes.push(item);
      }
    });

    return { movies: movies, episodes: episodes };
  },

  include: function(options) {
    this.searchItem({
      activity: options.activity,
      success: function(activity) {
        Request.send({
          method: 'GET',
          url: this.includeUrl(activity),
          success: function(response) {
            console.log('response', response);
            var include = false;
            var history = JSON.parse(response)[0];

            if (history && history.watched_at) {
              var date = new Date(history.watched_at);
              date.setHours(0, 0, 0, 0);
              console.log('include', date, activity.date);
              include = date.getTime() === activity.date.getTime();
            }

            options.success.call(this, include);
          },
          error: function(status, response) {
            options.error.call(this, status, response);
          }
        });
      }.bind(this),
      error: function(status, response) {
        options.error.call(this, status, response);
      }
    });
  },

  searchItem: function(options) {
    var search = new Search({ item: options.activity.item });
    search.find({
      success: function(response) {
        if (response) {
          if (options.activity.item.type === 'movie') {
            options.activity.item.id = response.movie.ids.trakt;
          } else {
            options.activity.item.id = response.ids.trakt;
            options.activity.item.episode = response.number;
          }
        }
        options.success.call(this, options.activity);
      },
      error: function(status, response) {
        options.error.call(this, status, response);
      }
    });
  },
};

module.exports = WatchedHistory;