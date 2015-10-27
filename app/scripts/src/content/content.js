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
sync.needToSync(function(needToSync) {
  if (needToSync) {
    sync.start(function(success) {
      console.log('sync completed', success);
    });
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type == 'getCurrentItem') {
    sendResponse(controller.getCurrentItem());
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type == 'startSync') {
    sync.start(sendResponse);
    return true;
  }
});