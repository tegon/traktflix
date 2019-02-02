import browser from 'sinon-chrome';
import sinon from 'sinon';
import Settings from '../src/settings.js';
import Search from '../src/class/Search';

window.browser = browser;

const rocky = {
  title: `Rocky`,
  type: `movie`,
  year: 2005
};
const madMen = {
  episode: 1,
  season: 1,
  title: `Mad Men`,
  type: `show`
};
const narcos = {
  epTitle: `The Sword of Simón Bolívar`,
  season: 1,
  title: `Narcos`,
  type: `show`
};
const comedians = {
  episode: 1,
  epTitle: `Zach Galifianakis: From The Third Reich To You`,
  isCollection: true,
  season: 1,
  title: `Comedians in Cars Getting Coffee`,
  type: `show`
};
const movieSearch = new Search({item: rocky});
const episodeSearch = new Search({item: madMen});
const episodeSearchByTitle = new Search({item: narcos});
const collectionSearch = new Search({item: comedians});

let server = null;

browser.flush();
delete window.browser;

describe(`Search`, () => {
  before(() => {
    window.browser = browser;
    browser.storage.local.get.withArgs(`data`).resolves({data: {access_token: `12345abcde`}});
  });

  beforeEach(() => {
    server = sinon.fakeServer.create();
    server.autoRespond = true;
  });

  afterEach(() => {
    server.restore();
  });

  after(() => {
    browser.flush();
    delete window.browser;
  });

  it(`constructor() sets properties`, () => {
    expect(movieSearch.item).to.equal(rocky);
    expect(movieSearch.url).to.equal(`${Settings.apiUri}/search`);
    expect(movieSearch.showsUrl).to.equal(`${Settings.apiUri}/shows`);
  });

  it(`getUrl() returns search url`, () => {
    expect(movieSearch.getUrl()).to.equal(`${Settings.apiUri}/search/${rocky.type}?query=${rocky.title}`);
  });

  it(`findItem() returns first search result`, done => {
    server.respondWith(`GET`, `${Settings.apiUri}/search/${madMen.type}?query=${encodeURIComponent(madMen.title)}`, [200, {[`Content-Type`]: `application/json`}, `[{ "show": { "title": "Mad Men" } }, { "show": { "title": "Mad Women" } }]`]);
    const success = response => {
      expect(response).to.deep.equal({show: {title: `Mad Men`}});
      done();
    };
    const error = () => {
      done.fail();
    };
    episodeSearch.findItem({success, error});
  });

  it(`findItem() returns exact match for movies with same title from different years`, done => {
    server.respondWith(`GET`, `${Settings.apiUri}/search/${rocky.type}?query=${encodeURIComponent(rocky.title)}`, [200, {[`Content-Type`]: `application/json`}, `[{ "movie": { "title": "Rocky", "year": 2000 } }, { "movie": { "title": "Rocky", "year": 2005 } }]`]);
    const success = response => {
      expect(response).to.deep.equal({movie: {title: `Rocky`, year: 2005}});
      done();
    };
    const error = () => {
      done.fail();
    };
    movieSearch.findItem({success, error});
  });

  it(`findItem() returns error callback when data is undefined`, done => {
    server.respondWith(`GET`, `${Settings.apiUri}/search/${rocky.type}?query=${encodeURIComponent(rocky.title)}`, [200, {[`Content-Type`]: `application/json`}, `[]`]);
    const success = () => {
      done.fail();
    };
    const error = status => {
      expect(status).to.equal(404);
      done();
    };
    movieSearch.findItem({success, error});
  });

  it(`findItem() returns error callback`, done => {
    server.respondWith(`GET`, `${Settings.apiUri}/search/${rocky.type}?query=${encodeURIComponent(rocky.title)}`, [400, {[`Content-Type`]: `application/json`}, `{ "errors": "Bad Request" }`]);
    const success = () => {
      done.fail();
    };
    const error = (status, response, opts) => {
      expect(status).to.equal(400);
      expect(response).to.equal(`{ "errors": "Bad Request" }`);
      expect(opts).to.deep.equal({method: `GET`, url: `https://api.trakt.tv/search/movie?query=Rocky`, params: undefined});
      done();
    };
    movieSearch.findItem({success, error});
  });

  it(`getEpisodeUrl() uses episode URL when item is a collection`, () => {
    expect(collectionSearch.getEpisodeUrl(`comedians-in-cars-getting-coffee`)).to.equal(`${Settings.apiUri}/search/episode?query=${encodeURIComponent(comedians.epTitle)}`);
  });

  it(`getEpisodeUrl() uses episode number when item has one`, () => {
    expect(episodeSearch.getEpisodeUrl(`mad-men`)).to.equal(`${Settings.apiUri}/shows/mad-men/seasons/${madMen.season}/episodes/${madMen.episode}?extended=images`);
  });

  it(`getEpisodeUrl() gets all episodes when item does not have an episode number`, () => {
    expect(episodeSearchByTitle.getEpisodeUrl(`narcos`)).to.equal(`${Settings.apiUri}/shows/narcos/seasons/${narcos.season}?extended=images`);
  });

  it(`formatEpisodeTitle() formats title`, () => {
    expect(episodeSearchByTitle.formatEpisodeTitle(narcos.epTitle)).to.equal(`swordofsimónbolívar`);
  });

  it(`findEpisode() returns first search result`, done => {
    server.respondWith(`GET`, `${Settings.apiUri}/search/${madMen.type}?query=${encodeURIComponent(madMen.title)}`, [200, {[`Content-Type`]: `application/json`}, `[{ "show": { "title": "Mad Men", "ids": { "slug": "mad-men" } } }]`]);
    server.respondWith(`GET`, `${Settings.apiUri}/shows/mad-men/seasons/${madMen.season}/episodes/${madMen.episode}?extended=images`, [200, {[`Content-Type`]: `application/json`}, `{ "title": "Ladies Room", "season": 1, "number": 2 }`]);
    const success = response => {
      expect(response).to.deep.equal({
        title: `Ladies Room`, season: 1, number: 2,
        show: {
          title: `Mad Men`, ids: {slug: `mad-men`}
        }
      });
      done();
    };
    const error = () => {
      done.fail();
    };
    episodeSearch.findEpisode({success, error});
  });

  it(`findEpisode() returns first search result with same title when item is a collection`, done => {
    server.respondWith(`GET`, `${Settings.apiUri}/search/${comedians.type}?query=${encodeURIComponent(comedians.title)}`, [200, {[`Content-Type`]: `application/json`}, `[{ "show": { "title": "Comedians in Cars Getting Coffee", "ids": { "slug": "comedians-in-cars-getting-coffee" } } }]`]);
    server.respondWith(`GET`, `${Settings.apiUri}/search/episode?query=${encodeURIComponent(comedians.epTitle)}`, [200, {[`Content-Type`]: `application/json`}, `[{ "type": "episode", "episode": { "season": 10, "number": 1, "title": "Zach Galifianakis: From The Third Reich To You" } }]`]);
    const success = response => {
      expect(response).to.deep.equal({
        title: `Zach Galifianakis: From The Third Reich To You`, season: 10, number: 1,
        show: {
          title: `Comedians in Cars Getting Coffee`, ids: {slug: `comedians-in-cars-getting-coffee`}
        }
      });
      done();
    };
    const error = () => {
      done.fail();
    };
    collectionSearch.findEpisode({success, error});
  });

  it(`findEpisode() returns first search result with same title`, done => {
    server.respondWith(`GET`, `${Settings.apiUri}/search/${narcos.type}?query=${encodeURIComponent(narcos.title)}`, [200, {[`Content-Type`]: `application/json`}, `[{ "show": { "title": "Narcos", "ids": { "slug": "narcos" } } }]`]);
    server.respondWith(`GET`, `${Settings.apiUri}/shows/narcos/seasons/${narcos.season}?extended=images`, [200, {[`Content-Type`]: `application/json`}, `[{ "season": 1, "number": 1, "title": "Descenso" }, { "season": 1, "number": 2, "title": "The Sword of Simón Bolívar" }]`]);
    const success = response => {
      expect(response).to.deep.equal({
        title: `The Sword of Simón Bolívar`, season: 1, number: 2,
        show: {
          title: `Narcos`, ids: {slug: `narcos`}
        }
      });
      done();
    };
    const error = () => {
      done.fail();
    };
    episodeSearchByTitle.findEpisode({success, error});
  });

  it(`findEpisode() returns error callback when an episode with same title was not found`, done => {
    server.respondWith(`GET`, `${Settings.apiUri}/search/${narcos.type}?query=${encodeURIComponent(narcos.title)}`, [200, {[`Content-Type`]: `application/json`}, `[{ "show": { "title": "Narcos", "ids": { "slug": "narcos" } } }]`]);
    server.respondWith(`GET`, `${Settings.apiUri}/shows/narcos/seasons/${narcos.season}?extended=images`, [200, {[`Content-Type`]: `application/json`}, `[{ "season": 1, "number": 1, "title": "Descenso" }, { "season": 1, "number": 3, "title": "The Men of Always" }]`]);
    const success = () => {
      done.fail();
    };
    const error = (status, error, response) => {
      expect(status).to.equal(404);
      expect(error).to.equal(`Episode not found.`);
      expect(response).to.deep.equal({
        show: {show: {title: `Narcos`, ids: {slug: `narcos`}}},
        item: {type: `show`, season: 1, title: `Narcos`, epTitle: `The Sword of Simón Bolívar`}
      });
      done();
    };
    episodeSearchByTitle.findEpisode({success, error});
  });

  it(`findEpisode() returns error callback on first request`, done => {
    server.respondWith(`GET`, `${Settings.apiUri}/search/${madMen.type}?query=${encodeURIComponent(madMen.title)}`, [400, {[`Content-Type`]: `application/json`}, `{ "errors": "Bad Request" }`]);
    const success = () => {
      done.fail();
    };
    const error = (status, error, response) => {
      expect(status).to.equal(400);
      expect(error).to.equal(`{ "errors": "Bad Request" }`);
      expect(response).to.deep.equal({
        url: `https://api.trakt.tv/search/show?query=Mad%20Men`,
        method: `GET`,
        params: undefined
      });
      done();
    };
    episodeSearch.findEpisode({success, error});
  });

  it(`findEpisode() returns error callback on second request`, done => {
    server.respondWith(`GET`, `${Settings.apiUri}/search/${madMen.type}?query=${encodeURIComponent(madMen.title)}`, [200, {[`Content-Type`]: `application/json`}, `[{ "show": { "title": "Mad Men", "ids": { "slug": "mad-men" } } }]`]);
    server.respondWith(`GET`, `${Settings.apiUri}/shows/mad-men/seasons/${madMen.season}/episodes/${madMen.episode}?extended=images`, [400, {[`Content-Type`]: `application/json`}, `{ "errors": "Bad Request" }`]);
    const success = () => {
      done.fail();
    };
    const error = (status, error, response) => {
      expect(status).to.equal(400);
      expect(error).to.equal(`{ "errors": "Bad Request" }`);
      expect(response).to.deep.equal({
        url: `https://api.trakt.tv/shows/mad-men/seasons/1/episodes/1?extended=images`,
        method: `GET`,
        params: undefined
      });
      done();
    };
    episodeSearch.findEpisode({success, error});
  });

  it(`find() calls findEpisode() when item type is show`, () => {
    sinon.stub(episodeSearch, `findEpisode`);
    const success = () => {};
    const error = () => {};
    episodeSearch.find({success, error});
    expect(episodeSearch.findEpisode.callCount).to.equal(1);
    expect(episodeSearch.findEpisode.args[0]).to.deep.equal([{success, error}]);
    episodeSearch.findEpisode.restore();
  });

  it(`find() calls findItem() when item type is movie`, () => {
    sinon.stub(movieSearch, `findItem`);
    const success = () => {};
    const error = () => {};
    movieSearch.find({success, error});
    expect(movieSearch.findItem.callCount).to.equal(1);
    expect(movieSearch.findItem.args[0]).to.deep.equal([{success, error}]);
    movieSearch.findItem.restore();
  });
});
