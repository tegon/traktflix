var Analytics = require('../../app/scripts/src/background/analytics');

describe('Analytics', function() {
  it('sets the tracker', function() {
    var tracker = {
      sendAppView: sinon.stub(),
      sendEvent: sinon.stub()
    };
    Analytics.setTracker(tracker);
    expect(Analytics.tracker).toBe(tracker);
  });

  it('sends app view', function() {
    Analytics.sendAppView('Foo');
    expect(Analytics.tracker.sendAppView.callCount).toBe(1);
    expect(Analytics.tracker.sendAppView.getCall(0).args).toEqual(['Foo']);
  });

  it('sends event', function() {
    Analytics.sendEvent('Foozin', 'Bar');
    expect(Analytics.tracker.sendEvent.callCount).toBe(1);
    expect(Analytics.tracker.sendEvent.getCall(0).args).toEqual(['Foozin', 'Bar']);
  });
});