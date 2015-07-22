var Scrobble = require('../../app/scripts/src/content/scrobble');
var Settings = require('../../app/scripts/src/settings.js');
var scrubber = sinon.stub().returns(10.1);
var success = sinon.spy();
var error = sinon.spy();
var scrobbleShow = new Scrobble({
  type: 'show',
  response: { foo: 'bar' },
  scrubber: scrubber,
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
    expect(scrobbleShow.scrubber).toBe(scrubber);
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
});