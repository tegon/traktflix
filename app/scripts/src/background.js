'use strict';

var Utils = require('./utils.js');
var Settings = require('./settings.js');
var Request = require('./request.js');
var Oauth = require('./oauth.js');
var service = analytics.getService('traktflix');
var tracker = service.getTracker(Settings.analyticsId);
Utils.Analytics.setTracker(tracker);

Utils.Messages.addListener('setActiveIcon', function(){
  chrome.browserAction.setIcon({
    path: {
      19: 'images/traktflix-icon-selected-19.png',
      38: 'images/traktflix-icon-selected-38.png'
    }
  });
});

Utils.Messages.addListener('setInactiveIcon', function(){
  chrome.browserAction.setIcon({
    path: {
      19: 'images/traktflix-icon-19.png',
      38: 'images/traktflix-icon-38.png'
    }
  });
});

Utils.Analytics.addListener('sendView', function(options) {
  if (Utils.Analytics.tracker !== undefined) {
    Utils.Analytics.tracker.sendAppView(options.view);
  }
});

Utils.Analytics.addListener('sendEvent', function(options) {
  if (Utils.Analytics.tracker !== undefined) {
    Utils.Analytics.tracker.sendEvent(options.name, options.value);
  }
});

Oauth.onAuthorize(function(request, sendResponse) {
  chrome.identity.launchWebAuthFlow(request.options, function(redirectUrl) {
    var params = {
      code: Oauth.getCode(redirectUrl),
      client_id: Settings.clientId,
      client_secret: Settings.clientSecret,
      redirect_uri: Settings.redirectUri,
      grant_type: 'authorization_code'
    };

    Oauth.requestToken(params, sendResponse);
  });
});