'use strict';

var Request = require('../request.js');
var Settings = require('../settings.js');

function Scrobble(options) {
  if (options.type === 'show') {
    this.item = { episode: options.response };
  } else {
    var movie = options.response.movie || {};
    movie.type = 'movie';
    this.item = { movie: movie };
  }

  this.onProgressChange();
  this.url = Settings.apiUri + '/scrobble';
  this.success = options.success;
  this.error = options.error;
  this.startProgressTimeout();
};

Scrobble.prototype = {
  startProgressTimeout: function() {
    this.progressChangeInterval = setTimeout(function() {
      this.onProgressChange();
      clearTimeout(this.progressChangeInterval);
      this.startProgressTimeout();
    }.bind(this), 1000);
  },

  stopProgressTimeout: function() {
    clearInterval(this.progressChangeInterval);
  },

  onProgressChange: function() {
    this.webScrubber();
  },

  webScrubber: function() {
    var scrubber = document.querySelector('.scrubber-bar .current-progress');
    if (!this.basePercentage || !this.baseTime) {
      if (scrubber) {
        this.basePercentage = 100 - parseFloat(scrubber.style.width);
      }
      this.baseTime = this.getRemainingTime();
    }
    if (scrubber) {
      var currentPercentage = 100 - parseFloat(scrubber.style.width);
      if (currentPercentage != this.basePercentage) {
        this.basePercentage = currentPercentage;
        this.baseTime = this.getRemainingTime();
      }

      var newProgress = 100 - ((this.basePercentage * this.getRemainingTime()) / this.baseTime);
      if (newProgress > 0) {
        this.progress = newProgress;
      }
    }
  },

  getRemainingTime: function() {
    var timeLabel = document.querySelector('time');
    if (timeLabel) {
      return parseInt(timeLabel.textContent.replace(':', '').replace(':', ''));
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
