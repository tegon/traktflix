'use strict';

var Analytics = require('./analytics.js');
var Oauth = require('../oauth.js');
var Settings = require('../settings.js');
var service = analytics.getService('traktflix');
var tracker = service.getTracker(Settings.analyticsId);
Analytics.setTracker(tracker);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  switch(request.type) {
    case 'setActiveIcon':
      chrome.browserAction.setIcon({
        path: chrome.runtime.getManifest().browser_action.selected_icon
      });
      break;
    case 'setInactiveIcon':
      chrome.browserAction.setIcon({
        path: chrome.runtime.getManifest().browser_action.default_icon
      });
      break;
    case 'launchAuthorize':
      Oauth.authorize(sendResponse);
      return true;
      break;
    case 'sendAppView':
      Analytics.sendAppView(request.view);
      break;
    case 'sendEvent':
      Analytics.sendEvent(request.name, request.value);
      break;
    case 'getCurrentToken':
      chrome.storage.local.get('access_token', sendResponse);
      return true;
      break;
  }
});