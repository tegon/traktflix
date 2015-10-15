var ChromeStorage = require('../app/scripts/src/chrome-storage.js');
var callback = sinon.spy();

describe('ChromeStorage', function() {
  beforeEach(function() {
    ChromeStorage();
  });

  afterEach(function() {
    callback.reset();
    chrome.storage.local.get.reset();
    chrome.storage.local.set.reset();
    chrome.storage.local.clear.reset();
    chrome.runtime.sendMessage.reset();
  });

  describe('when chrome.tabs is defined', function() {
    it('isAvailable return true', function() {
      expect(ChromeStorage.isAvailable()).toBe(true);
    });

    it('get calls chrome.storage.local.get', function() {
      ChromeStorage.get('foo', callback);
      expect(callback.callCount).toBe(1);
      expect(chrome.storage.local.get.callCount).toBe(1);
      expect(chrome.storage.local.get.getCall(0).args).toEqual(['foo', callback]);
    });

    it('set calls chrome.storage.local.set', function() {
      ChromeStorage.set({ name: 'foo' }, callback);
      expect(callback.callCount).toBe(1);
      expect(chrome.storage.local.set.callCount).toBe(1);
      expect(chrome.storage.local.set.getCall(0).args).toEqual([{ name: 'foo' }, callback]);
    });

    it('clear calls chrome.storage.local.clear', function() {
      ChromeStorage.clear(callback);
      expect(callback.callCount).toBe(1);
      expect(chrome.storage.local.clear.callCount).toBe(1);
      expect(chrome.storage.local.clear.getCall(0).args).toEqual([callback]);
    });
  });

  describe('when chrome.tabs is not defined', function() {
    beforeEach(function() {
      sinon.stub(ChromeStorage, 'isAvailable', function() {
        return false;
      });
    });

    afterEach(function() {
      ChromeStorage.isAvailable.restore();
    });

    it('isAvailable return false', function() {
      expect(ChromeStorage.isAvailable()).toBe(false);
    });

    it('get calls chrome.runtime.sendMessage', function() {
      ChromeStorage.get('foo', callback);
      expect(callback.callCount).toBe(1);
      expect(chrome.runtime.sendMessage.callCount).toBe(1);
      expect(chrome.runtime.sendMessage.getCall(0).args).toEqual([
        { type: 'getStorageValue', key: 'foo' }, callback
      ]);
    });

    it('set calls chrome.runtime.sendMessage', function() {
      ChromeStorage.set({ name: 'foo' }, callback);
      expect(callback.callCount).toBe(1);
      expect(chrome.runtime.sendMessage.callCount).toBe(1);
      expect(chrome.runtime.sendMessage.getCall(0).args).toEqual([
        { type: 'setStorageValue', value: { name: 'foo' } }, callback
      ]);
    });

    it('clear calls chrome.runtime.sendMessage', function() {
      ChromeStorage.clear(callback);
      expect(callback.callCount).toBe(1);
      expect(chrome.runtime.sendMessage.callCount).toBe(1);
      expect(chrome.runtime.sendMessage.getCall(0).args).toEqual([
        { type: 'clearStorage' }, callback
      ]);
    });
  });
});