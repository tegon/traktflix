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
      Utils.Storage.clear(function() {
        sendResponse.call(this, true, response, status);
      });
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

  Oauth.requestToken(params, sendResponse);
};

Oauth.getUserInfo = function getUserInfo(success, error) {
  Request.send({
    method: 'GET',
    url: Settings.apiUri + '/users/me',
    success: success,
    error: function(status, response) {
      if (status === 401) {
        Utils.Storage.get(function(data) {
          if (data.refresh_token) {
            Oauth.requestRefreshToken(data.refresh_token, function(err, response, status) {
              if (err) {
                error.call(this, status, response);
              } else {
                success.call(this, response);
              }
            });
          } else {
            error.call(this, status, response);
          }
        }.bind(this));
      } else {
        error.call(this, status, response);
      }
    }
  });
};

module.exports = Oauth;