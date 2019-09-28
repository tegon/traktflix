import browser from 'sinon-chrome';
import sinon from 'sinon';
import ItemParser from '../../src/class/ItemParser';
import Rollbar from '../../src/class/Rollbar';
import Search from '../../src/class/Search';
import ContentController from '../../src/class/content/ContentController';
import Scrobble from '../../src/class/content/Scrobble';

window.browser = browser;

const controller = new ContentController();
const response = {movie: {title: `Rocky`}};
const scrobble = new Scrobble({response: response, type: `movie`});
const item = {type: `movie`, title: `Rocky`, getScrubber: sinon.stub()};
const responseError = {errors: `Unauthorized`};
controller.item = item;

browser.flush();
delete window.browser;

describe(`ContentController`, () => {
  before(() => {
    window.browser = browser;
  });

  afterEach(() => {
    browser.flush();
  });

  after(() => {
    browser.flush();
    delete window.browser;
  });

  it(`constructor() calls ItemParser.start() when user is watching something`, () => {
    sinon.stub(ItemParser, `start`).resolves(null);
    const url = `/watch/12345678`;
    sinon.stub(ContentController.prototype, `getLocation`).returns(url);
    new ContentController();
    expect(ContentController.prototype.getLocation.callCount).to.equal(1);
    expect(ContentController.prototype.getLocation.returnValues[0]).to.equal(url);
    expect(ItemParser.start.callCount).to.equal(1);
    ContentController.prototype.getLocation.restore();
    ItemParser.start.restore();
  });

  it(`constructor() does nothing when user is not watching something`, () => {
    sinon.stub(ItemParser, `start`).resolves(null);
    const url = `/browse`;
    sinon.stub(ContentController.prototype, `getLocation`).returns(url);
    new ContentController();
    expect(ContentController.prototype.getLocation.callCount).to.equal(1);
    expect(ContentController.prototype.getLocation.returnValues[0]).to.equal(url);
    expect(ItemParser.start.callCount).to.equal(0);
    ContentController.prototype.getLocation.restore();
    ItemParser.start.restore();
  });

  it(`setActiveIcon() calls browser.runtime.sendMessage()`, () => {
    controller.setActiveIcon();
    expect(browser.runtime.sendMessage.callCount).to.equal(1);
    expect(browser.runtime.sendMessage.args[0]).to.deep.equal([{type: `setActiveIcon`}]);
  });

  it(`setInactiveIcon() calls browser.runtime.sendMessage()`, () => {
    controller.setInactiveIcon();
    expect(browser.runtime.sendMessage.callCount).to.equal(1);
    expect(browser.runtime.sendMessage.args[0]).to.deep.equal([{type: `setInactiveIcon`}]);
  });

  it(`onScrobbleError() reports error`, () => {
    sinon.spy(controller, `reportError`);
    controller.onScrobbleError(401, responseError, {});
    expect(controller.reportError.callCount).to.equal(1);
    expect(controller.reportError.args[0]).to.deep.equal([`Scrobble`, 401, responseError, {}]);
    controller.reportError.restore();
  });

  it(`onSearchSuccess() creates scrobble from response`, () => {
    sinon.spy(controller, `setActiveIcon`);
    sinon.stub(Scrobble.prototype, `start`);
    controller.onSearchSuccess(response);
    expect(controller.setActiveIcon.callCount).to.equal(1);
    expect(Scrobble.prototype.start.callCount).to.equal(1);
    Scrobble.prototype.start.restore();
    controller.setActiveIcon.restore();
  });

  it(`showErrorNotification() calls browser.runtime.sendMessage()`, () => {
    controller.showErrorNotification(`Foo`);
    expect(browser.runtime.sendMessage.callCount).to.equal(1);
    expect(browser.runtime.sendMessage.args[0]).to.deep.equal([{type: `showErrorNotification`, message: `Foo`}]);
  });

  it(`reportError() calls showErrorNotification() when status is 404`, async () => {
    sinon.spy(controller, `showErrorNotification`);
    browser.i18n.getMessage.withArgs(`errorNotificationNotFound`).returns(`errorNotificationNotFound`);
    await controller.reportError(`Foo`, 404, responseError, {});
    expect(controller.showErrorNotification.callCount).to.equal(1);
    expect(controller.showErrorNotification.args[0]).to.deep.equal([`errorNotificationNotFound`]);
    controller.showErrorNotification.restore();
  });

  it(`reportError() calls showErrorNotification() and Rollbar.warning() when status is 0 and access_token is defined`, async () => {
    sinon.stub(Rollbar, `init`);
    sinon.stub(Rollbar, `warning`);
    sinon.spy(controller, `showErrorNotification`);
    browser.i18n.getMessage.withArgs(`errorNotificationServers`).returns(`errorNotificationServers`);
    browser.storage.local.get.withArgs(`data`).resolves({data: {access_token: `12345abcde`}});
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
    controller.showErrorNotification.restore();
    Rollbar.warning.restore();
    Rollbar.init.restore();
  });

  it(`reportError() calls showErrorNotification() when status is 0 and access_token is undefined`, async () => {
    sinon.spy(controller, `showErrorNotification`);
    browser.i18n.getMessage.withArgs(`errorNotificationLogin`).returns(`errorNotificationLogin`);
    browser.storage.local.get.withArgs(`data`).resolves({});
    await controller.reportError(`Foo`, 0, responseError, {});
    expect(controller.showErrorNotification.callCount).to.equal(1);
    expect(controller.showErrorNotification.args[0]).to.deep.equal([`errorNotificationLogin`]);
    controller.showErrorNotification.restore();
  });

  it(`reportError() calls showErrorNotification() and Rollbar.warning()`, async () => {
    sinon.stub(Rollbar, `init`);
    sinon.stub(Rollbar, `warning`);
    sinon.spy(controller, `showErrorNotification`);
    browser.i18n.getMessage.withArgs(`errorNotificationServers`).returns(`errorNotificationServers`);
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
    controller.showErrorNotification.restore();
    Rollbar.warning.restore();
    Rollbar.init.restore();
  });

  it(`onSearchError() reports error`, () => {
    sinon.spy(controller, `reportError`);
    controller.onSearchError(401, responseError, {});
    expect(controller.reportError.callCount).to.equal(1);
    expect(controller.reportError.args[0]).to.deep.equal([`Search`, 401, responseError, {}]);
    controller.reportError.restore();
  });

  it(`storeItem() sets scrobble to undefined when item is null`, () => {
    controller.storeItem(null);
    expect(controller.scrobble).to.be.undefined;
  });

  it(`storeItem() calls Search.find()`, () => {
    sinon.stub(Search.prototype, `find`);
    controller.storeItem(item);
    expect(Search.prototype.find.callCount).to.equal(1);
    Search.prototype.find.restore();
  });

  it(`onPlay() calls ItemParser.start() when item and scrobble are undefined`, () => {
    sinon.stub(ItemParser, `start`).resolves(null);
    controller.item = null;
    controller.scrobble = undefined;
    controller.onPlay();
    expect(ItemParser.start.callCount).to.equal(1);
    ItemParser.start.restore();
  });

  it(`onPlay() calls Scrobble.start()`, () => {
    sinon.spy(controller, `setActiveIcon`);
    sinon.stub(Scrobble.prototype, `start`);
    controller.scrobble = scrobble;
    controller.onPlay();
    expect(controller.setActiveIcon.callCount).to.equal(1);
    expect(Scrobble.prototype.start.callCount).to.equal(1);
    Scrobble.prototype.start.restore();
    controller.setActiveIcon.restore();
  });

  it(`onPause() does nothing when scrobble is undefined`, () => {
    sinon.spy(controller, `setInactiveIcon`);
    sinon.stub(Scrobble.prototype, `pause`);
    controller.scrobble = undefined;
    controller.onPause();
    expect(controller.setInactiveIcon.callCount).to.equal(0);
    expect(Scrobble.prototype.pause.callCount).to.equal(0);
    Scrobble.prototype.pause.restore();
    controller.setInactiveIcon.restore();
  });

  it(`onPause() calls Scrobble.pause()`, () => {
    sinon.spy(controller, `setInactiveIcon`);
    sinon.stub(Scrobble.prototype, `pause`);
    controller.scrobble = scrobble;
    controller.onPause();
    expect(controller.setInactiveIcon.callCount).to.equal(1);
    expect(Scrobble.prototype.pause.callCount).to.equal(1);
    Scrobble.prototype.pause.restore();
    controller.setInactiveIcon.restore();
  });

  it(`onStop() only calls storeItem() when scrobble is undefined`, () => {
    sinon.spy(controller, `setInactiveIcon`);
    sinon.stub(Scrobble.prototype, `stop`);
    controller.scrobble = undefined;
    controller.onStop();
    expect(controller.setInactiveIcon.callCount).to.equal(0);
    expect(Scrobble.prototype.stop.callCount).to.equal(0);
    expect(controller.item).to.be.null;
    expect(controller.scrobble).to.be.undefined;
    Scrobble.prototype.stop.restore();
    controller.setInactiveIcon.restore();
  });

  it(`onStop() calls Scrobble.stop()`, () => {
    sinon.spy(controller, `setInactiveIcon`);
    sinon.stub(Scrobble.prototype, `stop`);
    controller.scrobble = scrobble;
    controller.onStop();
    expect(controller.setInactiveIcon.callCount).to.equal(1);
    expect(Scrobble.prototype.stop.callCount).to.equal(1);
    expect(controller.item).to.be.null;
    expect(controller.scrobble).to.be.undefined;
    Scrobble.prototype.stop.restore();
    controller.setInactiveIcon.restore();
  });

  it(`getCurrentItem() returns null when item and scrobble are undefined`, () => {
    controller.scrobble = undefined;
    controller.item = undefined;
    expect(controller.getCurrentItem()).to.be.null;
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