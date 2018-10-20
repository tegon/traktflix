import ChromeStorage from './ChromeStorage';
import Settings from '../settings';

class Request {
  async _send(options) {
    const data = await ChromeStorage.get(`data`);
    const xhr = new XMLHttpRequest();
    xhr.open(options.method, options.url, true);
    xhr.setRequestHeader(`Content-Type`, `application/json`);
    xhr.setRequestHeader(`trakt-api-key`, Settings.clientId);
    xhr.setRequestHeader(`trakt-api-version`, Settings.apiVersion);
    if (data.data && data.data.access_token) {
      xhr.setRequestHeader(`Authorization`, `Bearer ${data.data.access_token}`);
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
    xhr.send(JSON.stringify(options.params));
  }

  send(options) {
    this._send(options);
  }
}

const request = new Request();
export default request;