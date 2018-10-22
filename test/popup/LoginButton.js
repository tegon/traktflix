import chrome from 'sinon-chrome/extensions';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import LoginButton from '../../src/class/popup/LoginButton';

global.chrome = chrome;

const onLoginClicked = sinon.stub();
const onTokenFailed = sinon.stub();
const onTokenSuccess = sinon.stub();
const loginButton = TestUtils.renderIntoDocument(
  <LoginButton onLoginClicked={onLoginClicked} loading={true} onTokenSuccess={onTokenSuccess}
               onTokenFailed={onTokenFailed}/>
);

describe(`LoginButton`, () => {
  beforeAll(() => {
    global.chrome = chrome;
  });

  beforeEach(() => {
    onLoginClicked.reset();
    onTokenFailed.reset();
    onTokenSuccess.reset();
  });

  it(`has the correct html classes`, () => {
    const loginWrapper = TestUtils.findRenderedDOMComponentWithClass(loginButton, `login-wrapper`);
    const button = TestUtils.findRenderedDOMComponentWithClass(loginButton, `mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect`);
    expect(loginWrapper.className).toBe(`login-wrapper`);
    expect(button.className).toBe(`mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect`);
  });

  it(`sends analytics appView`, () => {
    expect(chrome.runtime.sendMessage.callCount).toEqual(1);
    expect(chrome.runtime.sendMessage.getCall(0).args).toEqual([{
      type: `sendAppView`, view: `Login`
    }]);
  });

  it(`calls launchAuthorize and onLoginClicked when button is clicked`, () => {
    const button = TestUtils.findRenderedDOMComponentWithClass(loginButton, `mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect`);
    TestUtils.Simulate.click(button);
    expect(onLoginClicked.callCount).toEqual(1);
    expect(chrome.runtime.sendMessage.callCount).toEqual(2);
    expect(chrome.runtime.sendMessage.getCall(1).args).toContain({type: `launchAuthorize`});
  });

  it(`Oauth callback calls onTokenFailed`, () => {
    loginButton.oauthCallback({error: true, status: 401, response: `{}`});
    expect(onTokenFailed.callCount).toEqual(1);
    expect(onTokenFailed.getCall(0).args).toEqual([401, `{}`]);
  });

  it(`Oauth callback calls onTokenSuccess`, () => {
    loginButton.oauthCallback({error: false, status: 200, response: `{"foo": "bar"}`});
    expect(onTokenSuccess.callCount).toEqual(1);
    expect(onTokenSuccess.getCall(0).args).toEqual([`{"foo": "bar"}`]);
  });

  afterAll(() => {
    chrome.flush();
    delete global.chrome;
  });
});
