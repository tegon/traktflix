var Item = require('../../app/scripts/src/content/item');
var rocky = new Item({
  title: 'Rocky', type: 'movie', scrubber: { style: { width: '25.22222%' } }
});
var houseOfCards = new Item({ title: 'House of Cards', type: 'show',
  scrubber: {}, epTitle: 'Chapter 30', season: 3, episode: 4 });

describe('Item', function() {
  it('creates a new movie', function() {
    expect(rocky.title).toBe('Rocky');
    expect(rocky.type).toBe('movie');
    expect(rocky.scrubber).toEqual({ style: { width: '25.22222%' } });
  });

  it('creates a new show', function() {
    expect(houseOfCards.title).toBe('House of Cards (US)');
    expect(houseOfCards.type).toBe('show');
    expect(houseOfCards.scrubber).toEqual({});
    expect(houseOfCards.epTitle).toBe('Chapter 30');
    expect(houseOfCards.season).toBe(3);
    expect(houseOfCards.episode).toBe(4);
  });

  it('getScrubber must be a number', function() {
    expect(rocky.getScrubber()).toBe(25.22);
  });
});