import browser from 'sinon-chrome';
import fakeFetch from '../test-helpers/fake-fetch';
import sinon from 'sinon';
import Settings from '../src/settings.js';
import Oauth from '../src/class/Oauth';
import Shared from '../src/class/Shared';

Shared.setBackgroundPage(true);

describe(`Oauth`, () => {
  before(() => {
    window.browser = browser;
  });

  beforeEach(() => {
    fakeFetch.install();
  });

  afterEach(() => {
    browser.flush();
    fakeFetch.restore();
  });

  after(() => {
    browser.flush();
    delete window.browser;
  });

  it(`getCode() returns code query string from redirect url`, () => {
    expect(Oauth.getCode(`redirectUrl?code=1234567890abcdefghij`)).to.equal(`1234567890abcdefghij`);
  });

  it(`requestToken() resolves with success`, async () => {
    browser.storage.local.get.withArgs(`data`).resolves({data: {access_token: `12345abcde`}});
    browser.storage.local.set.withArgs({data: {access_token: `12345abcde`}}).resolves();
    fakeFetch.withArgs(`${Settings.apiUri}/oauth/token`).respondWith(`{"access_token": "12345abcde"}`, { status: 200 });
    const result = await Oauth.requestToken();
    expect(result).to.deep.equal({error: false, response: `{"access_token": "12345abcde"}`});
  });

  it(`requestToken() resolves with error`, async () => {
    browser.storage.local.get.withArgs(`data`).resolves({data: {access_token: `12345abcde`}});
    browser.storage.local.remove.withArgs(`data`).resolves();
    fakeFetch.withArgs(`${Settings.apiUri}/oauth/token`).respondWith(`{"error": "invalid_grant"}`, { status: 401 });
    const result = await Oauth.requestToken({});
    expect(result).to.deep.equal({error: true, response: `{"error": "invalid_grant"}`, status: 401});
  });

  it(`requestRefreshToken() calls requestToken() with params`, () => {
    browser.identity.getRedirectURL.returns(`https://redirect.url/`);
    sinon.stub(Oauth, `requestToken`);
    const refreshToken = `54321edcba`;
    Oauth.requestRefreshToken(refreshToken);
    const params = {
      refresh_token: refreshToken,
      client_id: Settings.clientId,
      client_secret: Settings.clientSecret,
      redirect_uri: browser.identity.getRedirectURL(),
      grant_type: `refresh_token`
    };
    expect(Oauth.requestToken.callCount).to.equal(1);
    expect(Oauth.requestToken.args[0]).to.deep.equal([params]);
    Oauth.requestToken.restore();
  });

  it(`getUserInfo() calls success callback`, done => {
    browser.storage.local.get.withArgs(`data`).resolves({data: {access_token: `12345abcde`}});
    fakeFetch.withArgs(`${Settings.apiUri}/users/me`).respondWith(`{"username": "FooBar"}`, { status: 200 });
    const success = response => {
      expect(response).to.equal(`{"username": "FooBar"}`);
      done();
    };
    const error = () => {
      done.fail();
    };
    Oauth.getUserInfo(success, error);
  });

  it(`getUserInfo() calls error callback`, done => {
    browser.storage.local.get.withArgs(`data`).resolves({data: {access_token: `12345abcde`}});
    fakeFetch.withArgs(`${Settings.apiUri}/users/me`).respondWith(`{"error": "Bad Request"}`, { status: 400 });
    const success = () => {
      done.fail();
    };
    const error = (status, response) => {
      expect(status).to.equal(400);
      expect(response).to.equal(`{"error": "Bad Request"}`);
      done();
    };
    Oauth.getUserInfo(success, error);
  });

  it(`getUserInfo() calls error callback if status is 401 and refresh_token is empty`, done => {
    browser.storage.local.get.withArgs(`data`).resolves({});
    fakeFetch.withArgs(`${Settings.apiUri}/users/me`).respondWith(`{"error": "invalid_grant"}`, { status: 401 });
    const success = () => {
      done.fail();
    };
    const error = (status, response) => {
      expect(status).to.equal(401);
      expect(response).to.equal(`{"error": "invalid_grant"}`);
      done();
    };
    Oauth.getUserInfo(success, error);
  });

  it(`getUserInfo() calls refreshToken() with success`, done => {
    browser.storage.local.get.withArgs(`data`).resolves({data: {access_token: `12345abcde`, refresh_token: `54321edcba`}});
    sinon.stub(Oauth, `requestRefreshToken`).withArgs(`54321edcba`).resolves({
      response: `{ "access_token": "12345abcde", "refresh_token": "54321edcba" }`
    });
    fakeFetch.withArgs(`${Settings.apiUri}/users/me`).respondWith(`{"error": "invalid_grant"}`, { status: 401 });
    const success = response => {
      expect(Oauth.requestRefreshToken.callCount).to.equal(1);
      expect(response).to.equal(`{ "access_token": "12345abcde", "refresh_token": "54321edcba" }`);
      Oauth.requestRefreshToken.restore();
      done();
    };
    const error = () => {
      done.fail();
    };
    Oauth.getUserInfo(success, error);
  });

  it(`getUserInfo() calls refreshToken() with error`, done => {
    browser.storage.local.get.withArgs(`data`).resolves({data: {access_token: `12345abcde`, refresh_token: `54321edcba`}});
    sinon.stub(Oauth, `requestRefreshToken`).withArgs(`54321edcba`).resolves({
      error: true,
      response: `{ "error": "invalid_grant" }`,
      status: 401
    });
    fakeFetch.withArgs(`${Settings.apiUri}/users/me`).respondWith(`{"error": "invalid_grant"}`, { status: 401 });
    const success = () => {
      done.fail();
    };
    const error = (status, response) => {
      expect(Oauth.requestRefreshToken.callCount).to.equal(1);
      expect(status).to.equal(401);
      expect(response).to.equal(`{ "error": "invalid_grant" }`);
      Oauth.requestRefreshToken.restore();
      done();
    };
    Oauth.getUserInfo(success, error);
  });

  describe(`when browser.identity is defined`, () => {
    it(`isIdentityAvailable() returns true`, () => {
      expect(Oauth.isIdentityAvailable()).to.be.true;
    });

    it(`getAuthorizeUrl() returns Trakt's authorize URL`, () => {
      const url = `https://redirect.url/`;
      browser.identity.getRedirectURL.returns(url);
      expect(Oauth.getAuthorizeUrl()).to.equal(`${Settings.authorizeUri}?client_id=${Settings.clientId}&redirect_uri=${url}&response_type=code`);
    });

    it(`authorize() launches web auth flow`, done => {
      const url = `https://redirect.url/`;
      browser.identity.getRedirectURL.returns(url);
      const authArgs = {
        url: Oauth.getAuthorizeUrl(),
        interactive: true
      };
      browser.identity.launchWebAuthFlow.withArgs(authArgs).resolves(`${url}?code=1234567890abcdefghij`);
      sinon.stub(Oauth, `requestToken`).resolves(`Test`);
      Oauth.authorize(options => {
        const params = {
          code: `1234567890abcdefghij`,
          client_id: Settings.clientId,
          client_secret: Settings.clientSecret,
          redirect_uri: url,
          grant_type: `authorization_code`
        };
        expect(browser.identity.launchWebAuthFlow.callCount).to.equal(1);
        expect(browser.identity.launchWebAuthFlow.args[0]).to.deep.equal([authArgs]);
        expect(Oauth.requestToken.callCount).to.equal(1);
        expect(Oauth.requestToken.args[0]).to.deep.equal([params]);
        expect(options).to.equal(`Test`);
        Oauth.requestToken.restore();
        done();
      });
    });
  });

  describe(`when browser.identity is not defined`, () => {
    beforeEach(() => {
      sinon.stub(Oauth, `isIdentityAvailable`).returns(false);
    });

    afterEach(() => {
      Oauth.isIdentityAvailable.restore();
    });

    it(`isIdentityAvailable() returns false`, () => {
      expect(Oauth.isIdentityAvailable()).to.be.false;
    });

    it(`getAuthorizeUrl() returns Trakt's authorize URL`, () => {
      expect(Oauth.getAuthorizeUrl()).to.equal(`${Settings.authorizeUri}?client_id=${Settings.clientId}&redirect_uri=${Settings.redirectUri}&response_type=code`);
    });

    it(`authorize() opens new tab for authentication`, done => {
      const tabIndex = 5;
      const tabId = 99;
      const params = {
        code: `1234567890abcdefghij`,
        client_id: Settings.clientId,
        client_secret: Settings.clientSecret,
        redirect_uri: Settings.redirectUri,
        grant_type: `authorization_code`
      };
      sinon.stub(Oauth, `requestToken`).resolves(`Test`);
      browser.tabs.query.withArgs({active: true, currentWindow: true}).resolves([{ index: tabIndex }]);
      browser.tabs.create.withArgs({index: tabIndex, url: Oauth.getAuthorizeUrl() }).resolves({ id: tabId });
      browser.tabs.remove.withArgs(tabId).resolves();
      const callback = options => {
        expect(Oauth.requestToken.callCount).to.equal(1);
        expect(Oauth.requestToken.args[0]).to.deep.equal([params]);
        expect(browser.tabs.remove.callCount).to.equal(1);
        expect(Oauth.authorizationTabId).to.be.null;
        expect(options).to.equal(`Test`);
        Oauth.requestToken.restore();
        done();
      };
      Oauth.authorize(callback).then(() => {
        expect(Oauth.sendResponse).to.equal(callback);
        expect(browser.tabs.query.callCount).to.equal(1);
        expect(browser.tabs.create.callCount).to.equal(1);
        expect(Oauth.authorizationTabId).to.equal(tabId);
        Oauth.authorize(null, `${Settings.redirectUri}?code=1234567890abcdefghij`);
      });
    });
  });
});