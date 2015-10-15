var Sync = require('../../app/scripts/src/content/sync.js');
var WatchedHistory = require('../../app/scripts/src/content/watched-history.js');
var ViewingActivity = require('../../app/scripts/src/content/viewing-activity.js');
var ViewingActivityParser = require('../../app/scripts/src/content/viewing-activity-parser.js');
var ChromeStorage = require('../../app/scripts/src/chrome-storage.js');
var sync = new Sync();
var callback = sinon.spy();
var onError = sinon.spy(sync, 'onError');

describe('Sync', function() {
  beforeEach(function() {
    this.xhr = sinon.useFakeXMLHttpRequest();
    var requests = this.requests = [];
    this.xhr.onCreate = function (xhr) {
      requests.push(xhr);
    };
  });

  afterEach(function() {
    this.xhr.restore();
    callback.reset();
    onError.reset();
  });

  it('creates a new sync', function() {
    expect(sync.history instanceof WatchedHistory).toBeTruthy();
  });

  describe('needToSync', function() {
    it('returns false when user is not logged', function() {
      sync.needToSync(callback);
      this.requests[0].respond(400, { 'Content-Type': 'application/json' },
        '{ "error": "Bad Request" }');
      expect(callback.callCount).toBe(1);
      expect(callback.getCall(0).args).toEqual([false]);
    });

    it('returns false when auto_sync is undefined', function() {
      window.chrome.storage.local.get.restore();
      sinon.stub(window.chrome.storage.local, 'get', function(data, cb) {
        cb.call(this, {});
      });
      sync.needToSync(callback);
      this.requests[0].respond(200, { 'Content-Type': 'application/json' },
        '{ "username": "foozin" }');
      expect(callback.callCount).toBe(1);
      expect(callback.getCall(0).args).toEqual([false]);
    });

    it('returns true when user is logged, auto_sync is true and synced_at is undefined', function() {
      window.chrome.storage.local.get.restore();
      sinon.stub(window.chrome.storage.local, 'get', function(data, cb) {
        cb.call(this, { 'auto_sync': true });
      });
      sync.needToSync(callback);
      this.requests[0].respond(200, { 'Content-Type': 'application/json' },
        '{ "username": "foozin" }');
      expect(callback.callCount).toBe(1);
      expect(callback.getCall(0).args).toEqual([true]);
    });

    it('returns false when user is logged, auto_sync is true and synced_at equals to today', function() {
      window.chrome.storage.local.get.restore();
      sinon.stub(window.chrome.storage.local, 'get', function(data, cb) {
        cb.call(this, { 'auto_sync': true, 'synced_at': new Date().toISOString() });
      });
      sync.needToSync(callback);
      this.requests[0].respond(200, { 'Content-Type': 'application/json' },
        '{ "username": "foozin" }');
      expect(callback.callCount).toBe(1);
      expect(callback.getCall(0).args).toEqual([false]);
    });

    it('returns true when user is logged, auto_sync is true and synced_at is less than to today', function() {
      window.chrome.storage.local.get.restore();
      var yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      sinon.stub(window.chrome.storage.local, 'get', function(data, cb) {
        cb.call(this, { 'auto_sync': true, 'synced_at': yesterday.toISOString() });
      });
      sync.needToSync(callback);
      this.requests[0].respond(200, { 'Content-Type': 'application/json' },
        '{ "username": "foozin" }');
      expect(callback.callCount).toBe(1);
      expect(callback.getCall(0).args).toEqual([true]);
    });
  });

  describe('start', function() {
    var syncStart = sinon.spy(sync, 'onSyncStart');

    afterEach(function() {
      syncStart.reset();
    });

    it('sets the callback', function() {
      sync.start(callback);
      expect(sync.callback).toBe(callback);
    });

    it('calls onSyncStart', function() {
      sync.start(callback);
      expect(syncStart.callCount).toBe(1);
    });
  });

  describe('onSyncStart', function() {
    var parser = sinon.stub(ViewingActivityParser, 'start', function(options) {
      options.success.call(this, {});
    });
    var list = sinon.stub(ViewingActivity, 'list', function(options) {
      options.success.call(this, {});
    });
    var syncActivities = sinon.spy(sync, 'syncActivities');

    beforeEach(function() {
      parser.reset();
      list.reset();
      syncActivities.reset();
    });

    it('calls ViewingActivity.list', function() {
      sync.onSyncStart();
      expect(list.callCount).toBe(1);
    });

    it('when ViewingActivity.list succeds, ViewingActivityParser.start is called', function() {
      sync.onSyncStart();
      expect(list.callCount).toBe(1);
      expect(parser.callCount).toBe(1);
    });

    it('when ViewingActivityParser.start succeds, sync.syncActivities is called', function() {
      sync.onSyncStart();
      expect(list.callCount).toBe(1);
      expect(parser.callCount).toBe(1);
      expect(syncActivities.callCount).toBe(1);
    });

    it('when ViewingActivityParser.start fails, sync.onError is called', function() {
      parser.restore();
      parser = sinon.stub(ViewingActivityParser, 'start', function(options) {
        options.error.call(this, {});
      });
      sync.onSyncStart();
      expect(list.callCount).toBe(1);
      expect(parser.callCount).toBe(1);
      expect(onError.callCount).toBe(1);
    });

    it('when ViewingActivity.list fails, sync.onError is called', function() {
      list.restore();
      list = sinon.stub(ViewingActivity, 'list', function(options) {
        options.error.call(this, {});
      });
      sync.onSyncStart();
      expect(list.callCount).toBe(1);
      expect(onError.callCount).toBe(1);
    });
  });

  describe('syncActivity', function() {
    var activity = new ViewingActivity({});

    beforeEach(function() {
      if (sync.syncActivity.restore) {
        sync.syncActivity.restore();
      }
    });

    it('when include returns true, the callback is called with false', function() {
      var include = sinon.stub(sync.history, 'include', function(options) {
        options.success.call(this, true);
      });
      sync.syncActivity(activity, callback);
      expect(callback.callCount).toBe(1);
      expect(callback.getCall(0).args).toEqual([false]);
    });

    it('when include returns false, the callback is called with true', function() {
      sync.history.include.restore();
      var include = sinon.stub(sync.history, 'include', function(options) {
        options.success.call(this, false);
      });
      sync.syncActivity(activity, callback);
      expect(callback.callCount).toBe(1);
      expect(callback.getCall(0).args).toEqual([true]);
    });

    it('when include failure, the callback is called with true', function() {
      sync.history.include.restore();
      var include = sinon.stub(sync.history, 'include', function(options) {
        options.error.call(this);
      });
      sync.syncActivity(activity, callback);
      expect(callback.callCount).toBe(1);
      expect(callback.getCall(0).args).toEqual([true]);
    });
  });

  describe('syncActivities', function() {
    var onCompleted = sinon.spy(sync, 'onCompleted');
    var syncActivity = sinon.stub(sync, 'syncActivity', function(activity, callback) {
      callback.call(this, true);
    });
    var history = sinon.stub(sync.history, 'send', function(activities, callback) {
      callback.call(this, true);
    });
    var activities = [new ViewingActivity({}), new ViewingActivity({})];

    beforeEach(function() {
      onCompleted.reset();
      syncActivity.reset();
      history.reset();
    });

    it('when activities are empty, onCompleted is called', function() {
      sync.syncActivities([]);
      expect(onCompleted.callCount).toBe(1);
      expect(onCompleted.getCall(0).args).toEqual([true]);
    });

    it('when activities.length are > 0, history.send is called', function() {
      syncActivity.restore();
      syncActivity = sinon.stub(sync, 'syncActivity', function(activity, callback) {
        callback.call(this, true);
      });
      sync.syncActivities(activities);
      expect(syncActivity.callCount).toBe(2);
      expect(history.callCount).toBe(1);
      expect(onCompleted.callCount).toBe(1);
      expect(onCompleted.getCall(0).args).toEqual([true]);
    });

    it('when activities are already synced, history.send is not called', function() {
      syncActivity.restore();
      syncActivity = sinon.stub(sync, 'syncActivity', function(activity, callback) {
        callback.call(this, false);
      });
      sync.syncActivities(activities);
      expect(syncActivity.callCount).toBe(2);
      expect(history.callCount).toBe(0);
      expect(onCompleted.callCount).toBe(1);
      expect(onCompleted.getCall(0).args).toEqual([true]);
    });
  });

  describe('onCompleted', function() {
    var set = sinon.spy(ChromeStorage, 'set');
    sync.callback = callback;

    afterEach(function() {
      set.reset();
      sync.callback.reset();
    });

    it('calls the callback with success', function() {
      sync.onCompleted(true);
      expect(sync.callback.callCount).toBe(1);
      expect(sync.callback.getCall(0).args).toEqual([true]);
    });

    it('calls the callback with failure', function() {
      sync.onCompleted(false);
      expect(sync.callback.callCount).toBe(1);
      expect(sync.callback.getCall(0).args).toEqual([false]);
    });

    it('sets the synced_at when callback is called with success', function() {
      sync.onCompleted(true);
      expect(sync.callback.callCount).toBe(1);
      expect(sync.callback.getCall(0).args).toEqual([true]);
      expect(set.callCount).toBe(1);
    });

    it('does not set the synced_at when callback is called with failure', function() {
      sync.onCompleted(false);
      expect(sync.callback.callCount).toBe(1);
      expect(sync.callback.getCall(0).args).toEqual([false]);
      expect(set.callCount).toBe(0);
    });
  });
});