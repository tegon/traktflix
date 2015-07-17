'use strict';

var Utils = require('./utils.js');
var Settings = require('./settings.js');
var service = analytics.getService('traktflix');
var tracker = service.getTracker(Settings.analyticsId);
Utils.Analytics.setTracker(tracker);

function setInactiveIcon() {
  chrome.browserAction.setIcon({
    path: {
      19: 'images/traktflix-icon-19.png',
      38: 'images/traktflix-icon-38.png'
    }
  });
}

function setActiveIcon() {
  chrome.browserAction.setIcon({
    path: {
      19: 'images/traktflix-icon-selected-19.png',
      38: 'images/traktflix-icon-selected-38.png'
    }
  });
}

Utils.Messages.addListener('setActiveIcon', function(){
  setActiveIcon();
});

Utils.Messages.addListener('setInactiveIcon', function(){
  setInactiveIcon();
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