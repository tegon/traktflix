'use strict';

function ChromeStorage() {};

// Returns if window is not content_script, which sometimes fails to call chrome.storage
// If it is, send a message so that background script handle chrome.storage calls
ChromeStorage.isAvailable = function() {
  return !!chrome.tabs;
};

ChromeStorage.get = function(key, callback) {
  if (ChromeStorage.isAvailable()) {
    chrome.storage.local.get(key, callback);
  } else {
    chrome.runtime.sendMessage({ type: 'getStorageValue', key: key }, callback);
  }
};

ChromeStorage.set = function(value, callback) {
  if (ChromeStorage.isAvailable()) {
    chrome.storage.local.set(value, callback);
  } else {
    chrome.runtime.sendMessage({ type: 'setStorageValue', value: value }, callback);
  }
};

ChromeStorage.clear = function(callback) {
  if (ChromeStorage.isAvailable()) {
    chrome.storage.local.clear(callback);
  } else {
    chrome.runtime.sendMessage({ type: 'clearStorage' }, callback);
  }
};

module.exports = ChromeStorage;