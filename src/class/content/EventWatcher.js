export default class EventWatcher {
  constructor(options) {
    this.document = document;
    this.onPlay = options.onPlay;
    this.onStop = options.onStop;
    this.url = location.href;
  }

  addStopListener() {
    window.onbeforeunload = window.onunload = () => {
      this.onStop();
      this.stopListeners();
    };
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

  addUrlChangeListener() {
    const _this = this;
    this.urlChangeInterval = setTimeout(function () {
      if (this.url !== location.href) {
        _this.onUrlChange(this.url, location.href);
        this.url = location.href;
      }
      clearTimeout(this.urlChangeInterval);
      _this.addUrlChangeListener();
    }.bind(this), 500);
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