'use_strict';

var ItemParser = require('./item-parser.js');
var Search = require('./search.js');
var Scrobble = require('./scrobble.js');

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
      scrubber: this.item.getScrubber.bind(this.item),
      success: this.onScrobbleSuccess.bind(this),
      error: this.onScrobbleError.bind(this)
    });

    this.setActiveIcon();
    this.scrobble.start();
    this.sendAnalyticsEvent({ name: 'Scrobble', value: 'start' });
  },

  onSearchError: function(status, response) {
    this.sendAnalyticsEvent({ name: 'onSearchError', value: status });
    console.error('traktflix: Search error', status, response);
    this.onError(response);
  },

  onScrobbleSuccess: function() {
    this.sendAnalyticsEvent({ name: 'Scrobble', value: 'onSuccess' });
  },

  onScrobbleError: function(status, response) {
    this.sendAnalyticsEvent({ name: 'Scrobble', value: 'onError' });
    console.error('traktflix: Scrobble error', status);
    this.onError(response);
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

  onError: function(e) {
    this.setErrorIcon();
    chrome.runtime.sendMessage({ type: 'onError', error: e });
  },

  setInactiveIcon: function() {
    chrome.runtime.sendMessage({ type: 'setInactiveIcon' });
  },

  setActiveIcon: function() {
    chrome.runtime.sendMessage({ type: 'setActiveIcon' });
  },

  setErrorIcon: function() {
    chrome.runtime.sendMessage({ type: 'setErrorIcon' });
  },

  sendAnalyticsEvent: function(options) {
    chrome.runtime.sendMessage({
      type: 'sendEvent', name: options.name, value: options.value
    });
  },

  getCurrentItem: function() {
    if (this.item && this.item.type === 'show') {
      return { item: this.scrobble.item.episode };
    } else if (this.item && this.item.type === 'movie') {
      return { item: this.scrobble.item.movie };
    }
  }
};

module.exports = ContentController;