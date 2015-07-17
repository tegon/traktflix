jest.dontMock('../app/scripts/src/item');
var Item = require('../app/scripts/src/item');

describe('Item', function() {
  it('creates a new movie', function() {
    var rocky = new Item({ title: 'Rocky', type: 'movie', scrubber: {} });
    expect(rocky.title).toBe('Rocky');
    expect(rocky.type).toBe('movie');
    expect(rocky.scrubber).toEqual({});
  });

  it('creates a new show', function() {
    var houseOfCards = new Item({ title: 'House of Cards', type: 'show',
      scrubber: {}, epTitle: 'Chapter 30', season: 3, episode: 4 });
    expect(houseOfCards.title).toBe('House of Cards');
    expect(houseOfCards.type).toBe('show');
    expect(houseOfCards.scrubber).toEqual({});
    expect(houseOfCards.epTitle).toBe('Chapter 30');
    expect(houseOfCards.season).toBe(3);
    expect(houseOfCards.episode).toBe(4);
  });

  it('scrobble must be a number', function() {
    var rocky = new Item({
      title: 'Rocky', type: 'movie', scrubber: { style: { width: '25.22222%' } }
    });
    expect(rocky.scrubber).toEqual({ style: { width: '25.22222%' } });
    expect(rocky.getScrubber()).toBe(25.22);
  });
});