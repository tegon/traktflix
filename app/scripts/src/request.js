'use strict';

var Settings = require('./settings.js');
var ChromeStorage = require('./chrome-storage.js');

function Request() {};

Request._send = function _send(options, accessToken) {
  var xhr = new XMLHttpRequest();

  xhr.open(options.method, options.url, true);
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.setRequestHeader('trakt-api-key', Settings.clientId);
  xhr.setRequestHeader('trakt-api-version', Settings.apiVersion);

  if (accessToken) {
    xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
  }

  xhr.onreadystatechange = function(e) {
    if (this.readyState === 4) {
      if (this.status >= 200 && this.status < 400) {
        options.success.call(this, this.response);
      } else {
        options.error.call(this, this.status, this.responseText);
      }
    }
  };

  xhr.send(JSON.stringify(options.params));
};

Request.send = function send(options) {
  ChromeStorage.get('access_token', function(data) {
    Request._send(options, data.access_token);
  }.bind(this));
};

module.exports = Request;