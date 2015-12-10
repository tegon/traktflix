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
    expect(houseOfCards.title).toBe('House of Cards');
    expect(houseOfCards.type).toBe('show');
    expect(houseOfCards.scrubber).toEqual({});
    expect(houseOfCards.epTitle).toBe('Chapter 30');
    expect(houseOfCards.season).toBe(3);
    expect(houseOfCards.episode).toBe(4);
  });

  it('returns the full title', function() {
    var starWars = new Item({ title: 'Star Wars: The Clone Wars', type: 'show',
      scrubber: {}, epTitle: 'Ambush', season: 1, episode: 1 });
    var theOffice = new Item({ title: 'The Office (U.S.)', type: 'show',
      scrubber: {}, epTitle: 'Pilot', season: 1, episode: 1 });
    expect(starWars.title).toBe('"Star Wars: The Clone Wars"');
    expect(theOffice.title).toBe('The Office (US)');
  });

  it('getScrubber must be a number', function() {
    expect(rocky.getScrubber()).toBe(25.22);
  });
});