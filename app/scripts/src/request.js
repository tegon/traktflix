'use strict';

var Settings = require('./settings.js');

function Request() {};

Request.getCurrentToken = function getCurrentToken(callback) {
  if (chrome.tabs) { // Not in content_script. Safe to call chrome.storage
    chrome.storage.local.get('access_token', callback);
  } else { // Send a message so that background script handle chrome.storage calls
    chrome.runtime.sendMessage({ type: 'getCurrentToken' }, callback);
  }
};

Request._send = function _send(options, accessToken) {
  var xhr = new XMLHttpRequest();

  xhr.open(options.method, options.url, true);
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.setRequestHeader('trakt-api-key', Settings.clientId);
  xhr.setRequestHeader('trakt-api-version', Settings.apiVersion);

  if (accessToken) {
    xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
  }

  xhr.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      options.success.call(this, this.response);
    } else {
      options.error.call(this, this.status, this.responseText);
    }
  };
  xhr.onerror = options.error;

  xhr.send(JSON.stringify(options.params));
};

Request.send = function send(options) {
  Request.getCurrentToken(function(data) {
    Request._send(options, data.access_token);
  }.bind(this));
};

module.exports = Request;