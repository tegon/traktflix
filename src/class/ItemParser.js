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
    const matches = this.getLocation().match(/watch\/(\d+)/);
    if (matches) {
      this.id = matches[1];
      return true;
    }
    return false;
  }

  parse(callback) {
    NetflixApiUtils.getMetadata(this.id)
      .then(callback);
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