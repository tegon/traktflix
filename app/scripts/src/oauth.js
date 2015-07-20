'use strict';

var Utils = require('./utils.js');
var Settings = require('./settings.js');
var Request = require('./request.js');

function Oauth() {}

Oauth.authorize = function authorize(url, callback) {
  chrome.runtime.sendMessage({ type: 'authorize', options: { 'url': url,
    'interactive': true } }, callback);
};

Oauth.onAuthorize = function onAuthorize(callback) {
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type == 'authorize') {
      callback.call(this, request, sendResponse);
    }
  });
};

Oauth.getCode = function getCode(redirectUrl) {
  var code = redirectUrl.split('?')[1];
  return code.split('=')[1];
};

Oauth.requestToken = function requestToken(params, sendResponse) {
  Request.send({
    method: 'POST',
    url: Settings.apiUri + '/oauth/token',
    params: params,
    success: function(response) {
      var options = JSON.parse(response);
      Utils.Storage.set(options, function() {
        sendResponse.call(this, false, response);
      });
    },
    error: function(status, response) {
      sendResponse.call(this, true, response, status);
    }
  });
};

Oauth.requestRefreshToken = function requestRefreshToken(refreshToken, sendResponse) {
  var params = {
    refresh_token: refreshToken,
    client_id: Settings.clientId,
    client_secret: Settings.clientSecret,
    redirect_uri: Settings.redirectUri,
    grant_type: 'refresh_token'
  };

  Oauth.requestToken(params);
}

module.exports = Oauth;