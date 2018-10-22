import ChromeStorage from './ChromeStorage';
import Request from './Request';
import Settings from '../settings';

class Oauth {
  constructor() {
    this.sendResponse = null;
    this.authorizationWindow = null;
  }

  getCode(redirectUrl) {
    return redirectUrl
      .split(`?`)[1]
      .split(`=`)[1]
      ;
  }

  getAuthorizeUrl() {
    return `${Settings.authorizeUri}?client_id=${Settings.clientId}&redirect_uri=${Settings.redirectUri}&response_type=code`;
  }

  async authorize(sendResponse, redirectUrl) {
    if (redirectUrl) {
      const params = {
        code: this.getCode(redirectUrl),
        client_id: Settings.clientId,
        client_secret: Settings.clientSecret,
        redirect_uri: Settings.redirectUri,
        grant_type: `authorization_code`
      };
      const options = await this.requestToken(params)[1];
      if (this.sendResponse) {
        this.sendResponse(options);
        this.sendResponse = null;
      }
      if (this.authorizationWindow) {
        chrome.windows.remove(this.authorizationWindow.id);
        this.authorizationWindow = null;
      }
    } else {
      this.sendResponse = sendResponse;
      chrome.windows.create({url: this.getAuthorizeUrl()}, window => {
        this.authorizationWindow = window;
      });
    }
  }

  requestToken(params) {
    let resolve;
    const secondPromise = new Promise(_resolve => resolve = _resolve);
    // noinspection JSIgnoredPromiseFromCall
    return [Request.send({
      method: `POST`,
      url: `${Settings.apiUri}/oauth/token`,
      params,
      success: async response => {
        const options = JSON.parse(response);
        await ChromeStorage.set({data: options});
        resolve({error: false, response});
      },
      error: async (status, response) => {
        await ChromeStorage.remove(`data`);
        resolve({error: true, response, status});
      }
    }), secondPromise];
  }

  requestRefreshToken(refreshToken) {
    const params = {
      refresh_token: refreshToken,
      client_id: Settings.clientId,
      client_secret: Settings.clientSecret,
      redirect_uri: Settings.redirectUri,
      grant_type: `refresh_token`
    };
    return this.requestToken(params);
  }

  getUserInfo(success, error) {
    let resolve, resolve2;
    const secondPromise = new Promise(_resolve => resolve = _resolve);
    const thirdPromise = new Promise(_resolve => resolve2 = _resolve);
    const _this = this;
    return [Request.send({
      method: `GET`,
      url: `${Settings.apiUri}/users/me`,
      success: response => {
        success.call(this, response);
        resolve();
      },
      error: async function (status, response) {
        if (status === 401) {
          const data = await ChromeStorage.get(`data`);
          if (data.data && data.data.refresh_token) {
            const [promise1, promise2] = _this.requestRefreshToken(data.data.refresh_token);
            await promise1;
            resolve();
            const options = await promise2;
            if (options.error) {
              error.call(this, options.status, options.response);
            } else {
              success.call(this, options.response);
            }
            resolve2();
            return;
          }
        }
        error.call(this, status, response);
        resolve();
      }
    }), secondPromise, thirdPromise];
  }
}

const oauth = new Oauth();
export default oauth;
