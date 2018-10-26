import sinon from 'sinon';
import chrome from 'sinon-chrome/extensions';
import ChromeStorage from '../src/class/ChromeStorage';

const key = `foo`;
const value = {
  foo: `bar`
};

describe(`ChromeStorage`, () => {
  before(() => {
    global.chrome = chrome;
  });

  afterEach(() => {
    chrome.flush();
  });

  after(() => {
    chrome.flush();
    delete global.chrome;
  });

  describe(`when chrome.tabs is defined`, () => {
    it(`.isAvailable() returns true`, () => {
      expect(ChromeStorage.isAvailable()).to.be.true;
    });

    it(`set() calls chrome.storage.local.set()`, async () => {
      chrome.storage.local.set.withArgs(value).yields();
      const result = await ChromeStorage.set(value);
      expect(chrome.storage.local.set.callCount).to.equal(1);
      expect(result).to.be.undefined;
    });

    it(`get() calls chrome.storage.local.get()`, async () => {
      chrome.storage.local.get.withArgs(key).yields(value);
      const result = await ChromeStorage.get(key);
      expect(chrome.storage.local.get.callCount).to.equal(1);
      expect(result).to.equal(value);
    });

    it(`remove() calls chrome.storage.local.remove()`, async () => {
      chrome.storage.local.remove.withArgs(key).yields();
      const result = await ChromeStorage.remove(key);
      expect(chrome.storage.local.remove.callCount).to.equal(1);
      expect(result).to.be.undefined;
    });

    it(`clear() calls chrome.storage.local.clear()`, async () => {
      chrome.storage.local.clear.yields();
      const result = await ChromeStorage.clear();
      expect(chrome.storage.local.clear.callCount).to.equal(1);
      expect(result).to.be.undefined;
    });
  });

  describe(`when chrome.tabs is not defined`, () => {
    before(() => {
      sinon.stub(ChromeStorage, `isAvailable`).returns(false);
    });

    after(() => {
      ChromeStorage.isAvailable.restore();
    });

    it(`isAvailable() returns false`, () => {
      expect(ChromeStorage.isAvailable()).to.be.false;
    });

    it(`set() calls chrome.runtime.sendMessage()`, async () => {
      chrome.runtime.sendMessage.withArgs({type: `setStorageValue`, value}).yields();
      const result = await ChromeStorage.set(value);
      expect(chrome.runtime.sendMessage.callCount).to.equal(1);
      expect(result).to.be.undefined;
    });

    it(`get() calls chrome.runtime.sendMessage()`, async () => {
      chrome.runtime.sendMessage.withArgs({key, type: `getStorageValue`}).yields(value);
      const result = await ChromeStorage.get(key);
      expect(chrome.runtime.sendMessage.callCount).to.equal(1);
      expect(result).to.equal(value);
    });

    it(`remove() calls chrome.runtime.sendMessage()`, async () => {
      chrome.runtime.sendMessage.withArgs({key, type: `removeStorageValue`}).yields();
      const result = await ChromeStorage.remove(key);
      expect(chrome.runtime.sendMessage.callCount).to.equal(1);
      expect(result).to.be.undefined;
    });

    it(`clear() calls chrome.runtime.sendMessage()`, async () => {
      chrome.runtime.sendMessage.withArgs({type: `clearStorage`}).yields();
      const result = await ChromeStorage.clear();
      expect(chrome.runtime.sendMessage.callCount).to.equal(1);
      expect(result).to.be.undefined;
    });
  });
});