'use strict';

function Utils() {}

Utils.Storage = Utils.Storage || {};
Utils.Messages = Utils.Messages || {};
Utils.Oauth = Utils.Oauth || {};
Utils.Analytics = Utils.Analytics || {};
Utils.Analytics.tracker = undefined;

Utils.Storage.set = function set(options, callback) {
  chrome.storage.local.set(options, callback);
};

Utils.Storage.get = function get(callback) {
  chrome.storage.local.get(callback);
};

Utils.Storage.clear = function clear(callback) {
  chrome.storage.local.clear(callback);
};

Utils.Messages._sendTabsMessage = function _sendTabsMessage(type, callback) {
  chrome.tabs.query({ url: 'http://*.netflix.com/*' }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { type: type }, callback);
  });
};

Utils.Messages._sendRuntimeMessage = function _sendRuntimeMessage(type, callback) {
  chrome.runtime.sendMessage({ type: type }, callback);
};

Utils.Messages.send = function send(type, callback) {
  if (chrome.tabs) {
    Utils.Messages._sendTabsMessage(type, callback);
  } else {
    Utils.Messages._sendRuntimeMessage(type, callback);
  }
};

Utils.Messages.addListener = function addListener(type, callback) {
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === type) {
      return sendResponse(callback.call());
    }
  });
};

Utils.Oauth.launch = function launch(options, callback) {
  chrome.identity.launchWebAuthFlow(options, callback);
};

Utils.Analytics.setTracker = function setTracker(tracker) {
  Utils.Analytics.tracker = tracker;
};

Utils.Analytics.sendView = function sendView(view) {
  chrome.runtime.sendMessage({ type: 'sendView', view: view });
};

Utils.Analytics.sendEvent = function sendEvent(name, value) {
  chrome.runtime.sendMessage({ type: 'sendEvent', name: name, value: value });
};

Utils.Analytics.addListener = function addListener(type, callback) {
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type == type) {
      callback.call(this, request);
    }
  });
};

module.exports = Utils;