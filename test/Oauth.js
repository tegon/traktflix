import chrome from 'sinon-chrome/extensions';
import sinon from 'sinon';
import Oauth from '../src/class/Oauth';
import Settings from '../src/settings.js';

const callback = sinon.spy();
const success = sinon.spy();
const error = sinon.spy();

let server = null;

describe(`Oauth`, () => {
  beforeAll(() => {
    global.chrome = chrome;
  });

  beforeEach(() => {
    server = sinon.fakeServer.create();
  });

  afterEach(() => {
    chrome.flush();
    server.restore();
    callback.resetHistory();
    success.resetHistory();
    error.resetHistory();
  });

  it(`getCode() returns code query string from redirect url`, () => {
    expect(Oauth.getCode(`redirectUrl?code=1234567890abcdefghij`)).toBe(`1234567890abcdefghij`);
  });

  it(`getAuthorizeUrl() returns trakt authorize url`, () => {
    expect(Oauth.getAuthorizeUrl()).toBe(`${Settings.authorizeUri}?client_id=${Settings.clientId}&redirect_uri=${Settings.redirectUri}&response_type=code`);
  });

  it(`authorize() calls chrome.windows.create() when redirectUrl is not passed`, async done => {
    chrome.windows.create.withArgs({url: `${Settings.authorizeUri}?client_id=${Settings.clientId}&redirect_uri=${Settings.redirectUri}&response_type=code`}).yields({id: `Foo`});
    await Oauth.authorize(callback);
    expect(callback.callCount).toBe(0);
    expect(Oauth.sendResponse).toEqual(callback);
    expect(chrome.windows.create.callCount).toBe(1);
    done();
  });

  it(`authorize() calls requestToken() when redirectUrl is passed`, async done => {
    chrome.windows.remove.withArgs(`Foo`).returns();
    sinon.stub(Oauth, `requestToken`).callsFake(() => {
      return [null, null];
    });
    await Oauth.authorize(callback, `redirectUrl?code=1234567890abcdefghij`);
    const params = {
      code: `1234567890abcdefghij`,
      client_id: Settings.clientId,
      client_secret: Settings.clientSecret,
      redirect_uri: Settings.redirectUri,
      grant_type: `authorization_code`
    };
    expect(Oauth.requestToken.callCount).toBe(1);
    expect(Oauth.requestToken.getCall(0).args).toEqual([params]);
    expect(chrome.windows.remove.callCount).toBe(1);
    Oauth.requestToken.resetHistory();
    Oauth.requestToken.restore();
    done();
  });

  it(`requestToken() resolves with success`, async done => {
    chrome.storage.local.set.withArgs({data: {access_token: `12345abcde`}}).yields();
    chrome.storage.local.get.withArgs(`data`).yields({data: {access_token: `12345abcde`}});
    server.respondWith(`POST`, `${Settings.apiUri}/oauth/token`, [200, {[`Content-Type`]: `application/json`}, `{"access_token": "12345abcde"}`]);
    const [promise1, promise2] = Oauth.requestToken({});
    await promise1;
    server.respond();
    const options = await promise2;
    expect(options).toEqual({error: false, response: `{"access_token": "12345abcde"}`});
    done();
  });

  it(`requestToken() resolves with error`, async done => {
    chrome.storage.local.get.withArgs(`data`).yields({data: {access_token: `12345abcde`}});
    chrome.storage.local.remove.withArgs(`data`).yields();
    server.respondWith(`POST`, `${Settings.apiUri}/oauth/token`, [401, {[`Content-Type`]: `application/json`}, `{"error": "invalid_grant"}`]);
    const [promise1, promise2] = Oauth.requestToken({});
    await promise1;
    server.respond();
    const options = await promise2;
    expect(options).toEqual({error: true, response: `{"error": "invalid_grant"}`, status: 401});
    done();
  });

  it(`requestRefreshToken() calls requestToken() with params and callback`, () => {
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
    expect(Oauth.requestToken.callCount).toBe(1);
    expect(Oauth.requestToken.getCall(0).args).toEqual([params]);
    Oauth.requestToken.resetHistory();
    Oauth.requestToken.restore();
  });

  it(`getUserInfo() calls success callback`, async done => {
    chrome.storage.local.get.withArgs(`data`).yields({data: {access_token: `12345abcde`}});
    server.respondWith(`GET`, `${Settings.apiUri}/users/me`, [200, {[`Content-Type`]: `application/json`}, `{"username": "FooBar"}`]);
    const [promise1, promise2] = Oauth.getUserInfo(success, error);
    await promise1;
    server.respond();
    await promise2;
    expect(success.callCount).toBe(1);
    expect(success.getCall(0).args).toEqual([`{"username": "FooBar"}`]);
    done();
  });

  it(`getUserInfo() calls error callback`, async done => {
    chrome.storage.local.get.withArgs(`data`).yields({data: {access_token: `12345abcde`}});
    server.respondWith(`GET`, `${Settings.apiUri}/users/me`, [400, {[`Content-Type`]: `application/json`}, `{"error": "Bad Request"}`]);
    const [promise1, promise2] = Oauth.getUserInfo(success, error);
    await promise1;
    server.respond();
    await promise2;
    expect(error.callCount).toBe(1);
    expect(error.getCall(0).args).toEqual([400, `{"error": "Bad Request"}`]);
    done();
  });

  it(`getUserInfo() calls error callback if status is 401 and refresh_token is empty`, async done => {
    chrome.storage.local.get.withArgs(`data`).yields({});
    server.respondWith(`GET`, `${Settings.apiUri}/users/me`, [401, {[`Content-Type`]: `application/json`}, `{"error": "invalid_grant"}`]);
    const [promise1, promise2] = Oauth.getUserInfo(success, error);
    await promise1;
    server.respond();
    await promise2;
    expect(error.callCount).toBe(1);
    expect(error.getCall(0).args).toEqual([401, `{"error": "invalid_grant"}`]);
    done();
  });

  it(`getUserInfo() calls refreshToken() with success`, async done => {
    chrome.storage.local.set.withArgs({data: {access_token: `12345abcde`, refresh_token: `54321edcba`}}).yields();
    chrome.storage.local.get.withArgs(`data`).yields({data: {access_token: `12345abcde`, refresh_token: `54321edcba`}});
    server.respondWith(`GET`, `${Settings.apiUri}/users/me`, [401, {[`Content-Type`]: `application/json`}, `{"error": "invalid_grant"}`]);
    server.respondWith(`POST`, `${Settings.apiUri}/oauth/token`, [200, {[`Content-Type`]: `application/json`}, `{ "access_token": "12345abcde", "refresh_token": "54321edcba" }`]);
    const [promise1, promise2, promise3] = Oauth.getUserInfo(success, error);
    await promise1;
    server.respond();
    await promise2;
    server.respond();
    await promise3;
    expect(success.callCount).toBe(1);
    expect(success.getCall(0).args).toEqual([`{ "access_token": "12345abcde", "refresh_token": "54321edcba" }`]);
    done();
  });

  it(`getUserInfo() calls refreshToken() with error`, async done => {
    chrome.storage.local.remove.withArgs(`data`).yields();
    chrome.storage.local.get.withArgs(`data`).yields({data: {access_token: `12345abcde`, refresh_token: `54321edcba`}});
    server.respondWith(`GET`, `${Settings.apiUri}/users/me`, [401, {[`Content-Type`]: `application/json`}, `{"error": "invalid_grant"}`]);
    server.respondWith(`POST`, `${Settings.apiUri}/oauth/token`, [401, {[`Content-Type`]: `application/json`}, `{"error": "invalid_grant"}`]);
    const [promise1, promise2, promise3] = Oauth.getUserInfo(success, error);
    await promise1;
    server.respond();
    await promise2;
    server.respond();
    await promise3;
    expect(error.callCount).toBe(1);
    expect(error.getCall(0).args).toEqual([401, `{"error": "invalid_grant"}`]);
    done();
  });

  afterAll(() => {
    chrome.flush();
    delete global.chrome;
  });
});