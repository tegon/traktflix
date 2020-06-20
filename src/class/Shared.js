class Shared {
  constructor() {
    this.backgroundPage = false;
  }
  
  setBackgroundPage(backgroundPage) {
    this.backgroundPage = backgroundPage;
  }

  isBackgroundPage() {
    return !!this.backgroundPage;
  }

  async openTab(url) {
    const tabs = await browser.tabs.query({ active: true, currentWindow: true });
    if (tabs.length === 0) {
      return null;
    }
    if (browser.cookies) {
      return browser.tabs.create({
        cookieStoreId: tabs[0].cookieStoreId,
        index: tabs[0].index + 1,
        url,
      });
    }
    return browser.tabs.create({
      index: tabs[0].index + 1,
      url,
    });
  }
}

const shared = new Shared();
export default shared;