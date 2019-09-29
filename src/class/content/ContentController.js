import BrowserStorage from '../BrowserStorage';
import ItemParser from '../ItemParser';
import Rollbar from '../Rollbar';
import Search from '../Search';
import Scrobble from './Scrobble';

export default class ContentController {
  constructor() {
    this.item = null;
    /**
     * @type {Scrobble}
     */
    this.scrobble = undefined;
  }

  // For testing purposes.
  getLocation() {
    return location.href;
  }

  setActiveIcon() {
    browser.runtime.sendMessage({type: `setActiveIcon`});
  }

  setInactiveIcon() {
    browser.runtime.sendMessage({type: `setInactiveIcon`});
  }

  onScrobbleSuccess() {}

  onScrobbleError(status, response, options) {
    console.log(`traktflix: Scrobble error`, status, response, options);
    // noinspection JSIgnoredPromiseFromCall
    this.reportError(`Scrobble`, status, response, options);
  }

  showErrorNotification(message) {
    browser.runtime.sendMessage({type: `showErrorNotification`, message: message});
  }

  async reportError(type, status, response, options) {
    const _this = this;
    if (status === 404) {
      this.showErrorNotification(browser.i18n.getMessage(`errorNotificationNotFound`));
    } else if (status === 0) {
      // status 0 usually means an response without CORS
      // It could be a 401, so we check if the user has an access_token saved
      const storage = await BrowserStorage.get(`data`);
      if (storage.data && storage.data.access_token) {
        _this.showErrorNotification(browser.i18n.getMessage(`errorNotificationServers`));
        await Rollbar.init();
        Rollbar.warning(`traktflix: ${type} error`, {
          status: status,
          response: response,
          options: options
        });
      } else {
        _this.showErrorNotification(browser.i18n.getMessage(`errorNotificationLogin`));
      }
    } else {
      this.showErrorNotification(browser.i18n.getMessage(`errorNotificationServers`));
      await Rollbar.init();
      Rollbar.warning(`traktflix: ${type} error`, {
        status: status,
        response: response,
        options: options
      });
    }
  }

  onSearchSuccess(response) {
    this.scrobble = new Scrobble({
      response,
      type: this.item.type,
      success: this.onScrobbleSuccess.bind(this),
      error: this.onScrobbleError.bind(this)
    });
  }

  onSearchError(status, response, options) {
    console.log(`traktflix: Search error`, status, response, options, this.item.title);
    // noinspection JSIgnoredPromiseFromCall
    this.reportError(`Search`, status, response, options);
  }

  storeItem(item) {
    return new Promise((resolve, reject) => {
      this.item = item;

      if (this.item !== null) {
        const search = new Search({item: this.item});

        search.find({
          success: response => {
            this.onSearchSuccess(response);

            resolve();
          },
          error: (status, response, options) => {
            this.onSearchError(status, response, options);

            reject();
          },
        });
      } else {
        this.scrobble = undefined;

        resolve();
      }
    });
  }

  async onPlay() {
    try {
      if (this.item === null && this.scrobble === undefined) {
        const item = await ItemParser.start();

        await this.storeItem(item);
      }

      this.setActiveIcon();
      // noinspection JSIgnoredPromiseFromCall
      await this.scrobble.start();
    } catch (error) {}
  }

  async onPause() {
    if (typeof this.scrobble !== `undefined`) {
      this.setInactiveIcon();
      // noinspection JSIgnoredPromiseFromCall
      await this.scrobble.pause();
    }
  }

  async onStop() {
    if (typeof this.scrobble !== `undefined`) {
      this.setInactiveIcon();
      // noinspection JSIgnoredPromiseFromCall
      await this.scrobble.stop();
    }

    await this.storeItem(null);
  }

  getCurrentItem() {
    let item = null;
    if (this.item && this.scrobble) {
      if (this.item.type === `show`) {
        item = {item: this.scrobble.item.episode};
      } else {
        item = {item: this.scrobble.item.movie};
      }
    }
    return item;
  }
}