'use strict';

function WatchEvents(options) {
  this.mainView = document.querySelector('#appMountPoint');
  this.onPlay = options.onPlay;
  this.onPause = options.onPause;
  this.onStop = options.onStop;
}

WatchEvents.prototype = {
  startListeners: function() {
    this.addPlayPauseListener();
    this.addStopListener();
  },

  stopListeners: function() {
    this.removePlayPauseListener();
    this.removeStopListener();
  },

  addPlayPauseListener: function() {
    this.mainView.addEventListener('click', this.onPlayPause.bind(this), false);
  },

  addStopListener: function() {
    window.onpopstate = this.onStop;
    window.onbeforeunload = function() {
      this.onStop();
      this.stopListeners();
    }.bind(this)
  },

  onPlayPause: function(e) {
    if (e.target.classList.contains('play')) {
      this.onPlay(e);
    } else if (e.target.classList.contains('pause')) {
      this.onPause(e);
    }
  },

  removePlayPauseListener: function() {
    this.mainView.removeEventListener('click', this.onPlayPause.bind(this), false);
  },

  removeStopListener: function() {
    window.onpopstate = null;
    window.onbeforeunload = null;
  }
};

module.exports = WatchEvents;