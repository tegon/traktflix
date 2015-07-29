'use strict';

/* This was necessary to priorize Netflix version (of House of Cards) over BBC version.
  I left this object because it could be useful for other movies/shows */
var fullTitles = {
  'House of Cards': 'House of Cards (US)'
};

function Item(options) {
  this.scrubber = options.scrubber;
  this.title = fullTitles[options.title] || options.title;
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