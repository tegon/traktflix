'use strict';

var Settings = require('./settings.js');
var Request = require('./request.js');
var ChromeStorage = require('./chrome-storage.js');
var _sendResponse = null;
var _authorizationWindow = null;

function Oauth() {};

Oauth.getAuthorizeUrl = function getAuthorizeUrl() {
  return Settings.authorizeUri + '?client_id=' + Settings.clientId +
    '&redirect_uri=' + Settings.redirectUri + '&response_type=code';
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
      chrome.storage.local.set(options, function() {
        sendResponse({ error: false, response: response });
      });
    },
    error: function(status, response) {
      chrome.storage.local.clear(function() {
        sendResponse({ error: true, response: response, status: status });
      });
    }
  });
};

Oauth.authorize = function authorize(sendResponse, redirectUrl) {
  if (redirectUrl) {
    var params = {
      code: Oauth.getCode(redirectUrl),
      client_id: Settings.clientId,
      client_secret: Settings.clientSecret,
      redirect_uri: Settings.redirectUri,
      grant_type: 'authorization_code'
    };

    Oauth.requestToken(params, obj => {
      _sendResponse(obj);
      chrome.windows.remove(_authorizationWindow.id);
    });
  } else {
    _sendResponse = sendResponse;
    chrome.windows.create({url: Oauth.getAuthorizeUrl()}, function (window) {
      _authorizationWindow = window;
    });
  }
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
        ChromeStorage.get('refresh_token', function(data) {
          if (data.refresh_token) {
            Oauth.requestRefreshToken(data.refresh_token, function(options) {
              if (options.error) {
                error.call(this, options.status, options.response);
              } else {
                success.call(this, options.response);
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
