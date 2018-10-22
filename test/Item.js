import Item from '../src/class/Item';

const antMan = new Item({
  title: `Ant-Man`, type: `movie`
});
const theFlash = new Item({
  episode: 1,
  epTitle: `Pilot`,
  season: 1,
  title: `The Flash`,
  type: `show`
});

describe(`Item`, () => {
  it(`creates a new movie`, () => {
    expect(antMan.title).toBe(`Ant-Man`);
    expect(antMan.type).toBe(`movie`);
  });

  it(`creates a new show`, () => {
    expect(theFlash.title).toBe(`The Flash`);
    expect(theFlash.type).toBe(`show`);
    expect(theFlash.epTitle).toBe(`Pilot`);
    expect(theFlash.season).toBe(1);
    expect(theFlash.episode).toBe(1);
  });

  it(`returns the full title`, () => {
    const starWars = new Item({
      episode: 1,
      epTitle: `Ambush`,
      title: `Star Wars: The Clone Wars`,
      type: `show`,
      season: 1
    });
    const theOffice = new Item({
      episode: 1,
      epTitle: `Pilot`,
      title: `The Office (U.S.)`,
      type: `show`,
      season: 1
    });
    expect(starWars.title).toBe(`"Star Wars: The Clone Wars"`);
    expect(theOffice.title).toBe(`The Office (US)`);
  });
});
