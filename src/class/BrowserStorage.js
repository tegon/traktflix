/**
 * @typedef {Object} BrowserStorageGet
 * @property {Object} data
 * @property {string} data.access_token
 * @property {Boolean} data.auto_sync
 * @property {Object} options
 * @property {Boolean} options.disableScrobbling
 * @property {Boolean} options.allowGoogleAnalytics
 * @property {Boolean} options.allowRollbar
 * @property {Boolean} options.showNotifications
 * @property {Boolean} options.sendReceiveCorrections
 */

class BrowserStorage {
  constructor() {
    this.sync();
  }

  // Returns false if window is not content_script, which sometimes fails to call browser.storage.
  // In this case, send a message so that the background script can handle browser.storage calls.
  isAvailable() {
    return !!browser.tabs;
  }

  isSyncAvailable() {
    return !!browser.storage.sync;
  }

  async sync() {   
    if (this.isAvailable()) {
      if (this.isSyncAvailable()) {
        const storage = await browser.storage.sync.get(null);
        for (const key in storage) {
          if (storage.hasOwnProperty(key) && storage[key]) {
            await this.set({[key]: storage[key]});
          }
        }
      }
    } else {
      await browser.runtime.sendMessage({type: `syncStorage`});
    }
  }

  set(value, sync) {
    return new Promise(resolve => {
      if (this.isAvailable()) {
        if (sync && this.isSyncAvailable()) {
          browser.storage.sync.set(value);
        }
        browser.storage.local.set(value).then(resolve);
      } else {
        browser.runtime.sendMessage({type: `setStorageValue`, value, sync}).then(resolve);
      }
    });
  }

  /**
   * @param key
   * @returns {Promise<BrowserStorageGet>}
   */
  get(key) {
    return new Promise(resolve => {
      if (this.isAvailable()) {
        browser.storage.local.get(key).then(resolve);
      } else {
        browser.runtime.sendMessage({type: `getStorageValue`, key}).then(resolve);
      }
    });
  }

  remove(key, sync) {
    return new Promise(resolve => {
      if (this.isAvailable()) {
        if (sync && this.isSyncAvailable()) {
          browser.storage.sync.remove(key);
        }
        browser.storage.local.remove(key).then(resolve);
      } else {
        browser.runtime.sendMessage({type: `removeStorageValue`, key, sync}).then(resolve);
      }
    });
  }

  clear(sync) {
    return new Promise(resolve => {
      if (this.isAvailable()) {
        if (sync && this.isSyncAvailable()) {
          browser.storage.sync.clear();
        }
        browser.storage.local.clear().then(resolve);
      } else {
        browser.runtime.sendMessage({type: `clearStorage`, sync}).then(resolve);
      }
    });
  }
}

const browserStorage = new BrowserStorage();
export default browserStorage;