var ItemParser = require('../../app/scripts/src/content/item-parser.js');
var Item = require('../../app/scripts/src/content/item.js');
var callback = sinon.spy();

describe('Search', function() {
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

  it('when player has episodes selector, an show item is returned', function() {
    renderPlayer('show');
    ItemParser.start(callback);
    expect(callback.callCount).toBe(1);
    var scrubber = document.querySelector('.player-scrubber-progress-completed');
    var item = new Item({
      epTitle: 'Capítulo 31',
      scrubber: scrubber,
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
    var scrubber = document.querySelector('.player-scrubber-progress-completed');
    var item = new Item({
      scrubber: scrubber,
      title: 'Rocky um Lutador',
      type: 'movie'
    });
    expect(callback.getCall(0).args).toEqual([item]);
  });

  it('it will wait until player is on page to call parse function', function(done) {
    expect(ItemParser.isReady()).toBe(false);
    ItemParser.start(callback);
    expect(callback.callCount).toBe(0);
    renderPlayer('movie');
    expect(ItemParser.isReady()).toBe(true);
    setTimeout(function() {
      expect(callback.callCount).toBe(1);
      done();
    }, 500);
  });
});