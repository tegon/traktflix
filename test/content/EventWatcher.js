import sinon from 'sinon';
import EventWatcher from '../../src/class/content/EventWatcher';
import NetflixTestUtils from '../../test-helpers/NetflixTestHelper';

const onPlay = sinon.spy();
const onStop = sinon.spy();
const events = new EventWatcher({onPlay, onStop});

events.startListeners();

describe(`EventWatcher`, () => {
  beforeEach(() => {
    document.body.innerHTML = ``;
    onPlay.resetHistory();
    onStop.resetHistory();
  });

  it(`onStop() and onPlay() are called when the url changes from a show to another`, () => {
    NetflixTestUtils.renderPlayer(`show`);
    events.onUrlChange(`/watch/1`, `/watch/2`);
    expect(onPlay.callCount).toBe(1);
    expect(onStop.callCount).toBe(1);
  });

  it(`onStop() is called when the url changes from a show to a regular page`, () => {
    NetflixTestUtils.renderPlayer(`show`);
    events.onUrlChange(`/watch/1`, `/browse`);
    expect(onStop.callCount).toBe(1);
  });

  it(`onPlay() is called when the url change from a regular page to a show`, () => {
    NetflixTestUtils.renderPlayer(`show`);
    events.onUrlChange(`/browse`, `/watch/1`);
    expect(onPlay.callCount).toBe(1);
  });
});

events.stopListeners();
