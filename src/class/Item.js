// This was necessary to prioritize Star Wars: The Clone Wars (2008) over Star Wars: Clone Wars (2003).
// I left this object because it could be useful for other movies/shows.
const correctTitles = {
  [`Star Wars: The Clone Wars`]: `"Star Wars: The Clone Wars"`,
  [`The Office (U.S.)`]: `The Office (US)`,
  [`The Blind Side`]: `"The Blind Side"`,
  [`The Avengers`]: `"The Avengers"`,
  [`The Seven Deadly Sins`]: `"The Seven Deadly Sins"`,
  [`Young and Hungry`]: `"Young and Hungry"`,
  [`The 100`]: `"The 100"`,
  [`The House of Cards Trilogy (BBC)`]: `The House of Cards`,
  [`Shameless (U.S.)`]: `Shameless`,
  [`Dynasty`]: `Dynasty reboot`
};

export default class Item {
  constructor(options) {
    this.title = correctTitles[options.title] || options.title;
    this.type = options.type;
    this.year = options.year;
    if (this.type === `show`) {
      this.isCollection = options.isCollection;
      this.epTitle = options.epTitle;
      this.season = options.season;
      this.episode = options.episode;
    }
  }
}