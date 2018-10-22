import chrome from 'sinon-chrome/extensions';
import sinon from 'sinon';
import NetflixTestUtils from '../../test-helpers/NetflixTestHelper';
import Scrobble from '../../src/class/content/Scrobble';
import Settings from '../../src/settings';

const success = sinon.spy();
const error = sinon.spy();
const scrobbleShow = new Scrobble({
  type: `show`,
  response: {
    title: `Bar`,
    show: {
      title: `Foo`
    }
  },
  success: success,
  error: error
});
const scrobbleMovie = new Scrobble({
  type: `movie`,
  response: {
    movie: {title: `FooBar`}
  }
});

let server = null;

describe(`Scrobble`, () => {
  beforeAll(() => {
    global.chrome = chrome;
  });

  beforeEach(() => {
    document.body.innerHTML = ``;
    server = sinon.fakeServer.create();
    sinon.spy(scrobbleShow, `showNotification`);
    sinon.spy(scrobbleShow, `showErrorNotification`);
  });

  afterEach(() => {
    chrome.flush();
    server.restore();
    success.resetHistory();
    error.resetHistory();
    scrobbleShow.showNotification.restore();
    scrobbleShow.showErrorNotification.restore();
  });

  it(`constructor() sets properties`, () => {
    expect(scrobbleShow.item).toEqual({
      episode: {
        title: `Bar`,
        show: {
          title: `Foo`
        }
      }
    });
    expect(scrobbleShow.success).toBe(success);
    expect(scrobbleShow.error).toBe(error);
    expect(scrobbleShow.url).toBe(`${Settings.apiUri}/scrobble`);
  });

  it(`wraps item inside episode when type is show`, () => {
    expect(scrobbleShow.item).toEqual({
      episode: {
        title: `Bar`,
        show: {
          title: `Foo`
        }
      }
    });
  });

  it(`wraps item inside movie when type is movie`, () => {
    expect(scrobbleMovie.item).toEqual({movie: {title: `FooBar`, type: `movie`}});
  });

  it(`start() calls success`, async done => {
    chrome.storage.local.get.withArgs(`data`).yields({data: {access_token: `12345abcde`}});
    chrome.storage.local.get.withArgs(`options`).yields({options: {showNotifications: true}});
    chrome.i18n.getMessage.withArgs(`scrobbleStarted`).returns(`scrobbleStarted`);
    server.respondWith(`POST`, `${Settings.apiUri}/scrobble/start`, [200, {[`Content-Type`]: `application/json`}, ``]);
    const [promise1, promise2] = scrobbleShow.start();
    await promise1;
    server.respond();
    await promise2;
    expect(error.callCount).toBe(0);
    expect(success.callCount).toBe(1);
    expect(scrobbleShow.showNotification.callCount).toBe(1);
    expect(scrobbleShow.showNotification.calledWith(`traktflix: Foo - Bar`, `scrobbleStarted`)).toBeTruthy();
    done();
  });

  it(`pause() calls success`, async done => {
    chrome.storage.local.get.withArgs(`data`).yields({data: {access_token: `12345abcde`}});
    chrome.storage.local.get.withArgs(`options`).yields({options: {showNotifications: true}});
    chrome.i18n.getMessage.withArgs(`scrobblePaused`).returns(`scrobblePaused`);
    server.respondWith(`POST`, `${Settings.apiUri}/scrobble/pause`, [200, {[`Content-Type`]: `application/json`}, ``]);
    const [promise1, promise2] = scrobbleShow.pause();
    await promise1;
    server.respond();
    await promise2;
    expect(error.callCount).toBe(0);
    expect(success.callCount).toBe(1);
    expect(scrobbleShow.showNotification.callCount).toBe(1);
    expect(scrobbleShow.showNotification.calledWith(`traktflix: Foo - Bar`, `scrobblePaused`)).toBeTruthy();
    done();
  });

  it(`stop() calls success`, async done => {
    chrome.storage.local.get.withArgs(`data`).yields({data: {access_token: `12345abcde`}});
    chrome.storage.local.get.withArgs(`options`).yields({options: {showNotifications: true}});
    chrome.i18n.getMessage.withArgs(`scrobbleStopped`).returns(`scrobbleStopped`);
    server.respondWith(`POST`, `${Settings.apiUri}/scrobble/stop`, [200, {[`Content-Type`]: `application/json`}, ``]);
    const [promise1, promise2] = scrobbleShow.stop();
    await promise1;
    server.respond();
    await promise2;
    expect(error.callCount).toBe(0);
    expect(success.callCount).toBe(1);
    expect(scrobbleShow.showNotification.callCount).toBe(1);
    expect(scrobbleShow.showNotification.calledWith(`traktflix: Foo - Bar`, `scrobbleStopped`)).toBeTruthy();
    done();
  });

  it(`start() calls error`, async done => {
    chrome.storage.local.get.withArgs(`data`).yields({data: {access_token: `12345abcde`}});
    chrome.storage.local.get.withArgs(`options`).yields({options: {showNotifications: true}});
    chrome.i18n.getMessage.withArgs(`couldNotScrobble`).returns(`couldNotScrobble`);
    server.respondWith(`POST`, `${Settings.apiUri}/scrobble/start`, [500, {[`Content-Type`]: `application/json`}, ``]);
    const [promise1, promise2] = scrobbleShow.start();
    await promise1;
    server.respond();
    await promise2;
    expect(success.callCount).toBe(0);
    expect(error.callCount).toBe(1);
    expect(scrobbleShow.showErrorNotification.callCount).toBe(1);
    expect(scrobbleShow.showErrorNotification.calledWith(`couldNotScrobble Foo - Bar`)).toBeTruthy();
    done();
  });

  it(`pause() calls error`, async done => {
    chrome.storage.local.get.withArgs(`data`).yields({data: {access_token: `12345abcde`}});
    chrome.storage.local.get.withArgs(`options`).yields({options: {showNotifications: true}});
    chrome.i18n.getMessage.withArgs(`couldNotScrobble`).returns(`couldNotScrobble`);
    server.respondWith(`POST`, `${Settings.apiUri}/scrobble/pause`, [500, {[`Content-Type`]: `application/json`}, ``]);
    const [promise1, promise2] = scrobbleShow.pause();
    await promise1;
    server.respond();
    await promise2;
    expect(success.callCount).toBe(0);
    expect(error.callCount).toBe(1);
    expect(scrobbleShow.showErrorNotification.callCount).toBe(1);
    expect(scrobbleShow.showErrorNotification.calledWith(`couldNotScrobble Foo - Bar`)).toBeTruthy();
    done();
  });

  it(`stop() calls error`, async done => {
    chrome.storage.local.get.withArgs(`data`).yields({data: {access_token: `12345abcde`}});
    chrome.storage.local.get.withArgs(`options`).yields({options: {showNotifications: true}});
    chrome.i18n.getMessage.withArgs(`couldNotScrobble`).returns(`couldNotScrobble`);
    server.respondWith(`POST`, `${Settings.apiUri}/scrobble/stop`, [500, {[`Content-Type`]: `application/json`}, ``]);
    const [promise1, promise2] = scrobbleShow.stop();
    await promise1;
    server.respond();
    await promise2;
    expect(success.callCount).toBe(0);
    expect(error.callCount).toBe(1);
    expect(scrobbleShow.showErrorNotification.callCount).toBe(1);
    expect(scrobbleShow.showErrorNotification.calledWith(`couldNotScrobble Foo - Bar`)).toBeTruthy();
    done();
  });

  it(`webScrubber() sets the progress for show`, () => {
    NetflixTestUtils.renderPlayer(`show`);
    scrobbleShow.webScrubber();
    expect(scrobbleShow.progress.toFixed(2)).toBe(`1.57`);
  });

  it(`webScrubber() sets the progress for movie`, () => {
    NetflixTestUtils.renderPlayer(`movie`);
    scrobbleMovie.webScrubber();
    expect(scrobbleMovie.progress.toFixed(2)).toBe(`2.91`);
  });

  it(`showNotification() calls chrome.runtime.sendMessage()`, () => {
    chrome.runtime.sendMessage.withArgs({type: `showNotification`, title: `Foo`, message: `Bar`}).returns();
    scrobbleShow.showNotification(`Foo`, `Bar`);
    expect(chrome.runtime.sendMessage.callCount).toBe(1);
    expect(chrome.runtime.sendMessage.calledWith({
      type: `showNotification`,
      title: `Foo`,
      message: `Bar`
    })).toBeTruthy();
  });

  it(`showErrorNotification() calls chrome.runtime.sendMessage()`, () => {
    chrome.runtime.sendMessage.withArgs({type: `showErrorNotification`, message: `Foo`}).returns();
    scrobbleShow.showErrorNotification(`Foo`);
    expect(chrome.runtime.sendMessage.callCount).toBe(1);
    expect(chrome.runtime.sendMessage.calledWith({type: `showErrorNotification`, message: `Foo`})).toBeTruthy();
  });

  afterAll(() => {
    chrome.flush();
    delete global.chrome;
  });
});
