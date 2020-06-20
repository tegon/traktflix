import Settings from '../settings';
import Request from './Request';

export default class Search {
  constructor(options) {
    this.item = options.item;
    this.url = `${Settings.apiUri}/search`;
    this.showsUrl = `${Settings.apiUri}/shows`;
  }

  getUrl() {
    return `${this.url}/${this.item.type}?query=${encodeURIComponent(this.item.title)}`;
  }

  findItem(options) {
    // noinspection JSIgnoredPromiseFromCall
    const _this = this;
    Request.send({
      method: `GET`,
      url: this.getUrl(),
      success: function (response) {
        let data = JSON.parse(response);
        if (data.length > 1 && _this.item && _this.item.type === `movie`) {
          // Get exact match if there are multiple movies with the same name by checking the year.
          data = data.filter(item => item.movie.title === _this.item.title && item.movie.year === _this.item.year)[0];
        } else {
          data = data[0];
        }
        if (typeof data === `undefined`) {
          options.error.call(this, 404);
        } else {
          options.success.call(this, data);
        }
      },
      error: function (status, response, opts) {
        options.error.call(this, status, response, opts);
      }
    });
  }

  getEpisodeUrl(slug) {
    let url;
    if (this.item.isCollection && this.item.epTitle) {
      url = `${this.url}/episode?query=${encodeURIComponent(this.item.epTitle)}`;
    } else if (this.item.episode) {
      url = `${this.showsUrl}/${slug}/seasons/${this.item.season}/episodes/${this.item.episode}?extended=images`;
    } else {
      url = `${this.showsUrl}/${slug}/seasons/${this.item.season}?extended=images`;
    }
    return url;
  }

  formatEpisodeTitle(title) {
    return title
      .toLowerCase()
      .replace(/(^|\s)(a|an|the)(\s)/g, `$1$3`)
      .replace(/\s/g, ``);
  }

  findEpisodeByTitle(show, response, options) {
    const episodes = JSON.parse(response);
    let foundEpisode = null;
    for (let episode of episodes) {
      if (episode.type === `episode`) {
        episode = episode.episode;
      }
      if (this.item.epTitle && episode.title && this.formatEpisodeTitle(episode.title) === this.formatEpisodeTitle(this.item.epTitle)) {
        foundEpisode = episode;
        break;
      }
    }
    if (foundEpisode) {
      options.success.call(this, Object.assign(foundEpisode, show));
    } else {
      options.error.call(this, 404, `Episode not found.`, {show: show, item: this.item});
    }
  }

  findEpisode(options) {
    const _this = this;
    this.findItem({
      success: function (response) {
        // noinspection JSIgnoredPromiseFromCall
        Request.send({
          method: `GET`,
          url: _this.getEpisodeUrl(response.show.ids.slug),
          success: function (resp) {
            if ((this.item.isCollection && this.item.epTitle) || !this.item.episode) {
              _this.findEpisodeByTitle(response, resp, options);
            } else {
              options.success.call(this, Object.assign(JSON.parse(resp), response));
            }
          }.bind(this),
          error: function (st, resp, opts) {
            options.error.call(this, st, resp, opts);
          }
        });
      }.bind(this),
      error: function (status, response, opts) {
        options.error.call(this, status, response, opts);
      }
    });
  }

  find(options) {
    if (this.item.type === `show`) {
      this.findEpisode(options);
    } else {
      this.findItem(options);
    }
  }
}
