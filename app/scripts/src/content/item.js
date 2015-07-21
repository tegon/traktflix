'use strict';

function Item(options) {
  this.scrubber = options.scrubber;
  this.title = options.title;
  this.type = options.type;

  if (this.type === 'show') {
    this.epTitle = options.epTitle;
    this.season = options.season;
    this.episode = options.episode;
  }
}

Item.prototype.getScrubber = function() {
  return parseFloat(parseFloat(this.scrubber.style.width).toFixed(2));
};

module.exports = Item;