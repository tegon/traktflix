'use strict';

var WatchEvents = require('./watch-events.js');
var ItemParser = require('./item-parser.js');
var Search = require('./search.js');
var Scrobble = require('./scrobble.js');
var Utils = require('./utils.js');

var currentItem = null;
var scrobble;

function onSearchSuccess(response) {
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
  scrobble.start({ success: onScrobbleSuccess, error: onScrobbleError });
}

function onSearchError(status, response) {
  console.error('traktflix: Search error', status, response);
}

function onScrobbleSuccess() {
}

function onScrobbleError() {
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
      scrobble.start({ success: onScrobbleSuccess, error: onScrobbleError });
    }
  },

  onPause: function(e) {
    if (scrobble != undefined) {
      setInactiveIcon();
      scrobble.pause({ success: onScrobbleSuccess, error: onScrobbleError });
    }
  },

  onStop: function(e) {
    if (scrobble !== undefined) {
      setInactiveIcon();
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

function setInactiveIcon() {
  Utils.Messages.send('setInactiveIcon', function() {});
}

function setActiveIcon() {
  Utils.Messages.send('setActiveIcon', function() {});
}