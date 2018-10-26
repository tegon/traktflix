import sinon from 'sinon';
import Analytics from '../src/class/Analytics';

const view = `FooBar`;
const name = `Foo`;
const value = `Bar`;

describe(`Analytics`, () => {
  it(`does not throw error when tracker is not set`, () => {
    expect(Analytics.sendAppView(view)).to.be.undefined;
    expect(Analytics.sendEvent(name, value)).to.be.undefined;
  });

  it(`setTracker() sets the tracker`, () => {
    const tracker = {
      sendAppView: sinon.stub(),
      sendEvent: sinon.stub()
    };
    Analytics.setTracker(tracker);
    expect(Analytics.tracker).to.equal(tracker);
  });

  it(`sendAppView() sends app view`, () => {
    Analytics.sendAppView(view);
    expect(Analytics.tracker.sendAppView.callCount).to.equal(1);
    expect(Analytics.tracker.sendAppView.args[0]).to.deep.equal([view]);
  });

  it(`sendEvent() sends event`, () => {
    Analytics.sendEvent(name, value);
    expect(Analytics.tracker.sendEvent.callCount).to.equal(1);
    expect(Analytics.tracker.sendEvent.args[0]).to.deep.equal([name, value]);
  });
});