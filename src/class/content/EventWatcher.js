export default class EventWatcher {
  constructor(options) {
    this.document = document;
    this.onPlay = options.onPlay;
    this.onStop = options.onStop;
    this.url = this.getLocation();
  }

  // For testing purposes
  getLocation() {
    return location.href;
  }

  onUrlChange(oldUrl, newUrl) {
    if (/watch/.test(oldUrl) && /watch/.test(newUrl)) {
      this.onStop();
      this.onPlay();
    } else if (/watch/.test(oldUrl) && !/watch/.test(newUrl)) {
      this.onStop();
    } else if (!/watch/.test(oldUrl) && /watch/.test(newUrl)) {
      this.onPlay();
    }
  }

  onBeforeUnload() {
    this.onStop();
    this.stopListeners();
  }

  addStopListener() {
    window.onbeforeunload = window.onunload = this.onBeforeUnload.bind(this);
  }

  addUrlChangeListener() {
    this.urlChangeInterval = setTimeout(() => {
      if (this.url !== this.getLocation()) {
        this.onUrlChange(this.url, this.getLocation());
        this.url = this.getLocation();
      }
      clearTimeout(this.urlChangeInterval);
      this.addUrlChangeListener();
    }, 500);
  }

  startListeners() {
    this.addStopListener();
    this.addUrlChangeListener();
  }

  removeStopListener() {
    window.onpopstate = null;
    window.onbeforeunload = null;
  }

  removeUrlChangeListener() {
    clearInterval(this.urlChangeInterval);
  }

  stopListeners() {
    this.removeStopListener();
    this.removeUrlChangeListener();
  }
}