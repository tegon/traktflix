var Oauth = require('../app/scripts/src/oauth.js');
var Settings = require('../app/scripts/src/settings.js');
var callback = sinon.spy();
var success = sinon.spy();
var error = sinon.spy();

describe('Oauth', function() {
  beforeEach(function() {
    this.xhr = sinon.useFakeXMLHttpRequest();
    var requests = this.requests = [];
    this.xhr.onCreate = function (xhr) {
      requests.push(xhr);
    };
  });

  afterEach(function() {
    this.xhr.restore();
    callback.reset();
    success.reset();
    error.reset();
  });

  it('getAuthorizeUrl returns trakt authorize url', function() {
    expect(Oauth.getAuthorizeUrl()).toBe(
      Settings.authorizeUri + '?client_id=' + Settings.clientId +
      '&redirect_uri=' + Settings.redirectUri + '&response_type=code'
    );
  });

  it('getCode returns code query string from url', function() {
    expect(
      Oauth.getCode('chrome-extension://{extensionId}?code=123324adbadwqe')
    ).toBe('123324adbadwqe');
  });

  it('requestToken calls callback with success', function() {
    Oauth.requestToken({}, callback);
    expect(this.requests.length).toBe(1);
    this.requests[0].respond(200, { 'Content-Type': 'application/json' },
      '{ "access_token": "123123asavad" }');
    expect(callback.callCount).toBe(1);
    expect(callback.getCall(0).args).toEqual([{
      error: false, response: '{ "access_token": "123123asavad" }'
    }]);
  });

  it('requestToken calls callback with error', function() {
    Oauth.requestToken({}, callback);
    expect(this.requests.length).toBe(1);
    this.requests[0].respond(401, { 'Content-Type': 'application/json' },
      '{ "error": "invalid_grant" }');
    expect(callback.callCount).toBe(1);
    expect(callback.getCall(0).args).toEqual([{
      error: true, response: '{ "error": "invalid_grant" }', status: 401
    }]);
  });

  it('authorize calls requestToken with params and callback', function() {
    sinon.stub(Oauth, 'requestToken');
    Oauth.authorize(callback);
    var params = {
      code: '123324adbadwqe',
      client_id: Settings.clientId,
      client_secret: Settings.clientSecret,
      redirect_uri: Settings.redirectUri,
      grant_type: 'authorization_code'
    };
    expect(Oauth.requestToken.callCount).toBe(1);
    expect(Oauth.requestToken.getCall(0).args).toEqual([params, callback]);
    Oauth.requestToken.restore();
  });

  it('requestRefreshToken calls requestToken with params and callback', function() {
    sinon.stub(Oauth, 'requestToken');
    var refreshToken = '343567564qweqwertet';
    Oauth.requestRefreshToken(refreshToken, callback);
    var params = {
      refresh_token: refreshToken,
      client_id: Settings.clientId,
      client_secret: Settings.clientSecret,
      redirect_uri: Settings.redirectUri,
      grant_type: 'refresh_token'
    };
    expect(Oauth.requestToken.callCount).toBe(1);
    expect(Oauth.requestToken.getCall(0).args).toEqual([params, callback]);
    Oauth.requestToken.restore();
  });

  it('getUserInfo calls success callback', function() {
    Oauth.getUserInfo(success, error);
    expect(this.requests.length).toBe(1);
    this.requests[0].respond(200, { 'Content-Type': 'application/json' },
      '{ "username": "foozin" }');
    expect(success.callCount).toBe(1);
    expect(success.getCall(0).args).toEqual(['{ "username": "foozin" }']);
  });

  it('getUserInfo calls error callback', function() {
    Oauth.getUserInfo(success, error);
    expect(this.requests.length).toBe(1);
    this.requests[0].respond(400, { 'Content-Type': 'application/json' },
      '{ "error": "Bad Request" }');
    expect(error.callCount).toBe(1);
    expect(error.getCall(0).args).toEqual([400, '{ "error": "Bad Request" }']);
  });

  it('getUserInfo calls error callback if status is 401 and refresh_token is empty', function() {
    Oauth.getUserInfo(success, error);
    expect(this.requests.length).toBe(1);
    this.requests[0].respond(401, { 'Content-Type': 'application/json' },
      '{ "error": "invalid_grant" }');
    expect(error.callCount).toBe(1);
    expect(error.getCall(0).args).toEqual([401, '{ "error": "invalid_grant" }']);
  });

  it('getUserInfo requests refreshToken with success', function() {
    window.chrome.storage.local.get.restore();
    sinon.stub(window.chrome.storage.local, 'get', function(data, cb) {
      if (typeof(data) === 'function') {
        data.call(this, { refresh_token: '343567564qweqwertet' });
      } else {
        cb.call(this, {});
      }
    });
    Oauth.getUserInfo(success, error);
    expect(this.requests.length).toBe(1);
    this.requests[0].respond(401, { 'Content-Type': 'application/json' },
      '{ "error": "invalid_grant" }');
    expect(this.requests.length).toBe(2);
    this.requests[1].respond(200, { 'Content-Type': 'application/json' },
      '{ "access_token": "123123asavad", "refresh_token": "12319adsdasd" }');
    expect(success.callCount).toBe(1);
    expect(success.getCall(0).args).toEqual([
      '{ "access_token": "123123asavad", "refresh_token": "12319adsdasd" }'
    ]);
  });

  it('getUserInfo requests refreshToken with error', function() {
    window.chrome.storage.local.get.restore();
    sinon.stub(window.chrome.storage.local, 'get', function(data, cb) {
      if (typeof(data) === 'function') {
        data.call(this, { refresh_token: '343567564qweqwertet' });
      } else {
        cb.call(this, {});
      }
    });
    Oauth.getUserInfo(success, error);
    expect(this.requests.length).toBe(1);
    this.requests[0].respond(401, { 'Content-Type': 'application/json' },
      '{ "error": "invalid_grant" }');
    expect(this.requests.length).toBe(2);
    this.requests[1].respond(401, { 'Content-Type': 'application/json' },
      '{ "error": "invalid_grant" }');
    expect(error.callCount).toBe(1);
    expect(error.getCall(0).args).toEqual([401, '{ "error": "invalid_grant" }']);
  });
});