var WatchEvents = require('../../app/scripts/src/content/watch-events.js');
var onPlay = sinon.spy();
var onPause = sinon.spy();
var onStop = sinon.spy();
var progressBarClasses = [
  'player-scrubber-target', 'player-scrubber-progress-completed',
  'player-scrubber-progress-buffered', 'player-scrubber-progress'
];
var events = new WatchEvents({ onPlay: onPlay, onPause: onPause, onStop: onStop });
events.startListeners();
var KEY_SPACE = 32;
var KEY_ENTER = 13;
var KEY_LEFT_ARROW = 37;
var KEY_RIGHT_ARROW = 39;

function randomClass(classes) {
  return classes[Math.floor(Math.random() * classes.length)];
}

describe('WatchEvents', function() {
  beforeEach(function() {
    document.body.innerHTML = '';
    onPlay.reset();
    onPause.reset();
    onStop.reset();
  });

  it('isPlaying return false when video is paused', function() {
    renderPlayer('movie');
    expect(events.isPlaying()).toBe(false);
  });

  it('isPlaying return true when video is playing', function() {
    renderPlayer('show');
    expect(events.isPlaying()).toBe(true);
  });

  it('onPlay is called when play button is clicked', function() {
    renderPlayer('movie');
    var play = document.querySelector('.player-play-pause');
    events.onClick({ target: play });
    expect(onPlay.callCount).toBe(1);
  });

  it('onPause is called when pause button is clicked', function() {
    renderPlayer('show');
    var pause = document.querySelector('.player-play-pause');
    events.onClick({ target: pause });
    expect(onPause.callCount).toBe(1);
  });

  it('onPause is called when progress bar is clicked', function() {
    renderPlayer('movie');
    var progress = document.querySelector('.' + randomClass(progressBarClasses));
    events.onClick({ target: progress });
    expect(onPause.callCount).toBe(1);
  });

  it('onPlay is called when progress bar is clicked', function() {
    renderPlayer('show');
    var progress = document.querySelector('.' + randomClass(progressBarClasses));
    events.onClick({ target: progress });
    expect(onPlay.callCount).toBe(1);
  });

  it('onStop and onPlay are called when playLink is clicked', function() {
    renderPlayer('show');
    var playLink = document.createElement('a');
    playLink.classList.add('playLink');
    events.onClick({ target: playLink });
    expect(onStop.callCount).toBe(1);
    expect(onPlay.callCount).toBe(1);
  });

  it('onPlay is called when space bar is pressed', function() {
    renderPlayer('show');
    events.onKeyUp({ which: KEY_SPACE });
    expect(onPlay.callCount).toBe(1);
  });

  it('onPause is called when space bar is pressed', function() {
    renderPlayer('movie');
    events.onKeyUp({ which: KEY_SPACE });
    expect(onPause.callCount).toBe(1);
  });

  it('onPlay is called when enter is pressed', function() {
    renderPlayer('show');
    events.onKeyUp({ which: KEY_ENTER });
    expect(onPlay.callCount).toBe(1);
  });

  it('onPause is called when enter is pressed', function() {
    renderPlayer('movie');
    events.onKeyUp({ which: KEY_ENTER });
    expect(onPause.callCount).toBe(1);
  });

  it('onPause is called when right arrow is pressed', function() {
    renderPlayer('movie');
    events.onKeyUp({ which: KEY_RIGHT_ARROW });
    expect(onPause.callCount).toBe(1);
  });

  it('onPause is called when left arrow is pressed', function() {
    renderPlayer('show');
    events.onKeyUp({ which: KEY_LEFT_ARROW });
    expect(onPause.callCount).toBe(1);
  });

  it('onStop and onPlay are called when path change from a movie to another', function() {
    renderPlayer('show');
    events.onPathChange('/watch/1', '/watch/2');
    expect(onStop.callCount).toBe(1);
    expect(onPlay.callCount).toBe(1);
  });
});

events.stopListeners();