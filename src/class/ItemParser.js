import NetflixApiUtils from './NetflixApiUtils';

class ItemParser {
  constructor() {
    this.id = null;
  }

  // For testing purposes.
  getLocation() {
    return location.href;
  }

  isReady() {
    let isReady = false;

    const session = NetflixApiUtils.getSession();

    if (session) {
      this.id = session.videoId.toString();

      isReady = true;
    } else {
      const matches = this.getLocation().match(/watch\/(\d+)/);

      if (matches) {
        this.id = matches[1];

        isReady = true;
      }
    }

    return isReady;
  }

  async checkIsReady(resolve) {
    if (this.isReady()) {
      const data = await NetflixApiUtils.getMetadata(this.id);
      resolve(data);
    } else {
      setTimeout(this.checkIsReady.bind(this), 500, resolve);
    }
  }

  start() {
    return new Promise(resolve => this.checkIsReady(resolve));
  }
}

const itemParser = new ItemParser();
export default itemParser;