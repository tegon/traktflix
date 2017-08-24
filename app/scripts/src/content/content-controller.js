'use_strict';

var ItemParser = require('./item-parser.js');
var Search = require('./search.js');
var Scrobble = require('./scrobble.js');
var Rollbar = require('../rollbar.js');
var ChromeStorage = require('../chrome-storage.js');

function ContentController() {
  this.item = null;
  this.scrobble = undefined;

  if (location.href.match(/watch/)) {
    ItemParser.start(this.storeItem.bind(this));
  }
};

ContentController.prototype = {
  onSearchSuccess: function(response) {
    this.sendAnalyticsEvent({ name: 'onSearchSuccess', value: this.item.title });

    this.scrobble = new Scrobble({
      response: response,
      type: this.item.type,
      success: this.onScrobbleSuccess.bind(this),
      error: this.onScrobbleError.bind(this)
    });

    this.setActiveIcon();
    this.scrobble.start();
    this.sendAnalyticsEvent({ name: 'Scrobble', value: 'start' });
  },

  onSearchError: function(status, response, options) {
    this.sendAnalyticsEvent({ name: 'onSearchError', value: status + ' - ' + this.item.title });
    console.log('traktflix: Search error', status, response, options, this.item.title);
    this.reportError('Search', status, response, options);
  },

  onScrobbleSuccess: function() {
    this.sendAnalyticsEvent({ name: 'Scrobble', value: 'onSuccess' });
  },

  onScrobbleError: function(status, response, options) {
    this.sendAnalyticsEvent({ name: 'Scrobble', value: 'onError' });
    console.log('traktflix: Scrobble error', status, response, options);
    this.reportError('Scrobble', status, response, options);
  },

  storeItem: function(item) {
    this.item = item;

    if (this.item !== null) {
      var search = new Search({ item: this.item });
      search.find({
        success: this.onSearchSuccess.bind(this),
        error: this.onSearchError.bind(this)
      });
    } else {
      this.scrobble = undefined;
    }
  },

  onPlay: function(e) {
    if (this.item === null && this.scrobble === undefined) {
      ItemParser.start(this.storeItem.bind(this));
    } else {
      this.setActiveIcon();
      this.scrobble.start();
      this.sendAnalyticsEvent({ name: 'Scrobble', value: 'start' });
    }
  },

  onPause: function(e) {
    if (this.scrobble != undefined) {
      this.setInactiveIcon();
      this.scrobble.pause();
      this.sendAnalyticsEvent({ name: 'Scrobble', value: 'pause' });
    }
  },

  onStop: function(e) {
    if (this.scrobble !== undefined) {
      this.setInactiveIcon();
      this.scrobble.stop();
      this.sendAnalyticsEvent({ name: 'Scrobble', value: 'stop' });
    }
    this.storeItem(null);
  },

  setInactiveIcon: function() {
    chrome.runtime.sendMessage({ type: 'setInactiveIcon' });
  },

  setActiveIcon: function() {
    chrome.runtime.sendMessage({ type: 'setActiveIcon' });
  },

  sendAnalyticsEvent: function(options) {
    chrome.runtime.sendMessage({
      type: 'sendEvent', name: options.name, value: options.value
    });
  },

  showErrorNotification: function(message) {
    chrome.runtime.sendMessage({ type: 'showErrorNotification', message: message });
  },

  reportError: function(type, status, response, options) {
    if (status === 404) {
      this.showErrorNotification("Oh snap! We couldn't find what you're watching in Trakt.tv. Please leave a report with the title of the item.");
    } else if (status === 0) {
      // status 0 usually means an response without CORS
      // It could be a 401, so we check if the user has an access_token saved
      ChromeStorage.get(null, function(data) {
        if (!!data.access_token) {
          this.showErrorNotification("We couldn't talk to Trakt.tv servers. We're trying to fix it, please try again later");
          Rollbar.warning('traktflix: ' + type + ' error', { status: status, response: response, options: options });
        } else {
          this.showErrorNotification("Looks like you're not logged in. Please open the extension and login with your Trakt.tv account");
        }
      }.bind(this));
    } else {
      this.showErrorNotification("We couldn't talk to Trakt.tv servers. We're trying to fix it, please try again later");
      Rollbar.warning('traktflix: ' + type + ' error', { status: status, response: response, options: options });
    }
  },

  getCurrentItem: function() {
    if (this.item && this.scrobble && this.item.type === 'show') {
      return { item: this.scrobble.item.episode };
    } else if (this.item && this.scrobble && this.item.type === 'movie') {
      return { item: this.scrobble.item.movie };
    }
  }
};

module.exports = ContentController;
