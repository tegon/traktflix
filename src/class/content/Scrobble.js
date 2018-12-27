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

  getRemainingTime() {
    const timeLabel = document.querySelector(`time`);
    if (timeLabel) {
      return parseInt(timeLabel.textContent.replace(`:`, ``).replace(`:`, ``));
    }
  }

  webScrubber() {
    const scrubber = document.querySelector(`.scrubber-bar .current-progress`);
    if (!this.basePercentage || !this.baseTime) {
      if (scrubber) {
        this.basePercentage = 100 - parseFloat(scrubber.style.width);
      }
      this.baseTime = this.getRemainingTime();
    }
    if (scrubber) {
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
  }

  onProgressChange() {
    this.webScrubber();
  }

  startProgressTimeout() {
    this.progressChangeInterval = setTimeout(() => {
      this.onProgressChange();
      clearTimeout(this.progressChangeInterval);
      this.startProgressTimeout();
    }, 1000);
  }

  showNotification(title, message) {
    chrome.runtime.sendMessage({type: `showNotification`, message, title});
  }

  showErrorNotification(message) {
    chrome.runtime.sendMessage({type: `showErrorNotification`, message});
  }

  async getItemInfo(path, success) {
    if (this.item) {
      const title = (this.item.episode && `${this.item.episode.show.title} - ${this.item.episode.title}`) || (this.item.movie && this.item.movie.title);
      if (title) {
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
    }
  }

  stopProgressTimeout() {
    clearInterval(this.progressChangeInterval);
  }

  _sendScrobble(options) {
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
      },
      error: async () => {
        await this.getItemInfo(options.path);
        this.error();
      }
    });
  }

  start() {
    this._sendScrobble({path: `/start`});
  }

  pause() {
    this._sendScrobble({path: `/pause`});
  }

  stop() {
    this._sendScrobble({path: `/stop`});
    this.stopProgressTimeout();
  }
}