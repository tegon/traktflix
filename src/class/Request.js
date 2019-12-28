import Settings from '../settings';
import BrowserStorage from './BrowserStorage';
import Shared from './Shared';

class Request {
  async _send(options) {
    if (!Shared.isBackgroundPage() && !options.url.match(location.host)) {
      try {
        const response = await browser.runtime.sendMessage({ type: `request`, options: JSON.stringify(options) });
        if (response.error) {
          throw response;
        }
        options.success(response);
      } catch (error) {
        options.error(error.status, error.responseText, error.options);
      }
      return;
    }

    const storage = await BrowserStorage.get(`data`);

    const headers = {};

    headers[`Content-Type`] = typeof options.params === `string` ? `application/x-www-form-urlencoded` : `application/json`;
    headers[`trakt-api-key`] = Settings.clientId;
    headers[`trakt-api-version`] = Settings.apiVersion;

    if (storage.data && storage.data.access_token) {
      headers[`Authorization`] = `Bearer ${storage.data.access_token}`;
    }

    let fetchObj = window.fetch;
    let fetchOptions = {
      body: typeof options.params === `string` ? options.params : JSON.stringify(options.params),
      headers,
      method: options.method,
    };

    if (window.wrappedJSObject) {
      // Firefox wraps content script elements, so if we want to make the request from a container, we have to unwrap them
      fetchObj = XPCNativeWrapper(window.wrappedJSObject.fetch);
      window.wrappedJSObject.fetchOptions = cloneInto(fetchOptions, window);
      fetchOptions = XPCNativeWrapper(window.wrappedJSObject.fetchOptions);
    }

    let response = {};
    let responseText = '';

    try {
      response = await fetchObj(options.url, fetchOptions);
      responseText = await response.text();

      if (response.status >= 200 && response.status < 400) {
        options.success.call(this, responseText);
      } else {
        options.error.call(this, response.status, responseText, {
          url: options.url,
          method: options.method,
          params: options.params
        });
      }
    } catch (error) {
      options.error.call(this, response.status, responseText, {
        url: options.url,
        method: options.method,
        params: options.params
      });
    }
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