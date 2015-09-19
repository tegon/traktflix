'use strict';

var ViewingActivity = require('./viewing-activity.js');
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
      syncedAt: this.syncedAt,
      success: this.syncActivities,
      error: this.onError
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
    });
  },

  syncActivities: function(activities) {
    if (activities.length > 0) {
      history.list({
        success: activities.forEach(this.syncActivity.bind(this)),
        error: this.onError
      });
    }
  },

  syncActivity: function(activity) {
    this.history.include(activity, function(include)) {
      if (!include) {
        this.addToHistory(activity);
      }
    }
  },

  addToHistory: function(activity) {
    this.history.add(activity);
  },

  onError: function(status, response) {
    console.log('onError', status, response);
  }
};

module.exports = Sync;