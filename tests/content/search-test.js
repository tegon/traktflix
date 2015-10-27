var Search = require('../../app/scripts/src/content/search');
var Settings = require('../../app/scripts/src/settings.js');
var success = sinon.spy();
var error = sinon.spy();
var rocky = { title: 'Rocky', type: 'movie' };
var movieSearch = new Search({ item: rocky });
var madMen = { type: 'show', season: 1, episode: 1, title: 'Mad Men' };
var narcos = { type: 'show', season: 1, title: 'Narcos', epTitle: 'The Sword of Simón Bolívar' };
var episodeSearch = new Search({ item: madMen });
var episodeSearchByTitle = new Search({ item: narcos });

describe('Search', function() {
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
  });

  it('sets properties in constructor', function() {
    expect(movieSearch.item).toBe(rocky);
    expect(movieSearch.url).toBe(Settings.apiUri + '/search');
    expect(movieSearch.showsUrl).toBe(Settings.apiUri + '/shows');
  });

  it('getUrl function', function() {
    expect(movieSearch.getUrl()).toBe(Settings.apiUri + '/search?type=' + rocky.type +
      '&query=' + rocky.title);
  });

  it('getEpisodeUrl uses episode number when item has an episode number', function() {
    expect(episodeSearch.getEpisodeUrl('mad-men')).toBe(Settings.apiUri +
      '/shows/mad-men/seasons/' + madMen.season + '/episodes/' +
      madMen.episode + '?extended=images');
  });

  it('getEpisodeUrl gets all episodes when item does not have an episode number', function() {
    expect(episodeSearchByTitle.getEpisodeUrl('narcos')).toBe(Settings.apiUri +
      '/shows/narcos/seasons/' + madMen.season + '?extended=images');
  });

  it('findItem returns first search result', function() {
    movieSearch.findItem({ success: success, error: error });
    expect(this.requests.length).toBe(1);
    this.requests[0].respond(200, { 'Content-Type': 'application/json' },
      '[{ "movie": { "title": "Rocky" } }, { "movie": { "title": "Rocky II" } }]');
    expect(success.callCount).toBe(1);
    expect(success.getCall(0).args).toEqual([{ movie: { title: 'Rocky' } }]);
  });

  it('findItem returns error callback', function() {
    movieSearch.findItem({ success: success, error: error });
    expect(this.requests.length).toBe(1);
    this.requests[0].respond(400, { 'Content-Type': 'application/json' },
      '{ "errors": "Bad Request" }');
    expect(error.callCount).toBe(1);
    expect(error.getCall(0).args).toEqual([400, '{ "errors": "Bad Request" }']);
  });

  it('findEpisode returns first search result', function() {
    episodeSearch.findEpisode({ success: success, error: error });
    expect(this.requests.length).toBe(1);
    this.requests[0].respond(200, { 'Content-Type': 'application/json' },
      '[{ "show": { "title": "Mad Men", "ids": { "slug": "mad-men" } } }]');
    expect(this.requests.length).toBe(2);
    this.requests[1].respond(200, { 'Content-Type': 'application/json' },
      '{ "title": "Ladies Room", "season": 1, "number": 2 }');
    expect(success.callCount).toBe(1);
    expect(success.getCall(0).args).toEqual([{
      title: 'Ladies Room', season: 1, number: 2
    }]);
  });

  it('findEpisode returns first search result with same title', function() {
    episodeSearchByTitle.findEpisode({ success: success, error: error });
    expect(this.requests.length).toBe(1);
    this.requests[0].respond(200, { 'Content-Type': 'application/json' },
      '[{ "show": { "title": "Narcos", "ids": { "slug": "narcos" } } }]');
    expect(this.requests.length).toBe(2);
    this.requests[1].respond(200, { 'Content-Type': 'application/json' },
      '[{ "season": 1, "number": 1, "title": "Descenso" }, { "season": 1, "number": 2, "title": "The Sword of Simón Bolívar" }]');
    expect(success.callCount).toBe(1);
    expect(success.getCall(0).args).toEqual([{
      title: 'The Sword of Simón Bolívar', season: 1, number: 2
    }]);
  });

  it('findEpisode returns error callback when an episode with same title was not found', function() {
    episodeSearchByTitle.findEpisode({ success: success, error: error });
    expect(this.requests.length).toBe(1);
    this.requests[0].respond(200, { 'Content-Type': 'application/json' },
      '[{ "show": { "title": "Narcos", "ids": { "slug": "narcos" } } }]');
    expect(this.requests.length).toBe(2);
    this.requests[1].respond(200, { 'Content-Type': 'application/json' },
      '[{ "season": 1, "number": 1, "title": "Descenso" }, { "season": 1, "number": 3, "title": "The Men of Always" }]');
    expect(error.callCount).toBe(1);
    expect(error.getCall(0).args).toEqual([404, 'Episode not found.']);
  });

  it('findEpisode returns error callback', function() {
    episodeSearch.findEpisode({ success: success, error: error });
    expect(this.requests.length).toBe(1);
    this.requests[0].respond(200, { 'Content-Type': 'application/json' },
      '[{ "show": { "title": "Mad Men", "ids": { "slug": "mad-men" } } }]');
    expect(this.requests.length).toBe(2);
    this.requests[1].respond(400, { 'Content-Type': 'application/json' },
      '{ "errors": "Bad Request" }');
    expect(error.callCount).toBe(1);
    expect(error.getCall(0).args).toEqual([400, '{ "errors": "Bad Request" }']);
  });

  it('findEpisode returns error callback on second request', function() {
    episodeSearch.findEpisode({ success: success, error: error });
    expect(this.requests.length).toBe(1);
    this.requests[0].respond(400, { 'Content-Type': 'application/json' },
      '{ "errors": "Bad Request" }');
    expect(error.callCount).toBe(1);
    expect(error.getCall(0).args).toEqual([400, '{ "errors": "Bad Request" }']);
  });

  it('when item type is show, find calls findEpisode', function() {
    episodeSearch.findEpisode = sinon.spy();
    episodeSearch.find({ success: success, error: error });
    expect(episodeSearch.findEpisode.callCount).toBe(1);
    expect(episodeSearch.findEpisode.getCall(0).args).toEqual([{ success: success, error: error }]);
  });

  it('when item type is movie, ind calls findItem', function() {
    movieSearch.findItem = sinon.spy();
    movieSearch.find({ success: success, error: error });
    expect(movieSearch.findItem.callCount).toBe(1);
    expect(movieSearch.findItem.getCall(0).args).toEqual([{ success: success, error: error }]);
  });
});