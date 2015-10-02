'use strict';

var ViewingActivity = require('./viewing-activity.js');
var ViewingActivityParser = require('./viewing-activity-parser.js');
var WatchedHistory = require('./watched-history.js');

function Sync() {
  this.history = new WatchedHistory();
};

Sync.prototype = {
  start: function() {
    this.syncIfNeeded();
  },

  onSyncStart: function() {
    ViewingActivity.list({
      success: function(response) {
        ViewingActivityParser.start({
          data: response,
          success: this.syncActivities.bind(this),
          syncedAt: this.syncedAt,
          error: this.onError.bind(this)
        });
      }.bind(this),
      error: this.onError.bind(this)
    });
  },

  needToSync: function(syncedAt) {
    return !syncedAt || new Date() > new Date(syncedAt);
  },

  syncIfNeeded: function() {
    chrome.runtime.sendMessage({ type: 'getLastSyncedAt' }, function(data) {
      if (this.needToSync(data.synced_at)) {
        this.syncedAt = data.synced_at;
        this.onSyncStart();
      }
    }.bind(this));
  },

  syncActivities: function(activities) {
    if (activities.length > 0) {
      activities.forEach(this.syncActivity.bind(this)),
      this.history.send();
    }
  },

  syncActivity: function(activity) {
    this.history.include({
      activity: activity,
      success: function(include) {
        if (!include) {
          this.addToHistory(activity);
        }
      }.bind(this),
      error: function(status, response) {
        this.onError(status, response);
      }.bind(this)
    });
  },

  addToHistory: function(activity) {
    this.history.add(activity);
  },

  onError: function(status, response) {
    console.log('onError', status, response);
  }
};

module.exports = Sync;