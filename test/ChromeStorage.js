import chrome from 'sinon-chrome/extensions';
import sinon from 'sinon';
import ChromeStorage from '../src/class/ChromeStorage';

const callback = sinon.spy();
const key = `foo`;
const value = {
  foo: `bar`
};

describe(`ChromeStorage`, () => {
  beforeAll(() => {
    global.chrome = chrome;
  });

  afterEach(() => {
    chrome.flush();
    callback.resetHistory();
  });

  describe(`when chrome.tabs is defined`, () => {
    it(`.isAvailable() returns true`, () => {
      expect(ChromeStorage.isAvailable()).toBe(true);
    });

    it(`set() calls chrome.storage.local.set()`, async done => {
      chrome.storage.local.set.withArgs(value).yields();
      const promise = ChromeStorage.set(value);
      promise.then(callback);
      await Promise.all([promise]);
      expect(callback.callCount).toBe(1);
      expect(callback.getCall(0).args).toEqual([undefined]);
      expect(chrome.storage.local.set.callCount).toBe(1);
      expect(chrome.storage.local.set.getCall(0).args.length).toBe(2);
      expect(chrome.storage.local.set.getCall(0).args[0]).toEqual(value);
      done();
    });

    it(`get() calls chrome.storage.local.get()`, async done => {
      chrome.storage.local.get.withArgs(key).yields(value);
      const promise = ChromeStorage.get(key);
      promise.then(callback);
      await Promise.all([promise]);
      expect(callback.callCount).toBe(1);
      expect(callback.getCall(0).args).toEqual([value]);
      expect(chrome.storage.local.get.callCount).toBe(1);
      expect(chrome.storage.local.get.getCall(0).args.length).toBe(2);
      expect(chrome.storage.local.get.getCall(0).args[0]).toBe(key);
      done();
    });

    it(`remove() calls chrome.storage.local.remove()`, async done => {
      chrome.storage.local.remove.withArgs(key).yields();
      const promise = ChromeStorage.remove(key);
      promise.then(callback);
      await Promise.all([promise]);
      expect(callback.callCount).toBe(1);
      expect(callback.getCall(0).args).toEqual([undefined]);
      expect(chrome.storage.local.remove.callCount).toBe(1);
      expect(chrome.storage.local.remove.getCall(0).args.length).toBe(2);
      expect(chrome.storage.local.remove.getCall(0).args[0]).toBe(key);
      done();
    });

    it(`clear() calls chrome.storage.local.clear()`, async done => {
      chrome.storage.local.clear.yields();
      const promise = ChromeStorage.clear();
      promise.then(callback);
      await Promise.all([promise]);
      expect(callback.callCount).toBe(1);
      expect(callback.getCall(0).args).toEqual([undefined]);
      expect(chrome.storage.local.clear.callCount).toBe(1);
      expect(chrome.storage.local.clear.getCall(0).args.length).toBe(1);
      done();
    });
  });

  describe(`when chrome.tabs is not defined`, () => {
    beforeEach(() => {
      sinon.stub(ChromeStorage, `isAvailable`).callsFake(() => false);
    });

    afterEach(() => {
      ChromeStorage.isAvailable.restore();
    });

    it(`isAvailable() returns false`, () => {
      expect(ChromeStorage.isAvailable()).toBe(false);
    });

    it(`set() calls chrome.runtime.sendMessage()`, async done => {
      chrome.runtime.sendMessage.withArgs({type: `setStorageValue`, value}).yields();
      const promise = ChromeStorage.set(value);
      promise.then(callback);
      await Promise.all([promise]);
      expect(callback.callCount).toBe(1);
      expect(callback.getCall(0).args).toEqual([undefined]);
      expect(chrome.runtime.sendMessage.callCount).toBe(1);
      expect(chrome.runtime.sendMessage.getCall(0).args[0]).toEqual({type: `setStorageValue`, value});
      done();
    });

    it(`get() calls chrome.runtime.sendMessage()`, async done => {
      chrome.runtime.sendMessage.withArgs({key, type: `getStorageValue`}).yields(value);
      const promise = ChromeStorage.get(key);
      promise.then(callback);
      await Promise.all([promise]);
      expect(callback.callCount).toBe(1);
      expect(callback.getCall(0).args).toEqual([value]);
      expect(chrome.runtime.sendMessage.callCount).toBe(1);
      expect(chrome.runtime.sendMessage.getCall(0).args[0]).toEqual({key, type: `getStorageValue`});
      done();
    });

    it(`remove() calls chrome.runtime.sendMessage()`, async done => {
      chrome.runtime.sendMessage.withArgs({key, type: `removeStorageValue`}).yields();
      const promise = ChromeStorage.remove(key);
      promise.then(callback);
      await Promise.all([promise]);
      expect(callback.callCount).toBe(1);
      expect(callback.getCall(0).args).toEqual([undefined]);
      expect(chrome.runtime.sendMessage.callCount).toBe(1);
      expect(chrome.runtime.sendMessage.getCall(0).args[0]).toEqual({key, type: `removeStorageValue`});
      done();
    });

    it(`clear() calls chrome.runtime.sendMessage()`, async done => {
      chrome.runtime.sendMessage.withArgs({type: `clearStorage`}).yields();
      const promise = ChromeStorage.clear();
      promise.then(callback);
      await Promise.all([promise]);
      expect(callback.callCount).toBe(1);
      expect(callback.getCall(0).args).toEqual([undefined]);
      expect(chrome.runtime.sendMessage.callCount).toBe(1);
      expect(chrome.runtime.sendMessage.getCall(0).args[0]).toEqual({type: `clearStorage`});
      done();
    });
  });

  afterAll(() => {
    chrome.flush();
    delete global.chrome;
  });
});