import Request from '../Request';
import Settings from '../../settings';
import ChromeStorage from "../ChromeStorage";

export default class Scrobble {
  constructor(options) {
    if (options.type === `show`) {
      this.item = {episode: options.response};
    } else {
      const movie = options.response.movie || {};
      movie.type = `movie`;
      this.item = {movie};
    }

    this.onProgressChange();
    this.url = `${Settings.apiUri}/scrobble`;
    this.success = options.success;
    this.error = options.error;
    this.startProgressTimeout();
  }

  startProgressTimeout() {
    this.progressChangeInterval = setTimeout(() => {
      this.onProgressChange();
      clearTimeout(this.progressChangeInterval);
      this.startProgressTimeout();
    }, 1000);
  }

  stopProgressTimeout() {
    clearInterval(this.progressChangeInterval);
  }

  onProgressChange() {
    this.webScrubber();
  }

  webScrubber() {
    const scrubber = document.querySelector(`.scrubber-bar .current-progress`);
    if (!this.basePercentage || !this.baseTime) {
      if (scrubber) {
        this.basePercentage = 100 - parseFloat(scrubber.style.width);
      }
      this.baseTime = this.getRemainingTime();
    }
    if (!scrubber) {
      return;
    }
    const currentPercentage = 100 - parseFloat(scrubber.style.width);
    if (currentPercentage !== this.basePercentage) {
      this.basePercentage = currentPercentage;
      this.baseTime = this.getRemainingTime();
    }
    const newProgress = 100 - ((this.basePercentage * this.getRemainingTime()) / this.baseTime);
    if (newProgress > 0) {
      this.progress = newProgress;
    }
  }

  getRemainingTime() {
    const timeLabel = document.querySelector(`time`);
    if (timeLabel) {
      return parseInt(timeLabel.textContent.replace(`:`, ``).replace(`:`, ``));
    }
  }

  _sendScrobble(options) {
    let resolve;
    const secondPromise = new Promise(_resolve => resolve = _resolve);
    const params = this.item;
    params.progress = this.progress;
    // noinspection JSIgnoredPromiseFromCall
    return [Request.send({
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
    }), secondPromise];
  }

  async getItemInfo(path, success) {
    if (!this.item) {
      return;
    }
    const title = (this.item.episode && `${this.item.episode.show.title} - ${this.item.episode.title}`) || (this.item.movie && this.item.movie.title);
    if (!title) {
      return;
    }
    const data = await ChromeStorage.get(`options`);
    if (data.options && data.options.showNotifications) {
      if (success) {
        let message = ``;
        switch (path) {
          case `/start`:
            message = chrome.i18n.getMessage(`scrobbleStarted`);
            break;
          case `/pause`:
            message = chrome.i18n.getMessage(`scrobblePaused`);
            break;
          case `/stop`:
            message = chrome.i18n.getMessage(`scrobbleStopped`);
            break;
        }
        this.showNotification(`traktflix: ${title}`, message);
      } else {
        this.showErrorNotification(`${chrome.i18n.getMessage(`couldNotScrobble`)} ${title}`);
      }
    }
  }

  start() {
    return this._sendScrobble({path: `/start`});
  }

  pause() {
    return this._sendScrobble({path: `/pause`});
  }

  stop() {
    this.stopProgressTimeout();
    return this._sendScrobble({path: `/stop`});
  }

  showNotification(title, message) {
    chrome.runtime.sendMessage({type: `showNotification`, message, title});
  }

  showErrorNotification(message) {
    chrome.runtime.sendMessage({type: `showErrorNotification`, message});
  }
}