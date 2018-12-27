import sinon from 'sinon';
import chrome from 'sinon-chrome/extensions';
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
  before(() => {
    global.chrome = chrome;
  });

  beforeEach(() => {
    sinon.spy(controller, `sendAnalyticsEvent`);
    sinon.spy(controller, `setActiveIcon`);
    sinon.spy(controller, `setInactiveIcon`);
    sinon.spy(controller, `showErrorNotification`);
    sinon.spy(controller, `reportError`);
    sinon.stub(ItemParser, `start`).resolves(null);
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

  after(() => {
    chrome.flush();
    delete global.chrome;
  });

  it(`setActiveIcon() calls chrome.runtime.sendMessage()`, () => {
    controller.setActiveIcon();
    expect(chrome.runtime.sendMessage.callCount).to.equal(1);
    expect(chrome.runtime.sendMessage.args[0]).to.deep.equal([{type: `setActiveIcon`}]);
  });

  it(`setInactiveIcon() calls chrome.runtime.sendMessage()`, () => {
    controller.setInactiveIcon();
    expect(chrome.runtime.sendMessage.callCount).to.equal(1);
    expect(chrome.runtime.sendMessage.args[0]).to.deep.equal([{type: `setInactiveIcon`}]);
  });

  it(`sendAnalyticsEvent() calls chrome.runtime.sendMessage()`, () => {
    controller.sendAnalyticsEvent({name: `Foo`, value: `Bar`});
    expect(chrome.runtime.sendMessage.callCount).to.equal(1);
    expect(chrome.runtime.sendMessage.args[0]).to.deep.equal([{type: `sendEvent`, name: `Foo`, value: `Bar`}]);
  });

  it(`onScrobbleSuccess() sends event to analytics`, () => {
    controller.onScrobbleSuccess();
    expect(controller.sendAnalyticsEvent.callCount).to.equal(1);
    expect(controller.sendAnalyticsEvent.args[0]).to.deep.equal([{name: `Scrobble`, value: `onSuccess`}]);
  });

  it(`onScrobbleError() sends event to analytics`, () => {
    controller.onScrobbleError(401, responseError, {});
    expect(controller.sendAnalyticsEvent.callCount).to.equal(1);
    expect(controller.sendAnalyticsEvent.args[0]).to.deep.equal([{name: `Scrobble`, value: `onError`}]);
    expect(controller.reportError.callCount).to.equal(1);
    expect(controller.reportError.args[0]).to.deep.equal([`Scrobble`, 401, responseError, {}]);
  });

  it(`onSearchSuccess() creates scrobble from response`, () => {
    controller.onSearchSuccess(response);
    expect(controller.sendAnalyticsEvent.callCount).to.equal(2);
    expect(controller.sendAnalyticsEvent.args[0]).to.deep.equal([{name: `onSearchSuccess`, value: item.title}]);
    expect(controller.sendAnalyticsEvent.args[1]).to.deep.equal([{name: `Scrobble`, value: `start`}]);
    expect(controller.setActiveIcon.callCount).to.equal(1);
    expect(Scrobble.prototype.start.callCount).to.equal(1);
  });

  it(`showErrorNotification() calls chrome.runtime.sendMessage()`, () => {
    controller.showErrorNotification(`Foo`);
    expect(chrome.runtime.sendMessage.callCount).to.equal(1);
    expect(chrome.runtime.sendMessage.args[0]).to.deep.equal([{type: `showErrorNotification`, message: `Foo`}]);
  });

  it(`reportError() calls showErrorNotification() when status is 404`, async () => {
    chrome.i18n.getMessage.withArgs(`errorNotificationNotFound`).returns(`errorNotificationNotFound`);
    await controller.reportError(`Foo`, 404, responseError, {});
    expect(controller.showErrorNotification.callCount).to.equal(1);
    expect(controller.showErrorNotification.args[0]).to.deep.equal([`errorNotificationNotFound`]);
  });

  it(`reportError() calls showErrorNotification() and Rollbar.warning() when status is 0 and access_token is defined`, async () => {
    chrome.i18n.getMessage.withArgs(`errorNotificationServers`).returns(`errorNotificationServers`);
    chrome.storage.local.get.withArgs(null).yields({data: {access_token: `12345abcde`}});
    await controller.reportError(`Foo`, 0, responseError, {});
    expect(controller.showErrorNotification.callCount).to.equal(1);
    expect(controller.showErrorNotification.args[0]).to.deep.equal([`errorNotificationServers`]);
    expect(Rollbar.init.callCount).to.equal(1);
    expect(Rollbar.warning.callCount).to.equal(1);
    expect(Rollbar.warning.args[0]).to.deep.equal([`traktflix: Foo error`, {
      status: 0,
      response: responseError,
      options: {}
    }]);
  });

  it(`reportError() calls showErrorNotification() when status is 0 and access_token is undefined`, async () => {
    chrome.i18n.getMessage.withArgs(`errorNotificationLogin`).returns(`errorNotificationLogin`);
    chrome.storage.local.get.withArgs(null).yields({});
    await controller.reportError(`Foo`, 0, responseError, {});
    expect(controller.showErrorNotification.callCount).to.equal(1);
    expect(controller.showErrorNotification.args[0]).to.deep.equal([`errorNotificationLogin`]);
  });

  it(`reportError() calls showErrorNotification() and Rollbar.warning()`, async () => {
    chrome.i18n.getMessage.withArgs(`errorNotificationServers`).returns(`errorNotificationServers`);
    await controller.reportError(`Foo`, 200, responseError, {});
    expect(controller.showErrorNotification.callCount).to.equal(1);
    expect(controller.showErrorNotification.args[0]).to.deep.equal([`errorNotificationServers`]);
    expect(Rollbar.init.callCount).to.equal(1);
    expect(Rollbar.warning.callCount).to.equal(1);
    expect(Rollbar.warning.args[0]).to.deep.equal([`traktflix: Foo error`, {
      status: 200,
      response: responseError,
      options: {}
    }]);
  });

  it(`onSearchError() sends event to analytics`, () => {
    controller.onSearchError(401, responseError, {});
    expect(controller.sendAnalyticsEvent.callCount).to.equal(1);
    expect(controller.sendAnalyticsEvent.args[0]).to.deep.equal([{
      name: `onSearchError`,
      value: `401 - ${item.title}`
    }]);
    expect(controller.reportError.callCount).to.equal(1);
    expect(controller.reportError.args[0]).to.deep.equal([`Search`, 401, responseError, {}]);
  });

  it(`storeItem() sets scrobble to undefined when item is null`, () => {
    controller.storeItem(null);
    expect(controller.scrobble).to.be.undefined;
  });

  it(`storeItem() calls Search.find()`, () => {
    controller.storeItem(item);
    expect(Search.prototype.find.callCount).to.equal(1);
  });

  it(`onPlay() calls ItemParser.start() when item and scrobble are undefined`, () => {
    controller.item = null;
    controller.scrobble = undefined;
    controller.onPlay();
    expect(ItemParser.start.callCount).to.equal(1);
  });

  it(`onPlay() calls Scrobble.start()`, () => {
    controller.scrobble = scrobble;
    controller.onPlay();
    expect(controller.setActiveIcon.callCount).to.equal(1);
    expect(Scrobble.prototype.start.callCount).to.equal(1);
    expect(controller.sendAnalyticsEvent.callCount).to.equal(1);
    expect(controller.sendAnalyticsEvent.args[0]).to.deep.equal([{name: `Scrobble`, value: `start`}]);
  });

  it(`onPause() calls Scrobble.pause()`, () => {
    controller.scrobble = scrobble;
    controller.onPause();
    expect(controller.setInactiveIcon.callCount).to.equal(1);
    expect(Scrobble.prototype.pause.callCount).to.equal(1);
    expect(controller.sendAnalyticsEvent.callCount).to.equal(1);
    expect(controller.sendAnalyticsEvent.args[0]).to.deep.equal([{name: `Scrobble`, value: `pause`}]);
  });

  it(`onStop() calls Scrobble.stop()`, () => {
    controller.scrobble = scrobble;
    controller.onStop();
    expect(controller.setInactiveIcon.callCount).to.equal(1);
    expect(Scrobble.prototype.stop.callCount).to.equal(1);
    expect(controller.sendAnalyticsEvent.callCount).to.equal(1);
    expect(controller.sendAnalyticsEvent.args[0]).to.deep.equal([{name: `Scrobble`, value: `stop`}]);
    expect(controller.item).to.be.null;
    expect(controller.scrobble).to.be.undefined;
  });

  it(`getCurrentItem() returns movie object`, () => {
    controller.scrobble = scrobble;
    controller.item = item;
    expect(controller.getCurrentItem()).to.deep.equal({item: scrobble.item.movie});
  });

  it(`getCurrentItem() returns show object`, () => {
    const response = {episode: {title: `Chapter 31`}};
    const scrobble = new Scrobble({response: response, type: `episode`});
    const item = {type: `show`, title: `Chapter 31`, getScrubber: sinon.stub()};
    controller.scrobble = scrobble;
    controller.item = item;
    expect(controller.getCurrentItem()).to.deep.equal({item: scrobble.item.episode});
  });
});