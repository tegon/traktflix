'use strict';

var Request = require('./request.js');

function Scrobble(options) {
  this.item = options.item;
  this.scrubber = options.scrubber;
  this.url = 'https://api-v2launch.trakt.tv/scrobble';
};

Scrobble.prototype = {
  _sendScrobble: function(options) {
    var params = this.item;
    params.progress = this.scrubber.call();

    Request.send({
      method: 'POST',
      url: this.url + options.path,
      params: params,
      success: options.success,
      error: options.error
    });
  },

  start: function(options) {
    this._sendScrobble({ path: '/start', success: options.success, error: options.error });
  },

  pause: function(options) {
    this._sendScrobble({ path: '/pause', success: options.success, error: options.error });
  },

  stop: function(options) {
    this._sendScrobble({ path: '/stop', success: options.success, error: options.error });
  }
};

module.exports = Scrobble;