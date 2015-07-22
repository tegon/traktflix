var Scrobble = require('../../app/scripts/src/content/scrobble');
var Settings = require('../../app/scripts/src/settings.js');

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
  });

  it('sets properties in constructor', function() {
    var scrubber = sinon.stub().returns(10.1);
    var success = sinon.stub();
    var error = sinon.stub();
    var scrobble = new Scrobble({
      type: 'show',
      response: { foo: 'bar' },
      scrubber: scrubber,
      success: success,
      error: error
    });
    expect(scrobble.item).toEqual({ episode: { foo: 'bar' } });
    expect(scrobble.scrubber).toBe(scrubber);
    expect(scrobble.success).toBe(success);
    expect(scrobble.error).toBe(error);
    expect(scrobble.url).toBe(Settings.apiUri + '/scrobble');
  });

  it('when type is show, item is wrapped inside episode', function() {
    var scrobble = new Scrobble({ type: 'show', response: { foo: 'bar' } });
    expect(scrobble.item).toEqual({ episode: { foo: 'bar' } });
  });

  it('when type is movie, item is wrapped inside movie', function() {
    var scrobble = new Scrobble({
      type: 'movie',
      response: {
        movie: { foo: 'bar' }
      }
    });
    expect(scrobble.item).toEqual({ movie: { foo: 'bar' } });
  });

  it('start scrobble calls success', function() {
    var scrubber = sinon.stub().returns(10.1);
    var success = sinon.spy();
    var error = sinon.spy();
    var scrobble = new Scrobble({
      type: 'show',
      response: { foo: 'bar' },
      scrubber: scrubber,
      success: success,
      error: error
    });
    scrobble.start();
    expect(this.requests.length).toBe(1);
    this.requests[0].respond(200, { 'Content-Type': 'application/json' }, '');
    expect(success.callCount).toBe(1);
  });
});