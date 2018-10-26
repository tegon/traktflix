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

  requestToken(params) {
    return new Promise(resolve => {
      Request.send({
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
      });
    });
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
      const options = await this.requestToken(params);
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
    const _this = this;
    Request.send({
      method: `GET`,
      url: `${Settings.apiUri}/users/me`,
      success: response => {
        success.call(this, response);
      },
      error: async function (status, response) {
        if (status === 401) {
          const data = await ChromeStorage.get(`data`);
          if (data.data && data.data.refresh_token) {
            const options = await _this.requestRefreshToken(data.data.refresh_token);
            if (options.error) {
              error.call(this, options.status, options.response);
            } else {
              success.call(this, options.response);
            }
          } else {
            error.call(this, status, response);
          }
        } else {
          error.call(this, status, response);
        }
      }
    });
  }
}

const oauth = new Oauth();
export default oauth;
