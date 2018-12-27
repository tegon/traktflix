import Item from '../src/class/Item';

describe(`Item`, () => {
  it(`creates a new show`, () => {
    const theFlash = new Item({
      episode: 1,
      epTitle: `Pilot`,
      season: 1,
      title: `The Flash`,
      type: `show`
    });
    expect(theFlash.episode).to.equal(1);
    expect(theFlash.epTitle).to.equal(`Pilot`);
    expect(theFlash.isCollection).to.be.undefined;
    expect(theFlash.season).to.equal(1);
    expect(theFlash.title).to.equal(`The Flash`);
    expect(theFlash.type).to.equal(`show`);
    expect(theFlash.year).to.be.undefined;
  });

  it(`creates a new movie`, () => {
    const antMan = new Item({
      title: `Ant-Man`,
      type: `movie`,
      year: 2015
    });
    expect(antMan.title).to.equal(`Ant-Man`);
    expect(antMan.type).to.equal(`movie`);
    expect(antMan.year).to.equal(2015);
  });

  it(`returns the correct title`, () => {
    const starWars = new Item({
      episode: 1,
      epTitle: `Ambush`,
      season: 1,
      title: `Star Wars: The Clone Wars`,
      type: `show`
    });
    const theOffice = new Item({
      episode: 1,
      epTitle: `Pilot`,
      season: 1,
      title: `The Office (U.S.)`,
      type: `show`
    });
    expect(starWars.title).to.equal(`"Star Wars: The Clone Wars"`);
    expect(theOffice.title).to.equal(`The Office (US)`);
  });
});
