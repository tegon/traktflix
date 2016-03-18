'use strict';

var Analytics = require('./analytics.js');
var Oauth = require('../oauth.js');
var Settings = require('../settings.js');
var service = analytics.getService('traktflix');
var rollbar = require('../rollbar.js');
var tracker = service.getTracker(Settings.analyticsId);
Analytics.setTracker(tracker);

chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { hostSuffix: 'netflix.com' }
        })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  switch(request.type) {
    case 'setActiveIcon':
      chrome.pageAction.setIcon({
        tabId: sender.tab.id,
        path: chrome.runtime.getManifest().page_action.selected_icon
      });
      break;
    case 'setInactiveIcon':
      chrome.pageAction.setIcon({
        tabId: sender.tab.id,
        path: chrome.runtime.getManifest().page_action.default_icon
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
    case 'getStorageValue':
      chrome.storage.local.get(request.key, sendResponse);
      return true;
      break;
    case 'setStorageValue':
      chrome.storage.local.set(request.value, sendResponse);
      return true;
      break;
    case 'clearStorage':
      chrome.storage.local.clear(sendResponse);
      return true;
      break;
  }
});
