import ChromeStorage from '../ChromeStorage';
import ItemParser from '../ItemParser';
import Rollbar from '../Rollbar';
import Search from '../Search';
import Scrobble from '../Scrobble';

export default class ContentController {
  constructor() {
    this.item = null;
    /**
   * @type {Scrobble}
   */
    this.scrobble = undefined;

    if (location.href.match(/watch/)) {
      ItemParser.start(this.storeItem.bind(this));
    }
  }

  onSearchSuccess(response) {
    this.sendAnalyticsEvent({name: `onSearchSuccess`, value: this.item.title});
    this.scrobble = new Scrobble({
      response,
      type: this.item.type,
      success: this.onScrobbleSuccess.bind(this),
      error: this.onScrobbleError.bind(this)
    });
    this.setActiveIcon();
    this.scrobble.start();
    this.sendAnalyticsEvent({name: `Scrobble`, value: `start`});
  }

  onSearchError(status, response, options) {
    this.sendAnalyticsEvent({name: `onSearchError`, value: `${status} - ${this.item.title}`});
    console.log(`traktflix: Search error`, status, response, options, this.item.title);
    // noinspection JSIgnoredPromiseFromCall
    this.reportError(`Search`, status, response, options);
  }

  onScrobbleSuccess() {
    this.sendAnalyticsEvent({name: `Scrobble`, value: `onSuccess`});
  }

  onScrobbleError(status, response, options) {
    this.sendAnalyticsEvent({name: `Scrobble`, value: `onError`});
    console.log(`traktflix: Scrobble error`, status, response, options);
    // noinspection JSIgnoredPromiseFromCall
    this.reportError(`Scrobble`, status, response, options);
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

  async onPlay() {
    if (this.item === null && this.scrobble === undefined) {
      ItemParser.start(this.storeItem.bind(this));
    } else {
      this.setActiveIcon();
      this.scrobble.start();
      this.sendAnalyticsEvent({name: `Scrobble`, value: `start`})
    }
  }

  onPause() {
    if (typeof this.scrobble !== `undefined`) {
      this.setInactiveIcon();
      this.scrobble.pause();
      this.sendAnalyticsEvent({name: `Scrobble`, value: `pause`});
    }
  }

  onStop() {
    if (typeof this.scrobble !== `undefined`) {
      this.setInactiveIcon();
      this.scrobble.stop();
      this.sendAnalyticsEvent({name: `Scrobble`, value: `stop`});
    }
    this.storeItem(null);
  }

  setInactiveIcon() {
    chrome.runtime.sendMessage({type: `setInactiveIcon`});
  }

  setActiveIcon() {
    chrome.runtime.sendMessage({type: `setActiveIcon`});
  }

  sendAnalyticsEvent(options) {
    chrome.runtime.sendMessage({
      type: `sendEvent`, name: options.name, value: options.value
    });
  }

  showErrorNotification(message) {
    chrome.runtime.sendMessage({type: `showErrorNotification`, message: message});
  }

  async reportError(type, status, response, options) {
    const _this = this;
    if (status === 404) {
      this.showErrorNotification(`Oh snap! We couldn't find what you're watching in Trakt.tv. Please leave a report with the title of the item.`);
    } else if (status === 0) {
      // status 0 usually means an response without CORS
      // It could be a 401, so we check if the user has an access_token saved
      const data = await ChromeStorage.get(null);
      if (data.data && data.data.access_token) {
        _this.showErrorNotification(`We couldn't talk to Trakt.tv servers. We're trying to fix it, please try again later`);
        Rollbar.init().then(() => Rollbar.warning(`traktflix: ${type} error`, {status: status, response: response, options: options}));
      } else {
        _this.showErrorNotification(`Looks like you're not logged in. Please open the extension and login with your Trakt.tv account`);
      }
    } else {
      this.showErrorNotification(`We couldn't talk to Trakt.tv servers. We're trying to fix it, please try again later`);
      Rollbar.init().then(() => Rollbar.warning(`traktflix: ${type} error`, {status: status, response: response, options: options}));
    }
  }

  getCurrentItem() {
    if (this.item && this.scrobble && this.item.type === `show`) {
      return {item: this.scrobble.item.episode};
    }
    if (this.item && this.scrobble && this.item.type === `movie`) {
      return {item: this.scrobble.item.movie};
    }
  }
}