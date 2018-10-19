'use strict';

var WatchEvents = require('./watch-events.js');
var ContentController = require('./content-controller.js');
var controller = new ContentController();
var rollbar = require('../rollbar.js');

var events = new WatchEvents({
  onPlay: controller.onPlay.bind(controller),
  onPause: controller.onPause.bind(controller),
  onStop: controller.onStop.bind(controller)
});

events.startListeners();

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type == 'getCurrentItem') {
    sendResponse(controller.getCurrentItem());
  }
});

if (location.href.match(/\/Activate\?code=/)) {
  chrome.runtime.sendMessage({ type: 'authorize', url: location.href });
}