'use strict';

var Settings = require('../settings.js');
var Request = require('../request.js');

function WatchedHistory() {
  this.url = Settings.apiUri + '/sync/history';
  this.cachedActivities = [];
}

WatchedHistory.prototype = {
  includeUrl: function(activity) {
    return this.url + '/' + activity.item.type + '/' + activity.item.id;
  },

  add: function(activity) {
    this.cachedActivities.push(activity);
  },

  include: function(activity, callback) {
    Request.send({
      method: 'GET'
      url: this.includeUrl(activity),
      success: function(response) {
        var history = JSON.parse(response)[0];
        var date = new Date(history.watched_at);
        date.setHours(0, 0, 0, 0);
        var include = date === activity.date;
        callback.call(this, include);
      },
      error: function(status, response) {
        console.log('error', status, response);
      }
    });
  }
};

module.exports = WatchedHistory;