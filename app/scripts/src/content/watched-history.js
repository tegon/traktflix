'use strict';

var Settings = require('../settings.js');
var Request = require('../request.js');
var Search = require('./search.js');

function WatchedHistory() {
  this.url = Settings.apiUri + '/sync/history';
  this.currentHistory = [];
  this.cachedActivities = [];
}

WatchedHistory.prototype = {
  includeUrl: function(activity) {
    return this.url + '/' + activity.item.type + '/' + activity.item.id;
  },

  send: function() {
    Request.send({
      method: 'POST',
      url: this.url,
      params: this.params(),
      success: function(response) {
        console.log('sync success');
      },
      error: function(status, response) {
        console.log('sync error', status, response);
      }
    });
  },

  params: function() {
    var movies = [];
    var episodes = [];

    this.cachedActivities.forEach(function(activity) {
      activity.item['watched_at'] = activity.date;
      if (activity.item.type === 'movie') {
        movies.push(activity.item);
      } else {
        episodes.push(activity.item);
      }
    });

    return { movies: movies, episodes: episodes };
  },

  add: function(activity) {
    this.cachedActivities.push(activity);
  },

  include: function(options) {
    this.searchItem({
      activity: options.activity,
      success: function(activity) {
        Request.send({
          method: 'GET',
          url: this.includeUrl(activity),
          success: function(response) {
            var history = JSON.parse(response)[0];
            var date = new Date(history.watched_at);
            date.setHours(0, 0, 0, 0);
            console.log('include', date, activity.date);
            var include = date === activity.date;
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