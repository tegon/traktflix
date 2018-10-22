import Item from './Item';

class ItemParser {
  isReady() {
    const scrubber = document.querySelector(`.PlayerControls--control-element.progress-control`);
    return scrubber !== null;
  }

  parse(callback) {
    const playerStatus = document.querySelector(`.video-title .ellipsize-text`);
    const type = playerStatus.children.length > 1 ? `show` : `movie`;
    let mainTitle;
    let item;
    if (type === `show`) {
      mainTitle = playerStatus.querySelector(`h4`).textContent;
      const episodeInfo = playerStatus.querySelectorAll(`span`);
      const episode = episodeInfo[0].textContent.match(/([CS])(\d+?):E(\d+?)/);
      const isCollection = episode[1] === `C`;
      const season = episode[2];
      const number = episode[3];
      const title = episodeInfo[1].textContent;
      item = new Item({
        episode: number,
        epTitle: title,
        isCollection,
        season,
        title: mainTitle,
        type
      });
    } else {
      mainTitle = playerStatus.textContent;
      item = new Item({title: mainTitle, type});
    }
    callback.call(this, item);
  }

  start(callback) {
    let readyTimeout;
    if (this.isReady()) {
      this.parse(callback);
    } else {
      readyTimeout = setTimeout(() => {
        if (this.isReady()) {
          clearTimeout(readyTimeout);
          this.parse(callback);
        } else {
          this.start(callback);
        }
      }, 500);
    }
  }
}

const itemParser = new ItemParser();
export default itemParser;