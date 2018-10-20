import ChromeStorage from '../ChromeStorage';

class OptionsStore {
  constructor() {
    this.options = [{
      id: `allowGoogleAnalytics`,
      name: `Allow Google Analytics to collect information about your usage of the extension.`,
      description: `With this option enabled, information about your usage of the extension will be collected and sent to us, so that we can gather data and improve the extension. This information includes: when you logged in / logged out, when a search for the item you are watching was successful / unsuccessful (along with the title of the item), when a scrobble for the item you are watching was successful / unsuccessful, and your IP address for geographical statistics. This data is not shared with any other service.`,
      value: false
    }, {
      id: `allowRollbar`,
      name: `Allow Rollbar to collect information about bugs.`,
      description: `With this option enabled, whenever a bug occurs, information about it will be collected and sent to us, so that we can fix it faster and improve the extension. This information includes: when the bug happened, the traceback of the bug, the name and version  of your browser, and the name of your OS. This data is not shared with any other service.`,
      value: false
    }, {
      id: `showNotifications`,
      name: `Show browser notifications.`,
      description: `With this option enabled, you will receive browser notifications whenever you start/stop scrobbling something.`,
      value: false
    }];
  }

  async getValues() {
    const data = await ChromeStorage.get(`options`);
    if (data.options) {
      for (const option of this.options) {
        option.value = data.options[option.id];
      }
    }
    return this.options;
  }
}

const optionsStore = new OptionsStore();
export default optionsStore;