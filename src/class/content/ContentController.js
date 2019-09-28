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

    if (this.getLocation().match(/watch/)) {
      ItemParser.start().then(this.storeItem.bind(this));
    }
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

  onSearchSuccess(response) {
    this.scrobble = new Scrobble({
      response,
      type: this.item.type,
      success: this.onScrobbleSuccess.bind(this),
      error: this.onScrobbleError.bind(this)
    });
    this.setActiveIcon();
    // noinspection JSIgnoredPromiseFromCall
    this.scrobble.start();
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

  onSearchError(status, response, options) {
    console.log(`traktflix: Search error`, status, response, options, this.item.title);
    // noinspection JSIgnoredPromiseFromCall
    this.reportError(`Search`, status, response, options);
  }

  storeItem(item) {
    this.item = item;
    if (this.item !== null) {
      const search = new Search({item: this.item});
      search.find({
        success: this.onSearchSuccess.bind(this),
        error: this.onSearchError.bind(this)
      });
    } else {
      this.scrobble = undefined;
    }
  }

  onPlay() {
    if (this.item === null && this.scrobble === undefined) {
      ItemParser.start().then(this.storeItem.bind(this));
    } else {
      this.setActiveIcon();
      // noinspection JSIgnoredPromiseFromCall
      this.scrobble.start();
    }
  }

  onPause() {
    if (typeof this.scrobble !== `undefined`) {
      this.setInactiveIcon();
      // noinspection JSIgnoredPromiseFromCall
      this.scrobble.pause();
    }
  }

  onStop() {
    if (typeof this.scrobble !== `undefined`) {
      this.setInactiveIcon();
      // noinspection JSIgnoredPromiseFromCall
      this.scrobble.stop();
    }
    this.storeItem(null);
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