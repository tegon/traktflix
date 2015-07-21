'use strict';

function Analytics() {}

Analytics.tracker = undefined;

Analytics.setTracker = function setTracker(tracker) {
  Analytics.tracker = tracker;
};

Analytics.sendAppView = function sendAppView(view) {
  if (Analytics.tracker !== undefined) {
    Analytics.tracker.sendAppView(view);
  }
};

Analytics.sendEvent = function sendEvent(name, value) {
  if (Analytics.tracker !== undefined) {
    Analytics.tracker.sendEvent(name, value);
  }
};

module.exports = Analytics;