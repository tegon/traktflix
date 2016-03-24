var WatchEvents = require('../../app/scripts/src/content/watch-events.js');
var onPlay = sinon.spy();
var onStop = sinon.spy();
var events = new WatchEvents({ onPlay: onPlay, onStop: onStop });
events.startListeners();

describe('WatchEvents', function() {
  beforeEach(function() {
    document.body.innerHTML = '';
    onPlay.reset();
    onStop.reset();
  });

  it('onStop and onPlay are called when url change from a show to another', function() {
    renderPlayer('show');
    events.onUrlChange('/watch/1', '/watch/2');
    expect(onStop.callCount).toBe(1);
    expect(onPlay.callCount).toBe(1);
  });

  it('onStop is called when url change from a show to a regular page', function() {
    renderPlayer('show');
    events.onUrlChange('/watch/1', '/browse');
    expect(onStop.callCount).toBe(1);
  });

  it('onPlay is called when url change from a regular page to a show', function() {
    renderPlayer('show');
    events.onUrlChange('/browse', '/watch/1');
    expect(onPlay.callCount).toBe(1);
  });
});

events.stopListeners();
