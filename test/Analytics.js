import sinon from 'sinon';
import Analytics from '../src/class/Analytics';

const view = `FooBar`;
const name = `Foo`;
const value = `Bar`;

describe(`Analytics`, () => {
  it(`does not throw error when tracker is not set`, () => {
    expect(Analytics.sendAppView(view)).toBe(undefined);
    expect(Analytics.sendEvent(name, value)).toBe(undefined);
  });

  it(`setTracker() sets the tracker`, () => {
    const tracker = {
      sendAppView: sinon.stub(),
      sendEvent: sinon.stub()
    };
    Analytics.setTracker(tracker);
    expect(Analytics.tracker).toBe(tracker);
  });

  it(`sendAppView() sends app view`, () => {
    Analytics.sendAppView(view);
    expect(Analytics.tracker.sendAppView.callCount).toBe(1);
    expect(Analytics.tracker.sendAppView.getCall(0).args).toEqual([view]);
  });

  it(`sendEvent() sends event`, () => {
    Analytics.sendEvent(name, value);
    expect(Analytics.tracker.sendEvent.callCount).toBe(1);
    expect(Analytics.tracker.sendEvent.getCall(0).args).toEqual([name, value]);
  });
});