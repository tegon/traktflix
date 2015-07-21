'use strict';

var Request = require('../request.js');
var Settings = require('../settings.js');

function Scrobble(options) {
  if (options.type === 'show') {
    this.item = { episode: options.response };
  } else {
    this.item = { movie: options.response.movie };
  }

  this.scrubber = options.scrubber;
  this.url = Settings.apiUri + '/scrobble';
  this.success = options.success;
  this.error = options.error;
};

Scrobble.prototype = {
  _sendScrobble: function(options) {
    var params = this.item;
    params.progress = this.scrubber.call();

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
  }
};

module.exports = Scrobble;