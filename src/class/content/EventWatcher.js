import NetflixApiUtils from '../NetflixApiUtils';

export default class EventWatcher {
  constructor(options) {
    this.onPlay = options.onPlay;
    this.onPause = options.onPause;
    this.onStop = options.onStop;

    this.changeListener = null;
    this.paused = false;
    this.playing = false;
    this.url = '';
    this.videoId = 0;
  }

  // For testing purposes
  getLocation() {
    return window.location.href;
  }

  async onUrlChange(oldUrl, newUrl) {
    if (/watch/.test(oldUrl) && /watch/.test(newUrl)) {
      await this.onStop();
      await this.onPlay();
    } else if (!/watch/.test(oldUrl) && /watch/.test(newUrl)) {
      await this.onPlay();
    } else if (/watch/.test(oldUrl) && !/watch/.test(newUrl)) {
      await this.onStop();
    }
  }

  async checkForChanges() {
    const session = await NetflixApiUtils.getSession();

    if (typeof session !== 'undefined') {
      if (session) {
        if (session.videoId !== this.videoId) {
          this.videoId = session.videoId;

          await this.onStop();
          await this.onPlay();

          this.paused = false;
          this.playing = true;
        } else if ((session.paused !== this.paused) || (session.playing !== this.playing)) {
          if (session.paused) {
            await this.onPause();
          } else if (session.playing) {
            await this.onPlay();
          } else {
            await this.onStop();
          }

          this.paused = session.paused;
          this.playing = session.playing;
        }
      } else {
        await this.onStop();
      }
    } else if (this.url !== this.getLocation()) {
      await this.onUrlChange(this.url, this.getLocation());

      this.url = this.getLocation();
    }

    this.changeListener = window.setTimeout(this.checkForChanges.bind(this), 500);
  }

  addChangeListener() {
    this.checkForChanges();
  }

  removeChangeListener() {
    window.clearTimeout(this.changeListener);

    this.changeListener = null;
  }

  onBeforeUnload() {
    this.onStop();
    this.stopListeners();
  }

  addStopListener() {
    window.onbeforeunload = window.onunload = this.onBeforeUnload.bind(this);
  }

  removeStopListener() {
    window.onbeforeunload = window.onunload = null;
  }

  startListeners() {
    this.addChangeListener();
    this.addStopListener();
  }

  stopListeners() {
    this.removeChangeListener();
    this.removeStopListener();
  }
}