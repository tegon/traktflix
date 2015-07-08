'use strict';

var WatchEvents = require('./watch-events.js');
var ItemParser = require('./item-parser.js');

var events = new WatchEvents({
  onPlay: function(e) {
    console.log('onPlay', e);
    ItemParser.start(function(item) {
      chrome.storage.sync.set({ item: JSON.stringify(item) }, function() {
        console.log('saved');
      });
    });
  },

  onPause: function(e) {
    console.log('onPause', e);
  },

  onStop: function(e) {
    console.log('onStop', e);
    chrome.storage.sync.set({ item: null }, function() {
      console.log('removed');
    });
  }
});

events.startListeners();

if (location.href.match(/watch/)) {
  item = ItemParser.start();
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.getCurrentItem) {
    return sendResponse({ });
  }
});