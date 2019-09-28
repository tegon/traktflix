import Settings from '../../settings';
import BrowserStorage from "../BrowserStorage";
import Request from '../Request';
import NetflixApiUtils from '../NetflixApiUtils';

export default class Scrobble {
  constructor(options) {
    if (options.type === `show`) {
      this.item = {episode: options.response};
    } else {
      const movie = options.response.movie || {};
      movie.type = `movie`;
      this.item = {movie};
    }

    this.url = `${Settings.apiUri}/scrobble`;
    this.success = options.success;
    this.error = options.error;
    this.progress = 0;
    this.progressListener = null;

    this.startProgressListener();
  }

  showNotification(title, message) {
    browser.runtime.sendMessage({type: `showNotification`, message, title});
  }

  showErrorNotification(message) {
    browser.runtime.sendMessage({type: `showErrorNotification`, message});
  }

  async getItemInfo(path, success) {
    if (this.item) {
      const title = (this.item.episode && `${this.item.episode.show.title} - ${this.item.episode.title}`) || (this.item.movie && this.item.movie.title);
      if (title) {
        const storage = await BrowserStorage.get(`options`);
        if (storage.options && storage.options.showNotifications) {
          if (success) {
            let message = ``;
            switch (path) {
              case `/start`:
                message = browser.i18n.getMessage(`scrobbleStarted`);
                break;
              case `/pause`:
                message = browser.i18n.getMessage(`scrobblePaused`);
                break;
              case `/stop`:
                message = browser.i18n.getMessage(`scrobbleStopped`);
                break;
            }
            this.showNotification(`traktflix: ${title}`, message);
          } else {
            this.showErrorNotification(`${browser.i18n.getMessage(`couldNotScrobble`)} ${title}`);
          }
        }
      }
    }
  }

  _sendScrobble(options) {
    return new Promise(resolve => {
      const params = this.item;
      params.progress = this.progress;
      // noinspection JSIgnoredPromiseFromCall
      Request.send({
        method: `POST`,
        url: `${this.url}${options.path}`,
        params,
        success: async () => {
          await this.getItemInfo(options.path, true);
          this.success();
          resolve();
        },
        error: async () => {
          await this.getItemInfo(options.path);
          this.error();
          resolve();
        }
      });
    });
  }

  async checkForChanges() {
    const session = await NetflixApiUtils.getSession();

    if (session) {
      this.progress = Math.round((session.currentTime / session.duration) * 10000) / 100;
    } else {
      const scrubber = document.querySelector(`.scrubber-bar .current-progress`);

      if (scrubber) {
        this.progress = parseFloat(scrubber.style.width);
      }
    }

    this.progressListener = window.setTimeout(this.checkForChanges.bind(this), 1000);
  }

  startProgressListener() {
    this.checkForChanges();
  }

  stopProgressListener() {
    window.clearTimeout(this.progressListener);

    this.progressListener = null;
  }

  async start() {
    await this._sendScrobble({path: `/start`});
  }

  async pause() {
    await this._sendScrobble({path: `/pause`});
  }

  async stop() {
    await this._sendScrobble({path: `/stop`});
    this.stopProgressListener();
  }
}