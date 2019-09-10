import browser from 'sinon-chrome';
import sinon from 'sinon';
import BrowserStorage from '../src/class/BrowserStorage';

const key = `foo`;
const value = {
  foo: `bar`
};

describe(`BrowserStorage`, () => {
  before(() => {
    window.browser = browser;
  });

  afterEach(() => {
    browser.flush();
  });

  after(() => {
    browser.flush();
    delete window.browser;
  });

  describe(`when browser.tabs is defined`, () => {
    it(`isAvailable() returns true`, () => {
      expect(BrowserStorage.isAvailable()).to.be.true;
    });

    it(`sync() calls browser.storage.sync.get() and set() when isSyncAvailable() is true`, async () => {
      sinon.stub(BrowserStorage, `isSyncAvailable`).returns(true);
      browser.storage.sync.get.withArgs(null).resolves({
        data: `test1`,
        options: `test2`
      });
      const browserSet = sinon.stub(BrowserStorage, `set`);
      browserSet.withArgs({ data: `test1` }).resolves();
      browserSet.withArgs({ options: `test2` }).resolves();
      await BrowserStorage.sync();
      expect(browser.storage.sync.get.callCount).to.equal(1);
      expect(BrowserStorage.set.callCount).to.equal(2);
      BrowserStorage.isSyncAvailable.restore();      
      BrowserStorage.set.restore();
    });

    it(`sync() does nothing when isSyncAvailable() is false`, async () => {
      sinon.stub(BrowserStorage, `isSyncAvailable`).returns(false);
      sinon.spy(BrowserStorage, `set`);
      await BrowserStorage.sync();
      expect(browser.storage.sync.get.callCount).to.equal(0);
      expect(BrowserStorage.set.callCount).to.equal(0);
      BrowserStorage.isSyncAvailable.restore();      
      BrowserStorage.set.restore();
    });

    it(`set() calls browser.storage.local.set()`, async () => {
      browser.storage.local.set.withArgs(value).resolves();
      const result = await BrowserStorage.set(value);
      expect(browser.storage.sync.set.callCount).to.equal(0);
      expect(browser.storage.local.set.callCount).to.equal(1);
      expect(result).to.be.undefined;
    });

    it(`set() calls browser.storage.local.set() and browser.storage.sync.set()`, async () => {
      browser.storage.local.set.withArgs(value).resolves();
      const result = await BrowserStorage.set(value, true);
      expect(browser.storage.sync.set.callCount).to.equal(1);
      expect(browser.storage.local.set.callCount).to.equal(1);
      expect(result).to.be.undefined;
    });

    it(`get() calls browser.storage.local.get()`, async () => {
      browser.storage.local.get.withArgs(key).resolves(value);
      const result = await BrowserStorage.get(key);
      expect(browser.storage.local.get.callCount).to.equal(1);
      expect(result).to.equal(value);
    });

    it(`remove() calls browser.storage.local.remove()`, async () => {
      browser.storage.local.remove.withArgs(key).resolves();
      const result = await BrowserStorage.remove(key);
      expect(browser.storage.sync.remove.callCount).to.equal(0);
      expect(browser.storage.local.remove.callCount).to.equal(1);
      expect(result).to.be.undefined;
    });

    it(`remove() calls browser.storage.local.remove() and browser.storage.sync.remove()`, async () => {
      browser.storage.local.remove.withArgs(key).resolves();
      const result = await BrowserStorage.remove(key, true);
      expect(browser.storage.sync.remove.callCount).to.equal(1);
      expect(browser.storage.local.remove.callCount).to.equal(1);
      expect(result).to.be.undefined;
    });

    it(`clear() calls browser.storage.local.clear()`, async () => {
      browser.storage.local.clear.resolves();
      const result = await BrowserStorage.clear();
      expect(browser.storage.sync.clear.callCount).to.equal(0);
      expect(browser.storage.local.clear.callCount).to.equal(1);
      expect(result).to.be.undefined;
    });

    it(`clear() calls browser.storage.local.clear() and browser.storage.sync.clear()`, async () => {
      browser.storage.local.clear.resolves();
      const result = await BrowserStorage.clear(true);
      expect(browser.storage.sync.clear.callCount).to.equal(1);
      expect(browser.storage.local.clear.callCount).to.equal(1);
      expect(result).to.be.undefined;
    });
  });

  describe(`when browser.tabs is not defined`, () => {
    beforeEach(() => {
      sinon.stub(BrowserStorage, `isAvailable`).returns(false);
    });

    afterEach(() => {
      BrowserStorage.isAvailable.restore();
    });

    it(`isAvailable() returns false`, () => {
      expect(BrowserStorage.isAvailable()).to.be.false;
    });

    it(`sync() calls browser.runtime.sendMessage()`, async () => {
      browser.runtime.sendMessage.withArgs({type: `syncStorage`}).resolves();
      await BrowserStorage.sync();
      expect(browser.runtime.sendMessage.callCount).to.equal(1);
    });

    it(`set() calls browser.runtime.sendMessage()`, async () => {
      const sync = false;
      browser.runtime.sendMessage.withArgs({type: `setStorageValue`, value, sync}).resolves();
      const result = await BrowserStorage.set(value, sync);
      expect(browser.runtime.sendMessage.callCount).to.equal(1);
      expect(result).to.be.undefined;
    });

    it(`get() calls browser.runtime.sendMessage()`, async () => {
      browser.runtime.sendMessage.withArgs({key, type: `getStorageValue`}).resolves(value);
      const result = await BrowserStorage.get(key);
      expect(browser.runtime.sendMessage.callCount).to.equal(1);
      expect(result).to.equal(value);
    });

    it(`remove() calls browser.runtime.sendMessage()`, async () => {
      const sync = false;
      browser.runtime.sendMessage.withArgs({key, type: `removeStorageValue`, sync}).resolves();
      const result = await BrowserStorage.remove(key, sync);
      expect(browser.runtime.sendMessage.callCount).to.equal(1);
      expect(result).to.be.undefined;
    });

    it(`clear() calls browser.runtime.sendMessage()`, async () => {
      const sync = false;
      browser.runtime.sendMessage.withArgs({type: `clearStorage`, sync}).resolves();
      const result = await BrowserStorage.clear(sync);
      expect(browser.runtime.sendMessage.callCount).to.equal(1);
      expect(result).to.be.undefined;
    });
  });
});