import sinon from 'sinon';
import chrome from 'sinon-chrome/extensions';
import Oauth from '../src/class/Oauth';
import Settings from '../src/settings.js';

let server = null;

describe(`Oauth`, () => {
  before(() => {
    global.chrome = chrome;
  });

  beforeEach(() => {
    server = sinon.fakeServer.create();
    server.autoRespond = true;
  });

  afterEach(() => {
    chrome.flush();
    server.restore();
  });

  after(() => {
    chrome.flush();
    delete global.chrome;
  });

  it(`getCode() returns code query string from redirect url`, () => {
    expect(Oauth.getCode(`redirectUrl?code=1234567890abcdefghij`)).to.equal(`1234567890abcdefghij`);
  });

  it(`getAuthorizeUrl() returns Trakt's authorize URL`, () => {
    expect(Oauth.getAuthorizeUrl()).to.equal(`${Settings.authorizeUri}?client_id=${Settings.clientId}&redirect_uri=${Settings.redirectUri}&response_type=code`);
  });

  it(`requestToken() resolves with success`, async () => {
    chrome.storage.local.get.withArgs(`data`).yields({data: {access_token: `12345abcde`}});
    chrome.storage.local.set.withArgs({data: {access_token: `12345abcde`}}).yields();
    server.respondWith(`POST`, `${Settings.apiUri}/oauth/token`, [200, {[`Content-Type`]: `application/json`}, `{"access_token": "12345abcde"}`]);
    const result = await Oauth.requestToken();
    expect(result).to.deep.equal({error: false, response: `{"access_token": "12345abcde"}`});
  });

  it(`requestToken() resolves with error`, async () => {
    chrome.storage.local.get.withArgs(`data`).yields({data: {access_token: `12345abcde`}});
    chrome.storage.local.remove.withArgs(`data`).yields();
    server.respondWith(`POST`, `${Settings.apiUri}/oauth/token`, [401, {[`Content-Type`]: `application/json`}, `{"error": "invalid_grant"}`]);
    const result = await Oauth.requestToken({});
    expect(result).to.deep.equal({error: true, response: `{"error": "invalid_grant"}`, status: 401});
  });

  it(`authorize() calls chrome.tabs.create() when redirectUrl is not passed`, async () => {
    const tabObj  = {id: `Foo`};
    chrome.tabs.query.withArgs({active: true, currentWindow: true}).yields([{index: 5}]);
    chrome.tabs.create.withArgs({index: 5, url: `${Settings.authorizeUri}?client_id=${Settings.clientId}&redirect_uri=${Settings.redirectUri}&response_type=code`}).yields(tabObj);
    const callback = sinon.spy();
    await Oauth.authorize(callback);
    expect(callback.callCount).to.equal(0);
    expect(Oauth.sendResponse).to.equal(callback);
    expect(Oauth.authorizationTabId).to.equal(tabObj.id);
  });

  it(`authorize() calls requestToken() when redirectUrl is passed`, async () => {
    sinon.stub(Oauth, `requestToken`).resolves(`Test`);
    const callback = Oauth.sendResponse;
    await Oauth.authorize(null, `redirectUrl?code=1234567890abcdefghij`);
    const params = {
      code: `1234567890abcdefghij`,
      client_id: Settings.clientId,
      client_secret: Settings.clientSecret,
      redirect_uri: Settings.redirectUri,
      grant_type: `authorization_code`
    };
    expect(Oauth.requestToken.callCount).to.equal(1);
    expect(Oauth.requestToken.args[0]).to.deep.equal([params]);
    expect(callback.callCount).to.equal(1);
    expect(callback.args[0]).to.deep.equal([`Test`]);
    expect(Oauth.sendResponse).to.be.null;
    expect(chrome.tabs.remove.callCount).to.equal(1);
    expect(chrome.tabs.remove.args[0]).to.deep.equal([`Foo`]);
    expect(Oauth.authorizationTabId).to.be.null;
    Oauth.requestToken.restore();
  });

  it(`requestRefreshToken() calls requestToken() with params`, () => {
    sinon.stub(Oauth, `requestToken`);
    const refreshToken = `54321edcba`;
    Oauth.requestRefreshToken(refreshToken);
    const params = {
      refresh_token: refreshToken,
      client_id: Settings.clientId,
      client_secret: Settings.clientSecret,
      redirect_uri: Settings.redirectUri,
      grant_type: `refresh_token`
    };
    expect(Oauth.requestToken.callCount).to.equal(1);
    expect(Oauth.requestToken.args[0]).to.deep.equal([params]);
    Oauth.requestToken.restore();
  });

  it(`getUserInfo() calls success callback`, done => {
    chrome.storage.local.get.withArgs(`data`).yields({data: {access_token: `12345abcde`}});
    server.respondWith(`GET`, `${Settings.apiUri}/users/me`, [200, {[`Content-Type`]: `application/json`}, `{"username": "FooBar"}`]);
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
    chrome.storage.local.get.withArgs(`data`).yields({data: {access_token: `12345abcde`}});
    server.respondWith(`GET`, `${Settings.apiUri}/users/me`, [400, {[`Content-Type`]: `application/json`}, `{"error": "Bad Request"}`]);
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
    chrome.storage.local.get.withArgs(`data`).yields({});
    server.respondWith(`GET`, `${Settings.apiUri}/users/me`, [401, {[`Content-Type`]: `application/json`}, `{"error": "invalid_grant"}`]);
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
    chrome.storage.local.get.withArgs(`data`).yields({data: {access_token: `12345abcde`, refresh_token: `54321edcba`}});
    sinon.stub(Oauth, `requestRefreshToken`).withArgs(`54321edcba`).resolves({
      response: `{ "access_token": "12345abcde", "refresh_token": "54321edcba" }`
    });
    server.respondWith(`GET`, `${Settings.apiUri}/users/me`, [401, {[`Content-Type`]: `application/json`}, `{"error": "invalid_grant"}`]);
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
    chrome.storage.local.get.withArgs(`data`).yields({data: {access_token: `12345abcde`, refresh_token: `54321edcba`}});
    sinon.stub(Oauth, `requestRefreshToken`).withArgs(`54321edcba`).resolves({
      error: true,
      response: `{ "error": "invalid_grant" }`,
      status: 401
    });
    server.respondWith(`GET`, `${Settings.apiUri}/users/me`, [401, {[`Content-Type`]: `application/json`}, `{"error": "invalid_grant"}`]);
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
});