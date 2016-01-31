'use strict';

var Request = require('../request.js');
var Settings = require('../settings.js');

function Scrobble(options) {
  if (options.type === 'show') {
    this.item = { episode: options.response };
  } else {
    this.item = { movie: options.response.movie };
  }

  this.onProgressChange();
  this.url = Settings.apiUri + '/scrobble';
  this.success = options.success;
  this.error = options.error;
  this.startProgressTimeout();
};

Scrobble.prototype = {
  startProgressTimeout: function() {
    this.progressChangeInterval = setInterval(function() {
      this.onProgressChange();
    }.bind(this), 1000);
  },

  stopProgressTimeout: function() {
    clearInterval(this.progressChangeInterval);
  },

  onProgressChange: function() {
    if (document.querySelector('.player-slider progress')) {
      this.castScrubber();
    } else {
      this.webScrubber();
    }
  },

  webScrubber: function() {
    var scrubber = document.querySelector('#scrubber-component .player-scrubber-progress-completed');
    if (scrubber) {
      this.progress = parseFloat(scrubber.style.width);
    }
  },

  castScrubber: function() {
    var progressElement = document.querySelector('.player-slider progress');
    if (progressElement) {
      var newProgress = parseInt(progressElement.getAttribute('value')) * 100 / parseFloat(progressElement.getAttribute('max'));
      if (newProgress > 0) {
        this.progress = newProgress;
      }
    }
  },

  _sendScrobble: function(options) {
    var params = this.item;
    params.progress = this.progress;

    Request.send({
      method: 'POST',
      url: this.url + options.path,
      params: params,
      success: this.success,
      error: this.error
    });
  },

  start: function() {
    this._sendScrobble({ path: '/start' });
  },

  pause: function() {
    this._sendScrobble({ path: '/pause' });
  },

  stop: function() {
    this._sendScrobble({ path: '/stop' });
    this.stopProgressTimeout();
  }
};

module.exports = Scrobble;
