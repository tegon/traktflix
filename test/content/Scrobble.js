import sinon from 'sinon';
import chrome from 'sinon-chrome/extensions';
import NetflixTestUtils from '../../test-helpers/NetflixTestHelper';
import Scrobble from '../../src/class/content/Scrobble';
import Settings from '../../src/settings';

const scrobbleMovie = new Scrobble({
  type: `movie`,
  response: {
    movie: {title: `FooBar`}
  }
});
const scrobbleShow = new Scrobble({
  type: `show`,
  response: {
    title: `Bar`,
    show: {
      title: `Foo`
    }
  }
});

let server = null;

describe(`Scrobble`, () => {
  before(() => {
    global.chrome = chrome;
  });

  beforeEach(() => {
    document.body.innerHTML = ``;
    server = sinon.fakeServer.create();
    server.autoRespond = true;
  });

  afterEach(() => {
    chrome.flush();
    server.restore();
  });

  after(() => {
    chrome.flush();
    delete global.chrome;
  });

  it(`constructor() sets properties for movie`, () => {
    expect(scrobbleMovie.item).to.deep.equal({
      movie: {
        title: `FooBar`,
        type: `movie`
      }
    });
    expect(scrobbleMovie.success).to.be.undefined;
    expect(scrobbleMovie.error).to.be.undefined;
    expect(scrobbleMovie.url).to.equal(`${Settings.apiUri}/scrobble`);
  });

  it(`constructor() sets properties for show`, () => {
    expect(scrobbleShow.item).to.deep.equal({
      episode: {
        title: `Bar`,
        show: {
          title: `Foo`
        }
      }
    });
    expect(scrobbleShow.success).to.be.undefined;
    expect(scrobbleShow.error).to.be.undefined;
    expect(scrobbleShow.url).to.equal(`${Settings.apiUri}/scrobble`);
  });

  it(`webScrubber() sets the progress for movie`, () => {
    NetflixTestUtils.renderPlayer(`movie`);
    scrobbleMovie.webScrubber();
    expect(scrobbleMovie.progress.toFixed(2)).to.equal(`2.91`);
  });

  it(`webScrubber() sets the progress for show`, () => {
    NetflixTestUtils.renderPlayer(`show`);
    scrobbleShow.webScrubber();
    expect(scrobbleShow.progress.toFixed(2)).to.equal(`1.57`);
  });

  it(`start() calls success`, done => {
    chrome.storage.local.get.withArgs(`data`).yields({data: {access_token: `12345abcde`}});
    chrome.storage.local.get.withArgs(`options`).yields({options: {showNotifications: true}});
    chrome.i18n.getMessage.withArgs(`scrobbleStarted`).returns(`scrobbleStarted`);
    server.respondWith(`POST`, `${Settings.apiUri}/scrobble/start`, [200, {[`Content-Type`]: `application/json`}, ``]);
    scrobbleShow.success = () => {
      expect(chrome.runtime.sendMessage.callCount).to.equal(1);
      expect(chrome.runtime.sendMessage.args[0]).to.deep.equal([{
        type: `showNotification`,
        message: `scrobbleStarted`,
        title: `traktflix: Foo - Bar`
      }]);
      done();
    };
    scrobbleShow.error = () => {
      done.fail();
    };
    scrobbleShow.start();
  });

  it(`start() calls error`, done => {
    chrome.storage.local.get.withArgs(`data`).yields({data: {access_token: `12345abcde`}});
    chrome.storage.local.get.withArgs(`options`).yields({options: {showNotifications: true}});
    chrome.i18n.getMessage.withArgs(`couldNotScrobble`).returns(`couldNotScrobble`);
    server.respondWith(`POST`, `${Settings.apiUri}/scrobble/start`, [500, {[`Content-Type`]: `application/json`}, ``]);
    scrobbleShow.success = () => {
      done.fail();
    };
    scrobbleShow.error = () => {
      expect(chrome.runtime.sendMessage.callCount).to.equal(1);
      expect(chrome.runtime.sendMessage.args[0]).to.deep.equal([{
        type: `showErrorNotification`,
        message: `couldNotScrobble Foo - Bar`
      }]);
      done();
    };
    scrobbleShow.start();
  });

  it(`pause() calls success`, done => {
    chrome.storage.local.get.withArgs(`data`).yields({data: {access_token: `12345abcde`}});
    chrome.storage.local.get.withArgs(`options`).yields({options: {showNotifications: true}});
    chrome.i18n.getMessage.withArgs(`scrobblePaused`).returns(`scrobblePaused`);
    server.respondWith(`POST`, `${Settings.apiUri}/scrobble/pause`, [200, {[`Content-Type`]: `application/json`}, ``]);
    scrobbleShow.success = () => {
      expect(chrome.runtime.sendMessage.callCount).to.equal(1);
      expect(chrome.runtime.sendMessage.args[0]).to.deep.equal([{
        type: `showNotification`,
        message: `scrobblePaused`,
        title: `traktflix: Foo - Bar`
      }]);
      done();
    };
    scrobbleShow.error = () => {
      done.fail();
    };
    scrobbleShow.pause();
  });

  it(`pause() calls error`, done => {
    chrome.storage.local.get.withArgs(`data`).yields({data: {access_token: `12345abcde`}});
    chrome.storage.local.get.withArgs(`options`).yields({options: {showNotifications: true}});
    chrome.i18n.getMessage.withArgs(`couldNotScrobble`).returns(`couldNotScrobble`);
    server.respondWith(`POST`, `${Settings.apiUri}/scrobble/pause`, [500, {[`Content-Type`]: `application/json`}, ``]);
    scrobbleShow.success = () => {
      done.fail();
    };
    scrobbleShow.error = () => {
      expect(chrome.runtime.sendMessage.callCount).to.equal(1);
      expect(chrome.runtime.sendMessage.args[0]).to.deep.equal([{
        type: `showErrorNotification`,
        message: `couldNotScrobble Foo - Bar`
      }]);
      done();
    };
    scrobbleShow.pause();
  });

  it(`stop() calls success`, done => {
    chrome.storage.local.get.withArgs(`data`).yields({data: {access_token: `12345abcde`}});
    chrome.storage.local.get.withArgs(`options`).yields({options: {showNotifications: true}});
    chrome.i18n.getMessage.withArgs(`scrobbleStopped`).returns(`scrobbleStopped`);
    server.respondWith(`POST`, `${Settings.apiUri}/scrobble/stop`, [200, {[`Content-Type`]: `application/json`}, ``]);
    scrobbleShow.success = () => {
      expect(chrome.runtime.sendMessage.callCount).to.equal(1);
      expect(chrome.runtime.sendMessage.args[0]).to.deep.equal([{
        type: `showNotification`,
        message: `scrobbleStopped`,
        title: `traktflix: Foo - Bar`
      }]);
      done();
    };
    scrobbleShow.error = () => {
      done.fail();
    };
    scrobbleShow.stop();
  });

  it(`stop() calls error`, done => {
    chrome.storage.local.get.withArgs(`data`).yields({data: {access_token: `12345abcde`}});
    chrome.storage.local.get.withArgs(`options`).yields({options: {showNotifications: true}});
    chrome.i18n.getMessage.withArgs(`couldNotScrobble`).returns(`couldNotScrobble`);
    server.respondWith(`POST`, `${Settings.apiUri}/scrobble/stop`, [500, {[`Content-Type`]: `application/json`}, ``]);
    scrobbleShow.success = () => {
      done.fail();
    };
    scrobbleShow.error = () => {
      expect(chrome.runtime.sendMessage.callCount).to.equal(1);
      expect(chrome.runtime.sendMessage.args[0]).to.deep.equal([{
        type: `showErrorNotification`,
        message: `couldNotScrobble Foo - Bar`
      }]);
      done();
    };
    scrobbleShow.stop();
  });
});
