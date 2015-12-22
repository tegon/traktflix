'use strict';

var KEY_SPACE = 32;
var KEY_ENTER = 13;
var KEY_LEFT_ARROW = 37;
var KEY_RIGHT_ARROW = 39;

function WatchEvents(options) {
  this.document = document;
  this.onPlay = options.onPlay;
  this.onPause = options.onPause;
  this.onStop = options.onStop;
  this.url = location.href;
}

WatchEvents.prototype = {
  startListeners: function() {
    this.addClickListener();
    this.addStopListener();
    this.addKeyUpListener();
    this.addUrlChangeListener();
  },

  stopListeners: function() {
    this.removeClickListener();
    this.removeStopListener();
    this.removeKeyUpListener();
    this.removeUrlChangeListener();
  },

  addClickListener: function() {
    this.document.addEventListener('click', this.onClick.bind(this), false);
  },

  addStopListener: function() {
    window.onbeforeunload = function() {
      this.onStop();
      this.stopListeners();
    }.bind(this)
  },

  addKeyUpListener: function() {
    this.document.addEventListener('keyup', this.onKeyUp.bind(this), false);
  },

  addUrlChangeListener: function() {
    this.urlChangeInterval = setInterval(function() {
      if (this.url !== location.href) {
        this.onUrlChange(this.url, location.href);
        this.url = location.href;
      }
    }.bind(this), 1000);
  },

  onClick: function(e) {
    if (e.target.classList.contains('player-play-pause')) {
      if (e.target.classList.contains('play')) {
        this.onPlay(e);
      } else if (e.target.classList.contains('pause')) {
        this.onPause(e);
      }
    } else if (e.target.className === 'player-scrubber-target' ||
        e.target.className === 'player-scrubber-progress-completed' ||
        e.target.className === 'player-scrubber-progress-buffered' ||
        e.target.className === 'player-scrubber-progress' ||
        e.target.className === 'player-scrubber horizontal') {
      this.isPlaying() ? this.onPlay(e) : this.onPause(e);
    }
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

  onKeyUp: function(e) {
    switch (e.which) {
      /* If the video is playing, the obvious would be call onPause,
        if isn't playing, call onPlay.
        But the HTML of the player gets updated before this function is called,
        this way the correct approach is invert the conditions */
      case KEY_SPACE:
        this.isPlaying() ? this.onPlay(e) : this.onPause(e);
        break;
      case KEY_ENTER:
        this.isPlaying() ? this.onPlay(e) : this.onPause(e);
        break;
      case KEY_LEFT_ARROW:
        this.onPause(e);
        break;
      case KEY_RIGHT_ARROW:
        this.onPause(e);
        break;
    }
  },

  removeClickListener: function() {
    this.document.removeEventListener('click', this.onClick.bind(this), false);
  },

  removeStopListener: function() {
    window.onpopstate = null;
    window.onbeforeunload = null;
  },

  removeKeyUpListener: function() {
    this.document.removeEventListener('keyup', this.onKeyUp.bind(this), false);
  },

  removeUrlChangeListener: function() {
    clearInterval(this.urlChangeInterval);
  },

  isPlaying: function() {
    var playPause = this.document.querySelector('.player-play-pause');
    return playPause && playPause.classList.contains('pause');
  }
};

module.exports = WatchEvents;
