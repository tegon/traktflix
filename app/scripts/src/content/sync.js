'use strict';

var ViewingActivity = require('./viewing-activity.js');
var ViewingActivityParser = require('./viewing-activity-parser.js');
var WatchedHistory = require('./watched-history.js');
var ChromeStorage = require('../chrome-storage.js');
var Oauth = require('../oauth.js');
var async = require('async');

function Sync() {
  this.history = new WatchedHistory();
};

Sync.prototype = {
  needToSync: function(callback) {
    Oauth.getUserInfo(function() {
      ChromeStorage.get(null, function(data) {
        if (data.auto_sync) {
          var today = new Date();
          today.setHours(0, 0, 0, 0);
          var lastSync = new Date(data.synced_at);
          lastSync.setHours(0, 0, 0, 0);
          var needToSync = !data.synced_at || today > lastSync;
          callback.call(this, needToSync);
        } else {
          callback.call(this, false);
        }
      });
    }, function() {
      callback.call(this, false);
    });
  },

  start: function(callback) {
    this.callback = callback;
    this.onSyncStart();
  },

  onSyncStart: function() {
    ChromeStorage.get('synced_at', function(data) {
      ViewingActivity.list({
        success: function(response) {
          ViewingActivityParser.start({
            data: response,
            callback: this.syncActivities.bind(this),
            syncedAt: data.synced_at
          });
        }.bind(this),
        error: this.onError.bind(this)
      });
    }.bind(this));
  },

  syncActivities: function(activities) {
    if (activities.length > 0) {
      async.filter(activities, this.syncActivity.bind(this), function(activities) {
        if (activities.length > 0) {
          this.history.send(activities, this.onCompleted.bind(this));
        } else {
          this.onCompleted(true);
        }
      }.bind(this));
    } else {
      this.onCompleted(true);
    }
  },

  onCompleted: function(success) {
    if (success) {
      var now = new Date();
      ChromeStorage.set({ 'synced_at': now.toISOString() }, function() {});
    }

    this.callback.call(this, success);
  },

  syncActivity: function(activity, callback) {
    this.history.include({
      activity: activity,
      success: function(include) {
        callback(!include);
      },
      error: function(status, response) {
        callback(true);
      }
    });
  },

  onError: function(status, response) {
    console.error('traktflix: Sync error', status, response);
  }
};

module.exports = Sync;