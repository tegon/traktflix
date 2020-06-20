import Settings from '../settings';
import BrowserStorage from './BrowserStorage';
import Request from './Request';
import Shared from './Shared';

class Oauth {
  constructor() {
    this.sendResponse = null;
    this.authorizationTabId = null;
    this.authorizationError = null;
  }

  isIdentityAvailable() {
    return browser.identity && !this.authorizationError;
  }

  getCode(redirectUrl) {
    return redirectUrl
      .split(`?`)[1]
      .split(`=`)[1]
      ;
  }

  getAuthorizeUrl() {
    return `${Settings.authorizeUri}?client_id=${Settings.clientId}&redirect_uri=${this.isIdentityAvailable() ? browser.identity.getRedirectURL() : Settings.redirectUri}&response_type=code`;
  }

  requestToken(params) {
    return new Promise(resolve => {
      Request.send({
        method: `POST`,
        url: `${Settings.apiUri}/oauth/token`,
        params,
        success: async response => {
          const options = JSON.parse(response);
          await BrowserStorage.set({data: options}, true);
          resolve({error: false, response});
        },
        error: async (status, response) => {
          await BrowserStorage.remove(`data`, true);
          resolve({error: true, response, status});
        }
      });
    });
  }

  async authorize(sendResponse, redirectUrl) {
    if (this.isIdentityAvailable()) {
      try {
        redirectUrl = await browser.identity.launchWebAuthFlow({
          url: this.getAuthorizeUrl(),
          interactive: true
        });
      } catch (error) {
        this.authorizationError = error;
        console.log(error);
      }
    }

    if (redirectUrl) {
      const params = {
        code: this.getCode(redirectUrl),
        client_id: Settings.clientId,
        client_secret: Settings.clientSecret,
        redirect_uri: this.isIdentityAvailable() ? browser.identity.getRedirectURL() : Settings.redirectUri,
        grant_type: `authorization_code`
      };
      const options = await this.requestToken(params);
      if (this.authorizationTabId) {
        browser.tabs.remove(this.authorizationTabId);
        this.authorizationTabId = null;
      }
      if (this.sendResponse) {
        this.sendResponse(options);
        this.sendResponse = null;
      } else {
        sendResponse(options);
      }
    } else {
      this.sendResponse = sendResponse;
      const tab = await Shared.openTab(this.getAuthorizeUrl());
      if (tab) {
        this.authorizationTabId = tab.id;
      }
    }
  }

  requestRefreshToken(refreshToken) {
    const params = {
      refresh_token: refreshToken,
      client_id: Settings.clientId,
      client_secret: Settings.clientSecret,
      redirect_uri: this.isIdentityAvailable() ? browser.identity.getRedirectURL() : Settings.redirectUri,
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
          const storage = await BrowserStorage.get(`data`);
          if (storage.data && storage.data.refresh_token) {
            const options = await _this.requestRefreshToken(storage.data.refresh_token);
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
