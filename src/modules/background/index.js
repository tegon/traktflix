import '../vendor/google-analytics-bundle';
import Settings from '../../settings';
import Analytics from '../../class/Analytics';
import BrowserStorage from '../../class/BrowserStorage';
import Oauth from '../../class/Oauth';
import Rollbar from '../../class/Rollbar';
import Request from '../../class/Request';
import Shared from '../../class/Shared';

Shared.setBackgroundPage(true);

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
      const storage = await BrowserStorage.get(`options`);
      const permitted = !!(storage.options && storage.options.allowGoogleAnalytics && (await browser.permissions.contains({ origins: [`*://google-analytics.com/*`] })));
      config.setTrackingPermitted(permitted);
      if (permitted) {
        const tracker = service.getTracker(Settings.analyticsId);
        Analytics.setTracker(tracker);
      }
    });
// noinspection JSIgnoredPromiseFromCall
Rollbar.init();

const defs = {};

if (chrome && chrome.declarativeContent) {
  chrome.runtime.onInstalled.addListener(() => {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {hostSuffix: `netflix.com`}
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
  });
} else {
  browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (typeof changeInfo.status === `undefined`) {
      return;
    }
    if (changeInfo.status === `complete` && tab.url.match(/^https?:\/\/(www\.)?netflix\.com/)) {
      browser.pageAction.show(tabId);
    } else {
      browser.pageAction.hide(tabId);
    }
  });
}

browser.runtime.onMessage.addListener((request, sender) => {
  return new Promise(async (resolve, reject) => {
    switch (request.type) {
      case `getApiDefs`:
        // noinspection JSIgnoredPromiseFromCall
        resolve(defs);
        return;
      case `setApiDefs`:
        // noinspection JSIgnoredPromiseFromCall
        defs.authUrl = request.authUrl;
        defs.buildIdentifier = request.buildIdentifier;
        break;
      case `authorize`:
        // noinspection JSIgnoredPromiseFromCall
        Oauth.authorize(null, request.url);
        break;
      case `setActiveIcon`:
        if (browser.pageAction.setIcon) {
          browser.pageAction.setIcon({
            tabId: sender.tab.id,
            path: browser.runtime.getURL(`images/traktflix-icon-selected-38.png`)
          });
        }
        break;
      case `setInactiveIcon`:
        if (browser.pageAction.setIcon) {
          browser.pageAction.setIcon({
            tabId: sender.tab.id,
            path: browser.runtime.getURL(`images/traktflix-icon-38.png`)
          });
        }
        break;
      case `launchAuthorize`:
        // noinspection JSIgnoredPromiseFromCall
        Oauth.authorize(resolve);
        return;
      case `sendAppView`:
        Analytics.sendAppView(request.view);
        break;
      case `sendEvent`:
        Analytics.sendEvent(request.name, request.value);
        break;
      case `syncStorage`:
        BrowserStorage.sync().then(resolve);
        return;
      case `removeStorageValue`:
        BrowserStorage.remove(request.key, request.sync).then(resolve);
        return;
      case `getStorageValue`:
        BrowserStorage.get(request.key).then(resolve);
        return;
      case `setStorageValue`:
        BrowserStorage.set(request.value, request.sync).then(resolve);
        return;
      case `clearStorage`:
        BrowserStorage.clear(request.sync).then(resolve);
        return;
      case `showNotification`:
        if (await browser.permissions.contains({ permissions: ['notifications'] })) {
          browser.notifications.create({
            type: `basic`,
            iconUrl: `images/traktflix-icon-128.png`,
            title: request.title,
            message: request.message
          });
        }
        break;
      case `showErrorNotification`:
        if (await browser.permissions.contains({ permissions: ['notifications'] })) {
          browser.notifications.create({
            type: `basic`,
            iconUrl: `images/traktflix-icon-128.png`,
            title: browser.i18n.getMessage(`errorNotification`),
            message: request.message
          });
        }
        break;
      case `request`: {
        const options = JSON.parse(request.options);
        try {
          const response = await Request.sendAndWait(options);
          resolve(response);
        } catch (error) {
          reject(error);
        }
        return;
      }
    }
    resolve();
  });
});