'use strict';

var WatchEvents = require('./watch-events.js');
var ItemParser = require('./item-parser.js');
var Search = require('./search.js');
var Scrobble = require('./scrobble.js');
var Utils = require('./utils.js');

var currentItem = null;
var scrobble;

function onSearchSuccess(response) {
  console.log('success', response);

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
  scrobble.start({ success: onScrobbleSuccess, error: onScrobbleError });
}

function onSearchError(status, response) {
  console.log('error', status, response);
}

function onScrobbleSuccess() {
  console.log('onScrobbleSuccess');
}

function onScrobbleError() {
  console.log('onScrobbleError');
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
    console.log('onPlay', e);
    if (currentItem === null && scrobble === undefined) {
      ItemParser.start(storeItem);
    } else {
      scrobble.start({ success: onScrobbleSuccess, error: onScrobbleError });
    }
  },

  onPause: function(e) {
    console.log('onPause', e);
    if (scrobble != undefined) {
      scrobble.pause({ success: onScrobbleSuccess, error: onScrobbleError });
    }
  },

  onStop: function(e) {
    console.log('onStop', e);
    if (scrobble !== undefined) {
      scrobble.stop({ success: onScrobbleSuccess, error: onScrobbleError });
    }
    storeItem(null);
  }
});

events.startListeners();

if (location.href.match(/watch/)) {
  ItemParser.start(storeItem);
}

Utils.Messages.addListener('getCurrentItem', function(){
  return { item: currentItem, scrobble: scrobble };
});