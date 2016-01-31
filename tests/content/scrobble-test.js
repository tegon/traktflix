var Scrobble = require('../../app/scripts/src/content/scrobble');
var Settings = require('../../app/scripts/src/settings.js');
var success = sinon.spy();
var error = sinon.spy();
var scrobbleShow = new Scrobble({
  type: 'show',
  response: { foo: 'bar' },
  success: success,
  error: error
});
var scrobbleMovie = new Scrobble({
  type: 'movie',
  response: {
    movie: { foo: 'bar' }
  }
});

describe('Scrobble', function() {
  beforeEach(function() {
    document.body.innerHTML = '';

    this.xhr = sinon.useFakeXMLHttpRequest();
    var requests = this.requests = [];
    this.xhr.onCreate = function (xhr) {
      requests.push(xhr);
    };
  });

  afterEach(function() {
    this.xhr.restore();
    error.reset();
    success.reset();
  });

  it('sets properties in constructor', function() {
    expect(scrobbleShow.item).toEqual({ episode: { foo: 'bar' } });
    expect(scrobbleShow.success).toBe(success);
    expect(scrobbleShow.error).toBe(error);
    expect(scrobbleShow.url).toBe(Settings.apiUri + '/scrobble');
  });

  it('when type is show, item is wrapped inside episode', function() {
    expect(scrobbleShow.item).toEqual({ episode: { foo: 'bar' } });
  });

  it('when type is movie, item is wrapped inside movie', function() {
    expect(scrobbleMovie.item).toEqual({ movie: { foo: 'bar' } });
  });

  it('start scrobble calls success', function() {
    scrobbleShow.start();
    expect(this.requests.length).toBe(1);
    this.requests[0].respond(200, { 'Content-Type': 'application/json' }, '');
    expect(success.callCount).toBe(1);
  });

  it('pause scrobble calls success', function() {
    scrobbleShow.pause();
    expect(this.requests.length).toBe(1);
    this.requests[0].respond(200, { 'Content-Type': 'application/json' }, '');
    expect(success.callCount).toBe(1);
  });

  it('stop scrobble calls success', function() {
    scrobbleShow.stop();
    expect(this.requests.length).toBe(1);
    this.requests[0].respond(200, { 'Content-Type': 'application/json' }, '');
    expect(success.callCount).toBe(1);
  });

  it('start scrobble calls error', function() {
    scrobbleShow.start();
    expect(this.requests.length).toBe(1);
    this.requests[0].respond(500, { 'Content-Type': 'application/json' }, '');
    expect(error.callCount).toBe(1);
  });

  it('pause scrobble calls error', function() {
    scrobbleShow.pause();
    expect(this.requests.length).toBe(1);
    this.requests[0].respond(500, { 'Content-Type': 'application/json' }, '');
    expect(error.callCount).toBe(1);
  });

  it('stop scrobble calls error', function() {
    scrobbleShow.stop();
    expect(this.requests.length).toBe(1);
    this.requests[0].respond(500, { 'Content-Type': 'application/json' }, '');
    expect(error.callCount).toBe(1);
  });

  it('webScrubber sets the progress', function() {
    window.renderPlayer('show');
    scrobbleShow.webScrubber();
    expect(scrobbleShow.progress.toFixed(2)).toBe('1.57');
  });

  it('castScrubber sets the progress', function() {
    window.renderCastPlayer();
    scrobbleMovie.castScrubber();
    expect(scrobbleMovie.progress.toFixed(2)).toBe('2.91');
  })
});
