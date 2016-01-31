var ItemParser = require('../../app/scripts/src/content/item-parser.js');
var Item = require('../../app/scripts/src/content/item.js');
var callback = sinon.spy();

describe('ItemParser', function() {
  beforeEach(function() {
    document.body.innerHTML = '';
    callback.reset();
  });

  it('isReady returns false when player is not on page', function() {
    expect(ItemParser.isReady()).toBe(false);
  });

  it('isReady returns true when player is on page', function() {
    renderPlayer('show');
    expect(ItemParser.isReady()).toBe(true);
  });

  it('waits until player arrives on page', function(done) {
    ItemParser.start(callback);
    renderPlayer('show');
    setTimeout(function() {
      expect(ItemParser.isReady()).toBe(true);
      expect(callback.callCount).toBe(1);
      done();
    }, 500);
  });

  it('isReady returns false after timeout', function(done) {
    ItemParser.start(callback);
    setTimeout(function() {
      expect(ItemParser.isReady()).toBe(false);
      expect(callback.callCount).toBe(0);
      done();
    }, 500);
  });

  it('when player has episodes selector, an show item is returned', function() {
    renderPlayer('show');
    ItemParser.start(callback);
    expect(callback.callCount).toBe(1);

    var item = new Item({
      epTitle: 'Capítulo 31',
      title: 'House of Cards',
      season: '3',
      episode: '5',
      type: 'show'
    });
    expect(callback.getCall(0).args).toEqual([item]);
  });

  it('when player does not have episodes selector, an movie item is returned', function() {
    renderPlayer('movie');
    ItemParser.start(callback);
    expect(callback.callCount).toBe(1);

    var item = new Item({
      title: 'Rocky um Lutador',
      type: 'movie'
    });
    expect(callback.getCall(0).args).toEqual([item]);
  });
});
