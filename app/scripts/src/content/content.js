'use strict';

var WatchEvents = require('./watch-events.js');
var ItemParser = require('./item-parser.js');
var Search = require('./search.js');
var Scrobble = require('./scrobble.js');

var currentItem = null;
var scrobble;

function onSearchSuccess(response) {
  chrome.runtime.sendMessage({ type: 'sendEvent', name: 'onSearchSuccess', value: currentItem.title });
  var scrobbleItem;

  if (currentItem.type === 'show') {
    scrobbleItem = { episode: response };
  } else {
    scrobbleItem = { movie: response.movie };
  }

  scrobble = new Scrobble({
    item: scrobbleItem,
    scrubber: currentItem.getScrubber.bind(currentItem)
  });
  setActiveIcon();
  chrome.runtime.sendMessage({ type: 'sendEvent', name: 'Scrobble', value: 'onPlay' });
  scrobble.start({ success: onScrobbleSuccess, error: onScrobbleError });
}

function onSearchError(status, response) {
  chrome.runtime.sendMessage({ type: 'sendEvent', name: 'onSearchError', value: status });
  console.error('traktflix: Search error', status, response);
}

function onScrobbleSuccess() {
  chrome.runtime.sendMessage({ type: 'sendEvent', name: 'Scrobble', value: 'onSuccess' });
}

function onScrobbleError() {
  chrome.runtime.sendMessage({ type: 'sendEvent', name: 'Scrobble', value: 'onError' });
  console.error('traktflix: Scrobble error');
}

function storeItem(item) {
  currentItem = item;

  if (currentItem !== null) {
    var search = new Search({ item: currentItem });

    if (currentItem.type == 'show') {
      search.findEpisode({ success: onSearchSuccess, error: onSearchError });
    } else {
      search.findMovie({ success: onSearchSuccess, error: onSearchError });
    }
  } else {
    scrobble = undefined;
  }
}

var events = new WatchEvents({
  onPlay: function(e) {
    if (currentItem === null && scrobble === undefined) {
      ItemParser.start(storeItem);
    } else {
      setActiveIcon();
      chrome.runtime.sendMessage({ type: 'sendEvent', name: 'Scrobble', value: 'onPlay' });
      scrobble.start({ success: onScrobbleSuccess, error: onScrobbleError });
    }
  },

  onPause: function(e) {
    if (scrobble != undefined) {
      setInactiveIcon();
      chrome.runtime.sendMessage({ type: 'sendEvent', name: 'Scrobble', value: 'onPause' });
      scrobble.pause({ success: onScrobbleSuccess, error: onScrobbleError });
    }
  },

  onStop: function(e) {
    if (scrobble !== undefined) {
      setInactiveIcon();
      chrome.runtime.sendMessage({ type: 'sendEvent', name: 'Scrobble', value: 'onStop' });
      scrobble.stop({ success: onScrobbleSuccess, error: onScrobbleError });
    }
    storeItem(null);
  }
});

events.startListeners();

if (location.href.match(/watch/)) {
  ItemParser.start(storeItem);
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type == 'getCurrentItem') {
    sendResponse({ item: currentItem, scrobble: scrobble });
  }
});

function setInactiveIcon() {
  chrome.runtime.sendMessage({ type: 'setInactiveIcon' });
}

function setActiveIcon() {
  chrome.runtime.sendMessage({ type: 'setActiveIcon' });
}