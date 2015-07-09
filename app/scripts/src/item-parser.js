'use strict';

var Item = require('./item.js');

function ItemParser() {}

ItemParser.isReady = function checkPage() {
  var scrubber = document.querySelector('.player-scrubber-progress-completed');
  return scrubber !== null;
};

ItemParser.parse = function parse(callback) {
  var item;
  var scrubber = document.querySelector('.player-scrubber-progress-completed');
  var playerStatus = document.querySelectorAll('.player-status span');
  var type = playerStatus.length > 1 ? 'show' : 'movie';
  var mainTitle = playerStatus[0].textContent;

  if (type === 'show') {
    var episode = playerStatus[1].textContent.match(/\d+/g);
    var season = episode[0];
    var number = episode[1];
    var title = playerStatus[2].textContent;

    item = new Item({
      epTitle: title,
      scrubber: scrubber,
      title: mainTitle,
      season: season,
      episode: number,
      type: type
    });
  } else {
    item = new Item({ scrubber: scrubber, title: mainTitle, type: type });
  }

  callback.call(this, item);
}

ItemParser.start = function start(callback) {
  var readyTimeout;

  if (ItemParser.isReady()) {
    ItemParser.parse(callback);
  } else {
    readyTimeout = setTimeout(function() {
      if (ItemParser.isReady()) {
        clearTimeout(readyTimeout);
        ItemParser.parse(callback);
      } else {
        ItemParser.start(callback);
      }
    }, 500);
  }
};

module.exports = ItemParser;