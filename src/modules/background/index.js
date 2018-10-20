import Analytics from '../../class/Analytics';
import ChromeStorage from '../../class/ChromeStorage';
import Oauth from '../../class/Oauth';
import Rollbar from '../../class/Rollbar';
import Settings from '../../settings';
import '../vendor/google-analytics-bundle';

/* global analytics */
/**
 * Google Analytics Object
 * @type {Object} analytics
 * @property {Function} getService
 * @property {Function} service.getTracker
 */
const service = analytics.getService(`traktflix`);
/**
 * @property {Function} addCallback
 */
service.getConfig()
  .addCallback(
  /**
   * @param {Object} config
   * @property {Function} setTrackingPermitted
   */
  async config => {
    const data = await ChromeStorage.get(`options`);
    const permitted = !!(data.options && data.options.allowGoogleAnalytics);
    config.setTrackingPermitted(permitted);
    if (permitted) {
      const tracker = service.getTracker(Settings.analyticsId);
      Analytics.setTracker(tracker);
    }
  });
Rollbar.init();

chrome.runtime.onInstalled.addListener(() => {
  if (chrome.declarativeContent) {
    chrome.declarativeContent.onPageChanged.removeRules(undefined,  () => {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {hostSuffix: `netflix.com`}
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
  } else {
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      if (typeof changeInfo.status === `undefined`) {
        return;
      }
      if (changeInfo.status === `complete` && tab.url.match(/^https?:\/\/(www\.)?netflix\.com/)) {
        chrome.pageAction.show(tabId);
      } else {
        chrome.pageAction.hide(tabId);
      }
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) =>{
  switch(request.type) {
    case `authorize`:
      // noinspection JSIgnoredPromiseFromCall
      Oauth.authorize(null, request.url);
      return true;
    case `setActiveIcon`:
      chrome.pageAction.setIcon({
        tabId: sender.tab.id,
        path: chrome.runtime.getManifest().page_action.selected_icon
      });
      break;
    case `setInactiveIcon`:
      chrome.pageAction.setIcon({
        tabId: sender.tab.id,
        path: chrome.runtime.getManifest().page_action.default_icon
      });
      break;
    case `launchAuthorize`:
      // noinspection JSIgnoredPromiseFromCall
      Oauth.authorize(sendResponse);
      return true;
    case `sendAppView`:
      Analytics.sendAppView(request.view);
      break;
    case `sendEvent`:
      Analytics.sendEvent(request.name, request.value);
      break;
    case `removeStorageValue`:
      ChromeStorage.remove(request.key).then(sendResponse);
      return true;
    case `getStorageValue`:
      ChromeStorage.get(request.key).then(sendResponse);
      return true;
    case `setStorageValue`:
      ChromeStorage.set(request.value).then(sendResponse);
      return true;
    case `clearStorage`:
      ChromeStorage.clear().then(sendResponse);
      return true;
    case `showNotification`:
      chrome.notifications.create({
        type: `basic`,
        iconUrl: `images/traktflix-icon-128.png`,
        title: request.title,
        message: request.message
      });
      break;
    case `showErrorNotification`:
      chrome.notifications.create({
        type: `basic`,
        iconUrl: `images/traktflix-icon-128.png`,
        title: `An error has occurred :(`,
        message: request.message
      });
      break;
  }
});