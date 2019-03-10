import Settings from '../settings';
import BrowserStorage from './BrowserStorage';

class Request {
  async _send(options) {
    const storage = await BrowserStorage.get(`data`);
    const xhr = new XMLHttpRequest();
    xhr.open(options.method, options.url, true);
    xhr.setRequestHeader(`Content-Type`, typeof options.params === `string` ? `application/x-www-form-urlencoded` : `application/json`);
    xhr.setRequestHeader(`trakt-api-key`, Settings.clientId);
    xhr.setRequestHeader(`trakt-api-version`, Settings.apiVersion);
    if (storage.data && storage.data.access_token) {
      xhr.setRequestHeader(`Authorization`, `Bearer ${storage.data.access_token}`);
    }
    xhr.timeout = 10000; // increase the timeout for trakt.tv calls
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 400) {
        options.success.call(this, this.response);
      } else {
        options.error.call(this, this.status, this.responseText, {
          url: options.url,
          method: options.method,
          params: options.params
        });
      }
    };
    xhr.onerror = function () {
      options.error.call(this, this.status, this.responseText, {
        url: options.url,
        method: options.method,
        params: options.params
      });
    };
    xhr.send(typeof options.params === `string` ? options.params : JSON.stringify(options.params));
  }

  send(options) {
    // noinspection JSIgnoredPromiseFromCall
    return this._send(options);
  }

  /**
   * Does the same thing as send(), but meant to be used with async / await and try...catch instead of success / error callbacks.
   * Using send():
   *   send({ url: ..., success: response => { ... }, error: (status, response) => { ... } });
   * Using sendAndWait():
   *   async function () {
   *     try {
   *       response = await sendAndWait({ url: ... });
   *     } catch (error) {
   *       console.log(error.status, error.response);
   *     }
   *     // The benefit of using this method is that any code that needs to run after the request can be put here and it will run sequentially.
   *   }
   * @param {*} options
   */
  sendAndWait(options) {
    return new Promise((resolve, reject) => {
      options.success = response => resolve(response);
      options.error = (status, response, options) => reject({ status, response, options });
      this._send(options);
    });
  }
}

const request = new Request();
export default request;