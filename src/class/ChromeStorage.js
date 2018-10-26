/**
 * @typedef {Object} ChromeStorageGet
 * @property {Object} data
 * @property {string} data.access_token
 * @property {Boolean} data.auto_sync
 * @property {Object} options
 * @property {Boolean} options.disableScrobbling
 * @property {Boolean} options.allowGoogleAnalytics
 * @property {Boolean} options.allowRollbar
 * @property {Boolean} options.showNotifications
 */

class ChromeStorage {
  // Returns false if window is not content_script, which sometimes fails to call chrome.storage.
  // In this case, send a message so that the background script can handle chrome.storage calls.
  isAvailable() {
    return !!chrome.tabs;
  }

  set(value) {
    return new Promise(resolve => {
      if (this.isAvailable()) {
        chrome.storage.local.set(value, resolve);
      } else {
        chrome.runtime.sendMessage({type: `setStorageValue`, value}, resolve);
      }
    });
  }

  /**
   * @param key
   * @returns {Promise<ChromeStorageGet>}
   */
  get(key) {
    return new Promise(resolve => {
      if (this.isAvailable()) {
        chrome.storage.local.get(key, resolve);
      } else {
        chrome.runtime.sendMessage({type: `getStorageValue`, key}, resolve);
      }
    });
  }

  remove(key) {
    return new Promise(resolve => {
      if (this.isAvailable()) {
        chrome.storage.local.remove(key, resolve);
      } else {
        chrome.runtime.sendMessage({type: `removeStorageValue`, key}, resolve);
      }
    });
  }

  clear() {
    return new Promise(resolve => {
      if (this.isAvailable()) {
        chrome.storage.local.clear(resolve);
      } else {
        chrome.runtime.sendMessage({type: `clearStorage`}, resolve);
      }
    });
  }
}

const chromeStorage = new ChromeStorage();
export default chromeStorage;