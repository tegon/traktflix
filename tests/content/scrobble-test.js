var Scrobble = require('../../app/scripts/src/content/scrobble');
var Settings = require('../../app/scripts/src/settings.js');
var scrubber = sinon.stub().returns(10.1);
var success = sinon.spy();
var error = sinon.spy();
var scrobble;

function createScrobble() {
  scrobble = new Scrobble({
    type: 'show',
    response: { foo: 'bar' },
    scrubber: scrubber,
    success: success,
    error: error
  });
}

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
    createScrobble();
    expect(scrobble.item).toEqual({ episode: { foo: 'bar' } });
    expect(scrobble.scrubber).toBe(scrubber);
    expect(scrobble.success).toBe(success);
    expect(scrobble.error).toBe(error);
    expect(scrobble.url).toBe(Settings.apiUri + '/scrobble');
  });

  it('when type is show, item is wrapped inside episode', function() {
    scrobble = new Scrobble({ type: 'show', response: { foo: 'bar' } });
    expect(scrobble.item).toEqual({ episode: { foo: 'bar' } });
  });

  it('when type is movie, item is wrapped inside movie', function() {
    scrobble = new Scrobble({
      type: 'movie',
      response: {
        movie: { foo: 'bar' }
      }
    });
    expect(scrobble.item).toEqual({ movie: { foo: 'bar' } });
  });

  it('start scrobble calls success', function() {
    createScrobble();
    scrobble.start();
    expect(this.requests.length).toBe(1);
    this.requests[0].respond(200, { 'Content-Type': 'application/json' }, '');
    expect(success.callCount).toBe(1);
  });

  it('pause scrobble calls success', function() {
    createScrobble();
    scrobble.pause();
    expect(this.requests.length).toBe(1);
    this.requests[0].respond(200, { 'Content-Type': 'application/json' }, '');
    expect(success.callCount).toBe(1);
  });

  it('stop scrobble calls success', function() {
    createScrobble();
    scrobble.stop();
    expect(this.requests.length).toBe(1);
    this.requests[0].respond(200, { 'Content-Type': 'application/json' }, '');
    expect(success.callCount).toBe(1);
  });

  it('start scrobble calls error', function() {
    createScrobble();
    scrobble.start();
    expect(this.requests.length).toBe(1);
    this.requests[0].respond(500, { 'Content-Type': 'application/json' }, '');
    expect(error.callCount).toBe(1);
  });

  it('pause scrobble calls error', function() {
    createScrobble();
    scrobble.pause();
    expect(this.requests.length).toBe(1);
    this.requests[0].respond(500, { 'Content-Type': 'application/json' }, '');
    expect(error.callCount).toBe(1);
  });

  it('stop scrobble calls error', function() {
    createScrobble();
    scrobble.stop();
    expect(this.requests.length).toBe(1);
    this.requests[0].respond(500, { 'Content-Type': 'application/json' }, '');
    expect(error.callCount).toBe(1);
  });
});