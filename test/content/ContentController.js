import chrome from 'sinon-chrome/extensions';
import sinon from 'sinon';
import ContentController from '../../src/class/content/ContentController';
import ItemParser from '../../src/class/ItemParser';
import Rollbar from '../../src/class/Rollbar';
import Scrobble from '../../src/class/content/Scrobble';
import Search from '../../src/class/Search';

const controller = new ContentController();
const response = {movie: {title: `Rocky`}};
const scrobble = new Scrobble({response: response, type: `movie`});
const item = {type: `movie`, title: `Rocky`, getScrubber: sinon.stub()};
const responseError = {errors: `Unauthorized`};
controller.item = item;

describe(`ContentController`, () => {
  beforeAll(() => {
    global.chrome = chrome;
  });

  beforeEach(() => {
    sinon.spy(controller, `sendAnalyticsEvent`);
    sinon.spy(controller, `setActiveIcon`);
    sinon.spy(controller, `setInactiveIcon`);
    sinon.spy(controller, `showErrorNotification`);
    sinon.spy(controller, `reportError`);
    sinon.stub(ItemParser, `start`);
    sinon.stub(Rollbar, `init`);
    sinon.stub(Rollbar, `warning`);
    sinon.stub(Scrobble.prototype, `start`);
    sinon.stub(Scrobble.prototype, `pause`);
    sinon.stub(Scrobble.prototype, `stop`);
    sinon.stub(Search.prototype, `find`);
  });

  afterEach(() => {
    chrome.flush();
    controller.sendAnalyticsEvent.restore();
    controller.setActiveIcon.restore();
    controller.setInactiveIcon.restore();
    controller.showErrorNotification.restore();
    controller.reportError.restore();
    ItemParser.start.restore();
    Rollbar.init.restore();
    Rollbar.warning.restore();
    Scrobble.prototype.start.restore();
    Scrobble.prototype.pause.restore();
    Scrobble.prototype.stop.restore();
    Search.prototype.find.restore();
  });

  it(`onSearchSuccess() creates scrobble from response`, () => {
    controller.onSearchSuccess(response);
    expect(controller.sendAnalyticsEvent.callCount).toBe(2);
    expect(controller.sendAnalyticsEvent.getCall(0).args).toEqual([{name: `onSearchSuccess`, value: item.title}]);
    expect(controller.sendAnalyticsEvent.getCall(1).args).toEqual([{name: `Scrobble`, value: `start`}]);
    expect(controller.setActiveIcon.callCount).toBe(1);
    expect(Scrobble.prototype.start.callCount).toBe(1);
  });

  it(`onSearchError() sends event to analytics`, () => {
    controller.onSearchError(401, responseError, {});
    expect(controller.sendAnalyticsEvent.callCount).toBe(1);
    expect(controller.sendAnalyticsEvent.getCall(0).args).toEqual([{
      name: `onSearchError`,
      value: `401 - ${item.title}`
    }]);
    expect(controller.reportError.callCount).toBe(1);
    expect(controller.reportError.getCall(0).args).toEqual([`Search`, 401, responseError, {}]);
  });

  it(`onScrobbleSuccess() sends event to analytics`, () => {
    controller.onScrobbleSuccess();
    expect(controller.sendAnalyticsEvent.callCount).toBe(1);
    expect(controller.sendAnalyticsEvent.getCall(0).args).toEqual([{name: `Scrobble`, value: `onSuccess`}]);
  });

  it(`onScrobbleError() sends event to analytics`, () => {
    controller.onScrobbleError(401, responseError, {});
    expect(controller.sendAnalyticsEvent.callCount).toBe(1);
    expect(controller.sendAnalyticsEvent.getCall(0).args).toEqual([{name: `Scrobble`, value: `onError`}]);
    expect(controller.reportError.callCount).toBe(1);
    expect(controller.reportError.getCall(0).args).toEqual([`Scrobble`, 401, responseError, {}]);
  });

  it(`storeItem() sets scrobble to undefined when item is null`, () => {
    controller.storeItem(null);
    expect(controller.scrobble).toBeUndefined();
  });

  it(`storeItem() calls Search.find()`, () => {
    controller.storeItem(item);
    expect(Search.prototype.find.callCount).toBe(1);
  });

  it(`onPlay() calls ItemParser.start() when item and scrobble are undefined`, () => {
    controller.item = null;
    controller.scrobble = undefined;
    controller.onPlay();
    expect(ItemParser.start.callCount).toBe(1);
  });

  it(`onPlay() calls Scrobble.start()`, () => {
    controller.scrobble = scrobble;
    controller.onPlay();
    expect(controller.setActiveIcon.callCount).toBe(1);
    expect(Scrobble.prototype.start.callCount).toBe(1);
    expect(controller.sendAnalyticsEvent.callCount).toBe(1);
    expect(controller.sendAnalyticsEvent.getCall(0).args).toEqual([{name: `Scrobble`, value: `start`}]);
  });

  it(`onPause() calls Scrobble.pause()`, () => {
    controller.scrobble = scrobble;
    controller.onPause();
    expect(controller.setInactiveIcon.callCount).toBe(1);
    expect(Scrobble.prototype.pause.callCount).toBe(1);
    expect(controller.sendAnalyticsEvent.callCount).toBe(1);
    expect(controller.sendAnalyticsEvent.getCall(0).args).toEqual([{name: `Scrobble`, value: `pause`}]);
  });

  it(`onStop() calls Scrobble.stop()`, () => {
    controller.scrobble = scrobble;
    controller.onStop();
    expect(controller.setInactiveIcon.callCount).toBe(1);
    expect(Scrobble.prototype.stop.callCount).toBe(1);
    expect(controller.sendAnalyticsEvent.callCount).toBe(1);
    expect(controller.sendAnalyticsEvent.getCall(0).args).toEqual([{name: `Scrobble`, value: `stop`}]);
    expect(controller.item).toBeNull();
    expect(controller.scrobble).toBeUndefined();
  });

  it(`setInactiveIcon() calls chrome.runtime.sendMessage()`, () => {
    chrome.runtime.sendMessage.withArgs({type: `setInactiveIcon`}).returns();
    controller.setInactiveIcon();
    expect(chrome.runtime.sendMessage.callCount).toBe(1);
    expect(chrome.runtime.sendMessage.calledWith({type: `setInactiveIcon`})).toBeTruthy();
  });

  it(`setActiveIcon() calls chrome.runtime.sendMessage()`, () => {
    chrome.runtime.sendMessage.withArgs({type: `setActiveIcon`}).returns();
    controller.setActiveIcon();
    expect(chrome.runtime.sendMessage.callCount).toBe(1);
    expect(chrome.runtime.sendMessage.calledWith({type: `setActiveIcon`})).toBeTruthy();
  });

  it(`sendAnalyticsEvent() calls chrome.runtime.sendMessage()`, () => {
    chrome.runtime.sendMessage.withArgs({type: `sendEvent`, name: `Foo`, value: `Bar`}).returns();
    controller.sendAnalyticsEvent({name: `Foo`, value: `Bar`});
    expect(chrome.runtime.sendMessage.callCount).toBe(1);
    expect(chrome.runtime.sendMessage.calledWith({type: `sendEvent`, name: `Foo`, value: `Bar`})).toBeTruthy();
  });

  it(`showErrorNotification() calls chrome.runtime.sendMessage()`, () => {
    chrome.runtime.sendMessage.withArgs({type: `showErrorNotification`, message: `Foo`}).returns();
    controller.showErrorNotification(`Foo`);
    expect(chrome.runtime.sendMessage.callCount).toBe(1);
    expect(chrome.runtime.sendMessage.calledWith({type: `showErrorNotification`, message: `Foo`})).toBeTruthy();
  });

  it(`reportError() calls showErrorNotification() when status is 404`, async done => {
    chrome.i18n.getMessage.withArgs(`errorNotificationNotFound`).returns(`errorNotificationNotFound`);
    await controller.reportError(`Foo`, 404, responseError, {});
    expect(controller.showErrorNotification.callCount).toBe(1);
    expect(controller.showErrorNotification.calledWith(`errorNotificationNotFound`)).toBeTruthy();
    done();
  });

  it(`reportError() calls showErrorNotification() and Rollbar.warning() when status is 0 and access_token is defined`, async done => {
    chrome.i18n.getMessage.withArgs(`errorNotificationServers`).returns(`errorNotificationServers`);
    chrome.storage.local.get.withArgs(null).yields({data: {access_token: `12345abcde`}});
    await controller.reportError(`Foo`, 0, responseError, {});
    expect(controller.showErrorNotification.callCount).toBe(1);
    expect(controller.showErrorNotification.calledWith(`errorNotificationServers`)).toBeTruthy();
    expect(Rollbar.init.callCount).toBe(1);
    expect(Rollbar.warning.callCount).toBe(1);
    expect(Rollbar.warning.calledWith(`traktflix: Foo error`, {
      status: 0,
      response: responseError,
      options: {}
    })).toBeTruthy();
    done();
  });

  it(`reportError() calls showErrorNotification() when status is 0 and access_token is undefined`, async done => {
    chrome.i18n.getMessage.withArgs(`errorNotificationLogin`).returns(`errorNotificationLogin`);
    chrome.storage.local.get.withArgs(null).yields({});
    await controller.reportError(`Foo`, 0, responseError, {});
    expect(controller.showErrorNotification.callCount).toBe(1);
    expect(controller.showErrorNotification.calledWith(`errorNotificationLogin`)).toBeTruthy();
    done();
  });

  it(`reportError() calls showErrorNotification() and Rollbar.warning()`, async done => {
    chrome.i18n.getMessage.withArgs(`errorNotificationServers`).returns(`errorNotificationServers`);
    await controller.reportError(`Foo`, 200, responseError, {});
    expect(controller.showErrorNotification.callCount).toBe(1);
    expect(controller.showErrorNotification.calledWith(`errorNotificationServers`)).toBeTruthy();
    expect(Rollbar.init.callCount).toBe(1);
    expect(Rollbar.warning.callCount).toBe(1);
    expect(Rollbar.warning.calledWith(`traktflix: Foo error`, {
      status: 200,
      response: responseError,
      options: {}
    })).toBeTruthy();
    done();
  });

  it(`getCurrentItem() returns show object`, () => {
    const response = {episode: {title: `Chapter 31`}};
    const scrobble = new Scrobble({response: response, type: `episode`});
    const item = {type: `show`, title: `Chapter 31`, getScrubber: sinon.stub()};
    controller.scrobble = scrobble;
    controller.item = item;
    expect(controller.getCurrentItem()).toEqual({item: scrobble.item.episode});
  });

  it(`getCurrentItem() returns movie object`, () => {
    controller.scrobble = scrobble;
    controller.item = item;
    expect(controller.getCurrentItem()).toEqual({item: scrobble.item.movie});
  });
});