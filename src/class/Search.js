import Request from './Request';
import Settings from '../settings';

export default class Search {
  constructor(options) {
    this.item = options.item;
    this.url = `${Settings.apiUri}/search`;
    this.showsUrl = `${Settings.apiUri}/shows`;
  }

  getUrl() {
    return `${this.url}/${this.item.type}?query=${encodeURIComponent(this.item.title)}`;
  }

  getEpisodeUrl(slug) {
    if (this.item.isCollection && this.item.epTitle) {
      return `${this.url}/episode?query=${encodeURIComponent(this.item.epTitle)}`;
    }
    if (this.item.episode) {
      return `${this.showsUrl}/${slug}/seasons/${this.item.season}/episodes/${this.item.episode}?extended=images`;
    }
    return `${this.showsUrl}/${slug}/seasons/${this.item.season}?extended=images`;
  }

  findItem(options) {
    // noinspection JSIgnoredPromiseFromCall
    return Request.send({
      method: `GET`,
      url: this.getUrl(),
      success: function (response) {
        const data = JSON.parse(response)[0];
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

  formatEpisodeTitle(title) {
    return title
      .toLowerCase()
      .replace(/(^|\s)(a|an|the)(\s)/g, `$1$3`)
      .replace(/\s/g, ``);
  }

  findEpisodeByTitle(show, response, options) {
    const episodes = JSON.parse(response);
    console.log(this.item.epTitle);
    console.log(episodes);
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
    let resolve;
    const secondPromise = new Promise(_resolve => resolve = _resolve);
    const _this = this;
    return [this.findItem({
      success: function (response) {
        // noinspection JSIgnoredPromiseFromCall
        Request.send({
          method: `GET`,
          url: _this.getEpisodeUrl(response.show.ids.slug),
          success: function (resp) {
            if (this.item.isCollection && this.item.epTitle) {
              _this.findEpisodeByTitle(response, resp, options);
            } else  if (this.item.episode) {
              options.success.call(this, Object.assign(JSON.parse(resp), response));
            } else {
              _this.findEpisodeByTitle(response, resp, options);
            }
          }.bind(this),
          error: function (st, resp, opts) {
            options.error.call(this, st, resp, opts);
          }
        }).then(resolve);
      }.bind(this),
      error: function (status, response, opts) {
        options.error.call(this, status, response, opts);
        resolve();
      }
    }), secondPromise];
  }

  find(options) {
    if (this.item.type === `show`) {
      this.findEpisode(options);
    } else {
      this.findItem(options);
    }
  }
}