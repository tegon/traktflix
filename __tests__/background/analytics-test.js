jest.dontMock('../../app/scripts/src/background/analytics');

var Analytics = require('../../app/scripts/src/background/analytics');

describe('Analytics', function() {
  it('sets the tracker', function() {
    var tracker = {
      sendAppView: jest.genMockFunction(),
      sendEvent: jest.genMockFunction()
    };
    Analytics.setTracker(tracker);
    expect(Analytics.tracker).toBe(tracker);
  });

  it('sends app view', function() {
    Analytics.sendAppView('Foo');
    expect(Analytics.tracker.sendAppView.mock.calls.length).toBe(1);
    expect(Analytics.tracker.sendAppView.mock.calls[0]).toEqual(['Foo']);
  });

  it('sends event', function() {
    Analytics.sendEvent('Foozin', 'Bar');
    expect(Analytics.tracker.sendEvent.mock.calls.length).toBe(1);
    expect(Analytics.tracker.sendEvent.mock.calls[0]).toEqual(['Foozin', 'Bar']);
  });
});