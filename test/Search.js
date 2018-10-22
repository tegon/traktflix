import chrome from 'sinon-chrome/extensions';
import sinon from 'sinon';
import Search from '../src/class/Search';
import Settings from '../src/settings.js';

const success = sinon.spy();
const error = sinon.spy();
const rocky = {title: `Rocky`, type: `movie`};
const movieSearch = new Search({item: rocky});
const madMen = {type: `show`, season: 1, episode: 1, title: `Mad Men`};
const narcos = {type: `show`, season: 1, title: `Narcos`, epTitle: `The Sword of Simón Bolívar`};
const episodeSearch = new Search({item: madMen});
const episodeSearchByTitle = new Search({item: narcos});

let server = null;

describe(`Search`, function () {
  beforeAll(() => {
    global.chrome = chrome;
    chrome.storage.local.get.withArgs(`data`).yields({data: {access_token: `12345abcde`}});
  });

  beforeEach(() => {
    server = sinon.fakeServer.create();
  });

  afterEach(() => {
    server.restore();
    success.resetHistory();
    error.resetHistory();
  });

  it(`constructor() sets properties`, () => {
    expect(movieSearch.item).toBe(rocky);
    expect(movieSearch.url).toBe(`${Settings.apiUri}/search`);
    expect(movieSearch.showsUrl).toBe(`${Settings.apiUri}/shows`);
  });

  it(`getUrl() returns search url`, () => {
    expect(movieSearch.getUrl()).toBe(`${Settings.apiUri}/search/${rocky.type}?query=${rocky.title}`);
  });

  it(`getEpisodeUrl() uses episode number when item has an episode number`, () => {
    expect(episodeSearch.getEpisodeUrl(`mad-men`)).toBe(`${Settings.apiUri}/shows/mad-men/seasons/${madMen.season}/episodes/${madMen.episode}?extended=images`);
  });

  it(`getEpisodeUrl() gets all episodes when item does not have an episode number`, () => {
    expect(episodeSearchByTitle.getEpisodeUrl(`narcos`)).toBe(`${Settings.apiUri}/shows/narcos/seasons/${madMen.season}?extended=images`);
  });

  it(`findItem() returns first search result`, async done => {
    server.respondWith(`GET`, `${Settings.apiUri}/search/${rocky.type}?query=${encodeURIComponent(rocky.title)}`, [200, {[`Content-Type`]: `application/json`}, `[{ "movie": { "title": "Rocky" } }, { "movie": { "title": "Rocky II" } }]`]);
    await movieSearch.findItem({success, error});
    server.respond();
    expect(error.callCount).toBe(0);
    expect(success.callCount).toBe(1);
    expect(success.getCall(0).args).toEqual([{movie: {title: `Rocky`}}]);
    done();
  });

  it(`findItem() returns error callback when data is undefined`, async done => {
    server.respondWith(`GET`, `${Settings.apiUri}/search/${rocky.type}?query=${encodeURIComponent(rocky.title)}`, [200, {[`Content-Type`]: `application/json`}, `[]`]);
    await movieSearch.findItem({success, error});
    server.respond();
    expect(success.callCount).toBe(0);
    expect(error.callCount).toBe(1);
    expect(error.getCall(0).args).toEqual([404]);
    done();
  });

  it(`findItem() returns error callback`, async done => {
    server.respondWith(`GET`, `${Settings.apiUri}/search/${rocky.type}?query=${encodeURIComponent(rocky.title)}`, [400, {[`Content-Type`]: `application/json`}, `{ "errors": "Bad Request" }`]);
    await movieSearch.findItem({success, error});
    server.respond();
    expect(success.callCount).toBe(0);
    expect(error.callCount).toBe(1);
    expect(error.getCall(0).args).toEqual([400, `{ "errors": "Bad Request" }`,
      {method: `GET`, url: `https://api.trakt.tv/search/movie?query=Rocky`, params: undefined}]);
    done();
  });

  it(`formatEpisodeTitle() formats title`, () => {
    expect(episodeSearchByTitle.formatEpisodeTitle(narcos.epTitle)).toBe(`swordofsimónbolívar`);
  });

  it(`findEpisode() returns first search result`, async done => {
    server.respondWith(`GET`, `${Settings.apiUri}/search/${madMen.type}?query=${encodeURIComponent(madMen.title)}`, [200, {[`Content-Type`]: `application/json`}, `[{ "show": { "title": "Mad Men", "ids": { "slug": "mad-men" } } }]`]);
    server.respondWith(`GET`, `${Settings.apiUri}/shows/mad-men/seasons/${madMen.season}/episodes/${madMen.episode}?extended=images`, [200, {[`Content-Type`]: `application/json`}, `{ "title": "Ladies Room", "season": 1, "number": 2 }`]);
    const [promise1, promise2] = episodeSearch.findEpisode({success, error});
    await promise1;
    server.respond();
    await promise2;
    server.respond();
    expect(error.callCount).toBe(0);
    expect(success.callCount).toBe(1);
    expect(success.getCall(0).args).toEqual([{
      title: `Ladies Room`, season: 1, number: 2,
      show: {
        title: `Mad Men`, ids: {slug: `mad-men`}
      }
    }]);
    done();
  });

  it(`findEpisode() returns first search result with same title`, async done => {
    server.respondWith(`GET`, `${Settings.apiUri}/search/${narcos.type}?query=${encodeURIComponent(narcos.title)}`, [200, {[`Content-Type`]: `application/json`}, `[{ "show": { "title": "Narcos", "ids": { "slug": "narcos" } } }]`]);
    server.respondWith(`GET`, `${Settings.apiUri}/shows/narcos/seasons/${narcos.season}?extended=images`, [200, {[`Content-Type`]: `application/json`}, `[{ "season": 1, "number": 1, "title": "Descenso" }, { "season": 1, "number": 2, "title": "The Sword of Simón Bolívar" }]`]);
    const [promise1, promise2] = episodeSearchByTitle.findEpisode({success, error});
    await promise1;
    server.respond();
    await promise2;
    server.respond();
    expect(error.callCount).toBe(0);
    expect(success.callCount).toBe(1);
    expect(success.getCall(0).args).toEqual([{
      title: `The Sword of Simón Bolívar`, season: 1, number: 2,
      show: {
        title: `Narcos`, ids: {slug: `narcos`}
      }
    }]);
    done();
  });

  it(`findEpisode() returns error callback when an episode with same title was not found`, async done => {
    server.respondWith(`GET`, `${Settings.apiUri}/search/${narcos.type}?query=${encodeURIComponent(narcos.title)}`, [200, {[`Content-Type`]: `application/json`}, `[{ "show": { "title": "Narcos", "ids": { "slug": "narcos" } } }]`]);
    server.respondWith(`GET`, `${Settings.apiUri}/shows/narcos/seasons/${narcos.season}?extended=images`, [200, {[`Content-Type`]: `application/json`}, `[{ "season": 1, "number": 1, "title": "Descenso" }, { "season": 1, "number": 3, "title": "The Men of Always" }]`]);
    const [promise1, promise2] = episodeSearchByTitle.findEpisode({success, error});
    await promise1;
    server.respond();
    await promise2;
    server.respond();
    expect(success.callCount).toBe(0);
    expect(error.callCount).toBe(1);
    expect(error.getCall(0).args).toEqual([404, `Episode not found.`,
      {
        show: {show: {title: `Narcos`, ids: {slug: `narcos`}}},
        item: {type: `show`, season: 1, title: `Narcos`, epTitle: `The Sword of Simón Bolívar`}
      }]);
    done();
  });

  it(`findEpisode() returns error callback`, async done => {
    server.respondWith(`GET`, `${Settings.apiUri}/search/${madMen.type}?query=${encodeURIComponent(madMen.title)}`, [200, {[`Content-Type`]: `application/json`}, `[{ "show": { "title": "Mad Men", "ids": { "slug": "mad-men" } } }]`]);
    server.respondWith(`GET`, `${Settings.apiUri}/shows/mad-men/seasons/${madMen.season}/episodes/${madMen.episode}?extended=images`, [400, {[`Content-Type`]: `application/json`}, `{ "errors": "Bad Request" }`]);
    const [promise1, promise2] = episodeSearch.findEpisode({success, error});
    await promise1;
    server.respond();
    await promise2;
    server.respond();
    expect(success.callCount).toBe(0);
    expect(error.callCount).toBe(1);
    expect(error.getCall(0).args).toEqual([400, `{ "errors": "Bad Request" }`,
      {
        url: `https://api.trakt.tv/shows/mad-men/seasons/1/episodes/1?extended=images`,
        method: `GET`,
        params: undefined
      }]);
    done();
  });

  it(`findEpisode() returns error callback on second request`, async done => {
    server.respondWith(`GET`, `${Settings.apiUri}/search/${madMen.type}?query=${encodeURIComponent(madMen.title)}`, [400, {[`Content-Type`]: `application/json`}, `{ "errors": "Bad Request" }`]);
    const [promise1, promise2] = episodeSearch.findEpisode({success, error});
    await promise1;
    server.respond();
    await promise2;
    expect(success.callCount).toBe(0);
    expect(error.callCount).toBe(1);
    expect(error.getCall(0).args).toEqual([400, `{ "errors": "Bad Request" }`,
      {url: `https://api.trakt.tv/search/show?query=Mad%20Men`, method: `GET`, params: undefined}]);
    done();
  });

  it(`find() calls findEpisode() when item type is show`, () => {
    episodeSearch.findEpisode = sinon.spy();
    episodeSearch.find({success, error});
    expect(episodeSearch.findEpisode.callCount).toBe(1);
    expect(episodeSearch.findEpisode.getCall(0).args).toEqual([{success, error}]);
  });

  it(`find() calls findItem() when item type is movie`, () => {
    movieSearch.findItem = sinon.spy();
    movieSearch.find({success, error});
    expect(movieSearch.findItem.callCount).toBe(1);
    expect(movieSearch.findItem.getCall(0).args).toEqual([{success, error}]);
  });

  afterAll(() => {
    chrome.flush();
    delete global.chrome;
  });
});
