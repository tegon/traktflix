class Analytics {
  constructor() {
    this.tracker = undefined;
  }

  setTracker(tracker) {
    this.tracker = tracker;
  }

  sendAppView(view) {
    if (this.tracker !== undefined) {
      this.tracker.sendAppView(view);
    }
  }

  sendEvent(name, value) {
    if (this.tracker !== undefined) {
      this.tracker.sendEvent(name, value);
    }
  }
}

const analytics = new Analytics();
export default analytics;