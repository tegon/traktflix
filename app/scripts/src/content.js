'use strict';

var WatchEvents = require('./watch-events.js');
var ItemParser = require('./item-parser.js');
var Search = require('./search.js');

var currentItem;

function onSearchSuccess(response) {
  console.log('success', response);
}

function onSearchError(status, response) {
  console.log('error', status, response);
}

function storeItem(item) {
  currentItem = item;
  chrome.storage.sync.set({ item: JSON.stringify(currentItem) }, function() {});

  if (currentItem !== null) {
    var search = new Search({ item: currentItem });

    if (currentItem.type == 'show') {
      search.findEpisode({ success: onSearchSuccess, error: onSearchError });
    } else {
      search.findMovie({ success: onSearchSuccess, error: onSearchError });
    }
  }
}

var events = new WatchEvents({
  onPlay: function(e) {
    console.log('onPlay', e);
    ItemParser.start(storeItem);
  },

  onPause: function(e) {
    console.log('onPause', e);
  },

  onStop: function(e) {
    console.log('onStop', e);
    storeItem(null);
  }
});

events.startListeners();

if (location.href.match(/watch/)) {
  ItemParser.start(storeItem);
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.getCurrentItem) {
    return sendResponse({ item: currentItem });
  }
});