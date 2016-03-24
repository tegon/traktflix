'use strict';

function WatchEvents(options) {
  this.document = document;
  this.onPlay = options.onPlay;
  this.onStop = options.onStop;
  this.url = location.href;
}

WatchEvents.prototype = {
  startListeners: function() {
    this.addStopListener();
    this.addUrlChangeListener();
  },

  stopListeners: function() {
    this.removeStopListener();
    this.removeUrlChangeListener();
  },

  addClickListener: function() {
    this.document.addEventListener('click', this.onClick.bind(this), false);
  },

  addStopListener: function() {
    window.onbeforeunload = window.onunload = function() {
      this.onStop();
      this.stopListeners();
    }.bind(this)
  },

  addUrlChangeListener: function() {
    this.urlChangeInterval = setTimeout(function() {
      if (this.url !== location.href) {
        this.onUrlChange(this.url, location.href);
        this.url = location.href;
      }
      clearTimeout(this.urlChangeInterval);
      this.addUrlChangeListener();
    }.bind(this), 500);
  },

  onUrlChange: function(oldUrl, newUrl) {
    if (/watch/.test(oldUrl) && /watch/.test(newUrl)) {
      this.onStop();
      this.onPlay();
    } else if (/watch/.test(oldUrl) && !/watch/.test(newUrl)) {
      this.onStop();
    } else if (!/watch/.test(oldUrl) && /watch/.test(newUrl)) {
      this.onPlay();
    }
  },

  removeStopListener: function() {
    window.onpopstate = null;
    window.onbeforeunload = null;
  },

  removeUrlChangeListener: function() {
    clearInterval(this.urlChangeInterval);
  },
};

module.exports = WatchEvents;
