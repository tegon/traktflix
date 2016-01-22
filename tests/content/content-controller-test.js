var ContentController = require('../../app/scripts/src/content/content-controller.js');
var ItemParser = require('../../app/scripts/src/content/item-parser.js');
var Scrobble = require('../../app/scripts/src/content/scrobble.js');
var Search = require('../../app/scripts/src/content/search.js');
var controller = new ContentController();
var response = { movie: { title: 'Rocky' } };
var item = { type: 'movie', title: 'Rocky', getScrubber: sinon.stub() };
var scrobble = new Scrobble({ response: response, type: 'movie' });
controller.item = item;

describe('ContentController', function() {
  beforeEach(function() {
    sinon.spy(controller, 'sendAnalyticsEvent');
    sinon.spy(controller, 'setActiveIcon');
    sinon.spy(controller, 'setInactiveIcon');
    sinon.stub(ItemParser, 'start');
    sinon.stub(Scrobble.prototype, 'start');
    sinon.stub(Scrobble.prototype, 'pause');
    sinon.stub(Scrobble.prototype, 'stop');
    sinon.stub(Search.prototype, 'find');
  });

  afterEach(function() {
    controller.sendAnalyticsEvent.restore();
    controller.setActiveIcon.restore();
    controller.setInactiveIcon.restore();
    ItemParser.start.restore();
    Scrobble.prototype.start.restore();
    Scrobble.prototype.pause.restore();
    Scrobble.prototype.stop.restore();
    Search.prototype.find.restore();
  });

  it('onSearchSuccess creates scrobble from response', function() {
    controller.onSearchSuccess(response);
    expect(controller.setActiveIcon.callCount).toBe(1);
    expect(controller.sendAnalyticsEvent.callCount).toBe(2);
    expect(controller.scrobble.start.callCount).toBe(1);
  });

  it('onSearchError sends event to analytics', function() {
    controller.onSearchError(401, '{ "errors": "Unauthorized" }');
    expect(controller.sendAnalyticsEvent.callCount).toBe(1);
    expect(controller.sendAnalyticsEvent.getCall(0).args).toEqual([{
      name: 'onSearchError', value: '401 - Rocky'
    }]);
  });

  it('onScrobbleSuccess sends event to analytics', function() {
    controller.onScrobbleSuccess();
    expect(controller.sendAnalyticsEvent.callCount).toBe(1);
    expect(controller.sendAnalyticsEvent.getCall(0).args).toEqual([{
      name: 'Scrobble', value: 'onSuccess'
    }]);
  });

  it('onScrobbleError sends event to analytics', function() {
    controller.onScrobbleError();
    expect(controller.sendAnalyticsEvent.callCount).toBe(1);
    expect(controller.sendAnalyticsEvent.getCall(0).args).toEqual([{
      name: 'Scrobble', value: 'onError'
    }]);
  });

  it('when item is null, storeItem sets scrobble to undefined', function() {
    controller.storeItem(null);
    expect(controller.scrobble).toBe(undefined);
  });

  it('storeItem calls Search.find', function() {
    controller.storeItem(item);
    expect(Search.prototype.find.callCount).toBe(1);
  });

  it('onPlay calls scrobble.start', function() {
    controller.scrobble = scrobble;
    controller.onPlay();
    expect(controller.setActiveIcon.callCount).toBe(1);
    expect(controller.sendAnalyticsEvent.callCount).toBe(1);
    expect(controller.sendAnalyticsEvent.getCall(0).args).toEqual([{
      name: 'Scrobble', value: 'start'
    }]);
    expect(controller.scrobble.start.callCount).toBe(1);
  });

  it('onPlay calls ItemParser.start', function() {
    controller.scrobble = undefined;
    controller.item = null;
    controller.onPlay();
    expect(ItemParser.start.callCount).toBe(1);
  });

  it('onPause calls scrobble.pause', function() {
    controller.scrobble = scrobble;
    controller.onPause();
    expect(controller.setInactiveIcon.callCount).toBe(1);
    expect(controller.sendAnalyticsEvent.callCount).toBe(1);
    expect(controller.sendAnalyticsEvent.getCall(0).args).toEqual([{
      name: 'Scrobble', value: 'pause'
    }]);
    expect(controller.scrobble.pause.callCount).toBe(1);
  });

  it('onStop calls scrobble.stop', function() {
    controller.scrobble = scrobble;
    controller.onStop();
    expect(controller.setInactiveIcon.callCount).toBe(1);
    expect(Scrobble.prototype.stop.callCount).toBe(1);
    expect(controller.sendAnalyticsEvent.callCount).toBe(1);
    expect(controller.sendAnalyticsEvent.getCall(0).args).toEqual([{
      name: 'Scrobble', value: 'stop'
    }]);
    expect(controller.item).toBe(null);
    expect(controller.scrobble).toBe(undefined);
  });

  it('getCurrentItem returns movie object', function() {
    controller.scrobble = scrobble;
    controller.item = item;
    expect(controller.getCurrentItem()).toEqual({ item: scrobble.item.movie  });
  });

  it('getCurrentItem returns episode object', function() {
    var response = { episode: { title: 'Chapter 31' } };
    var item = { type: 'show', title: 'Chapter 31', getScrubber: sinon.stub() };
    var scrobble = new Scrobble({ response: response, type: 'episode' });
    controller.scrobble = scrobble;
    controller.item = item;
    expect(controller.getCurrentItem()).toEqual({ item: scrobble.item.episode  });
  });
});