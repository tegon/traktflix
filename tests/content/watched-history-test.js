var WatchedHistory = require('../../app/scripts/src/content/watched-history.js');
var ViewingActivity = require('../../app/scripts/src/content/viewing-activity.js');
var Item = require('../../app/scripts/src/content/item.js');
var Settings = require('../../app/scripts/src/settings.js');
var moment = require('moment');
var success = sinon.spy();
var error = sinon.spy();
var callback = sinon.spy();
var history = new WatchedHistory();
var rocky = new Item({ title: 'Rocky', type: 'movie', id: 123 });
var movieActivity = new ViewingActivity({ item: rocky, date: moment('10/13/2015', 'MM/DD/YYYY') });
var houseOfCards = new Item({ title: 'House of Cards', type: 'show', epTitle: 'Chapter 30', season: 3, id: 231 });
var episodeActivity = new ViewingActivity({ item: houseOfCards, date: moment('01/10/2015', 'MM/DD/YYYY') });
var activities = [movieActivity, episodeActivity];

describe('WatchedHistory', function() {
  beforeEach(function() {
    this.xhr = sinon.useFakeXMLHttpRequest();
    var requests = this.requests = [];
    this.xhr.onCreate = function (xhr) {
      requests.push(xhr);
    };
  });

  afterEach(function() {
    this.xhr.restore();
    success.reset();
    error.reset();
    callback.reset();
  });

  it('constructor sets the url', function() {
    expect(history.url).toBe(Settings.apiUri + '/sync/history');
  });

  it('params returns movies and episodes ids', function() {
    var movie = { 'watched_at': movieActivity.date, 'ids': { 'trakt': movieActivity.item.id } };
    var episode = { 'watched_at': episodeActivity.date, 'ids': { 'trakt': episodeActivity.item.id } };
    expect(history.params(activities)).toEqual({ movies: [movie], episodes: [episode] });
  });

  describe('includeUrl', function() {
    it('prefix is /episodes when item is a show', function() {
      expect(history.includeUrl(episodeActivity)).toBe(history.url + '/episodes/' + houseOfCards.id);
    });

    it('prefix is /movies when item is a movie', function() {
      expect(history.includeUrl(movieActivity)).toBe(history.url + '/movies/' + rocky.id);
    });
  });

  describe('send', function() {
    it('calls callback with success', function() {
      history.send(activities, callback);
      expect(this.requests.length).toBe(1);
      this.requests[0].respond(200, { 'Content-Type': 'application/json' },
        '{ "added": { "movies": 1, "episodes": 1 }, "not_found": { "movies": [], "shows": [], "seasons": [], "episodes": [] } }');
      expect(callback.callCount).toBe(1);
      expect(callback.getCall(0).args).toEqual([true]);
    });

    it('calls callback with error', function() {
      history.send(activities, callback);
      expect(this.requests.length).toBe(1);
      this.requests[0].respond(401, { 'Content-Type': 'application/json' },
        '{ "error": "invalid_grant" }');
      expect(callback.callCount).toBe(1);
      expect(callback.getCall(0).args).toEqual([false]);
    });
  });

  describe('searchItem', function() {
    it('calls success callback and sets movie id', function() {
      history.searchItem({ activity: movieActivity, success: success, error: error });
      expect(this.requests.length).toBe(1);
      this.requests[0].respond(200, { 'Content-Type': 'application/json' },
        '[{ "movie": { "title": "Rocky", "ids": { "trakt": 1234 } } }]');
      expect(success.callCount).toBe(1);
      expect(success.getCall(0).args).toEqual([movieActivity]);
      expect(movieActivity.item.id).toBe(1234);
    });

    it('calls success callback and sets episode id', function() {
      history.searchItem({ activity: episodeActivity, success: success, error: error });
      expect(this.requests.length).toBe(1);
      this.requests[0].respond(200, { 'Content-Type': 'application/json' },
        '[{ "show": { "title": "House of Cards", "ids": { "slug": "house-of-cards" } } }]');
      expect(this.requests.length).toBe(2);
      this.requests[1].respond(200, { 'Content-Type': 'application/json' },
        '[{ "season": 3, "number": 4, "title": "Chapter 30", "ids": { "trakt": 4321 } }]');
      expect(success.callCount).toBe(1);
      expect(success.getCall(0).args).toEqual([episodeActivity]);
      expect(episodeActivity.item.id).toBe(4321);
      expect(episodeActivity.item.episode).toBe(4);
    });

    it('calls error callback when request fails', function() {
      history.searchItem({ activity: movieActivity, success: success, error: error });
      expect(this.requests.length).toBe(1);
      this.requests[0].respond(400, { 'Content-Type': 'application/json' },
        '{ "errors": "Bad Request" }');
      expect(error.callCount).toBe(1);
      expect(error.getCall(0).args).toEqual([400, '{ "errors": "Bad Request" }']);
    });

    it('calls error callback when search returns nothing for movie', function() {
      history.searchItem({ activity: movieActivity, success: success, error: error });
      expect(this.requests.length).toBe(1);
      this.requests[0].respond(200, { 'Content-Type': 'application/json' }, '[]');
      expect(error.callCount).toBe(1);
      expect(error.getCall(0).args).toEqual([404, undefined]);
    });

    it('calls error callback when search returns nothing for show', function() {
      history.searchItem({ activity: episodeActivity, success: success, error: error });
      expect(this.requests.length).toBe(1);
      this.requests[0].respond(200, { 'Content-Type': 'application/json' }, '[]');
      expect(error.callCount).toBe(1);
      expect(error.getCall(0).args).toEqual([404, undefined]);
    });
  });

  describe('include', function() {
    it('calls success callback with include: true', function() {
      history.include({ activity: movieActivity, success: success, error: error });
      expect(this.requests.length).toBe(1);
      this.requests[0].respond(200, { 'Content-Type': 'application/json' },
        '[{ "movie": { "title": "Rocky", "ids": { "trakt": 1234 } } }]');
      expect(this.requests.length).toBe(2);
      this.requests[1].respond(200, { 'Content-Type': 'application/json' },
        '[{ "id": 1982346, "watched_at": "2015-10-13T09:28:53.000Z", "action": "scrobble", "type": "movie", "movie": { "title": "Rocky", "ids": { "trakt": 1234 } } }]');
      expect(success.callCount).toBe(1);
      expect(success.getCall(0).args).toEqual([true]);
    });

    it('calls success callback with include: false', function() {
      episodeActivity.item.episode = undefined;
      history.include({ activity: episodeActivity, success: success, error: error });
      expect(this.requests.length).toBe(1);
      this.requests[0].respond(200, { 'Content-Type': 'application/json' },
        '[{ "show": { "title": "House of Cards", "ids": { "slug": "house-of-cards" } } }]');
      expect(this.requests.length).toBe(2);
      this.requests[1].respond(200, { 'Content-Type': 'application/json' },
        '[{ "season": 3, "number": 4, "title": "Chapter 30", "ids": { "trakt": 4321 } }]');
      expect(this.requests.length).toBe(3);
      this.requests[2].respond(200, { 'Content-Type': 'application/json' },
        '[{ "id": 1982346, "watched_at": "2015-05-03T10:30:01.000Z", "action": "scrobble", "type": "episode", "episode": { "title": "Chapter 30", "ids": { "trakt": 4321 } } }]');
      expect(success.callCount).toBe(1);
      expect(success.getCall(0).args).toEqual([false]);
    });

    it('calls success callback with include: false when history returns nothing', function() {
      history.include({ activity: movieActivity, success: success, error: error });
      expect(this.requests.length).toBe(1);
      this.requests[0].respond(200, { 'Content-Type': 'application/json' },
        '[{ "movie": { "title": "Rocky", "ids": { "trakt": 1234 } } }]');
      expect(this.requests.length).toBe(2);
      this.requests[1].respond(200, { 'Content-Type': 'application/json' }, '[]');
      expect(success.callCount).toBe(1);
      expect(success.getCall(0).args).toEqual([false]);
    });

    it('calls error callback when search request fails', function() {
      history.include({ activity: movieActivity, success: success, error: error });
      expect(this.requests.length).toBe(1);
      this.requests[0].respond(400, { 'Content-Type': 'application/json' },
        '{ "errors": "Bad Request" }');
      expect(error.callCount).toBe(1);
      expect(error.getCall(0).args).toEqual([400, '{ "errors": "Bad Request" }']);
    });

    it('calls error callback when request fails', function() {
      episodeActivity.item.episode = undefined;
      history.include({ activity: episodeActivity, success: success, error: error });
      expect(this.requests.length).toBe(1);
      this.requests[0].respond(200, { 'Content-Type': 'application/json' },
        '[{ "show": { "title": "House of Cards", "ids": { "slug": "house-of-cards" } } }]');
      expect(this.requests.length).toBe(2);
      this.requests[1].respond(200, { 'Content-Type': 'application/json' },
        '[{ "season": 3, "number": 4, "title": "Chapter 30", "ids": { "trakt": 4321 } }]');
      expect(this.requests.length).toBe(3);
      this.requests[2].respond(400, { 'Content-Type': 'application/json' },
        '{ "errors": "Bad Request" }');
      expect(error.callCount).toBe(1);
      expect(error.getCall(0).args).toEqual([400, '{ "errors": "Bad Request" }']);
    });
  });
});
