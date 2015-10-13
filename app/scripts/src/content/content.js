'use strict';

var WatchEvents = require('./watch-events.js');
var ContentController = require('./content-controller.js');
var Sync = require('./sync.js');
var controller = new ContentController();
var sync = new Sync();

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

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type == 'startSync') {
    console.log('start sync', sendResponse);
    sync.start(sendResponse);
    return true;
  }
});