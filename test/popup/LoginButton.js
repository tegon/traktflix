import {mount} from '../../test-helpers/EnzymeHelper';
import sinon from 'sinon';
import chrome from 'sinon-chrome/extensions';
import React from 'react';
import LoginButton from '../../src/class/popup/LoginButton';

global.chrome = chrome;

const onLoginClicked = sinon.stub();
const onTokenFailed = sinon.stub();
const onTokenSuccess = sinon.stub();
const componentTrue = mount(
  <LoginButton onLoginClicked={onLoginClicked} loading={true} onTokenSuccess={onTokenSuccess} onTokenFailed={onTokenFailed}/>
);
const componentFalse = mount(
  <LoginButton onLoginClicked={onLoginClicked} loading={false} onTokenSuccess={onTokenSuccess} onTokenFailed={onTokenFailed}/>
);

describe(`LoginButton`, () => {
  before(() => {
    global.chrome = chrome;
  });

  beforeEach(() => {
    onLoginClicked.resetHistory();
    onTokenFailed.resetHistory();
    onTokenSuccess.resetHistory();
  });

  after(() => {
    componentTrue.unmount();
    componentFalse.unmount();
    chrome.flush();
    delete global.chrome;
  });

  it(`sends analytics appView`, () => {
    expect(chrome.runtime.sendMessage.callCount).to.equal(2);
    expect(chrome.runtime.sendMessage.args[0]).to.deep.equal([{
      type: `sendAppView`, view: `Login`
    }]);
    chrome.flush();
  });

  it(`has the correct html classes`, () => {
    const loginWrapper = componentTrue.find(`.login-wrapper`);
    const button = componentTrue.find(`.mdl-button.mdl-js-button.mdl-button--raised.mdl-button--colored.mdl-js-ripple-effect`);
    expect(loginWrapper.hasClass(`login-wrapper`)).to.be.true;
    expect(button.hasClass(`mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect`)).to.be.true;
  });

  it(`button  has display: none  style when props.loading is true`, () => {
    const button = componentTrue.find(`.mdl-button.mdl-js-button.mdl-button--raised.mdl-button--colored.mdl-js-ripple-effect`);
    expect(button.getDOMNode().style.display).to.equal(`none`);
  });

  it(`button has display: empty style when props.loading is false`, () => {
    const button = componentFalse.find(`.mdl-button.mdl-js-button.mdl-button--raised.mdl-button--colored.mdl-js-ripple-effect`);
    expect(button.getDOMNode().style.display).to.equal(``);
  });

  it(`calls launchAuthorize and onLoginClicked when button is clicked`, () => {
    const button = componentTrue.find(`.mdl-button.mdl-js-button.mdl-button--raised.mdl-button--colored.mdl-js-ripple-effect`);
    button.prop(`onClick`)();
    expect(onLoginClicked.callCount).to.equal(1);
    expect(chrome.runtime.sendMessage.callCount).to.equal(1);
    expect(chrome.runtime.sendMessage.args[0][0]).to.deep.equal({type: `launchAuthorize`});
  });

  it(`Oauth callback calls onTokenFailed`, () => {
    componentTrue.instance().oauthCallback({error: true, status: 401, response: `{}`});
    expect(onTokenFailed.callCount).to.equal(1);
    expect(onTokenFailed.args[0]).to.deep.equal([401, `{}`]);
  });

  it(`Oauth callback calls onTokenSuccess`, () => {
    componentTrue.instance().oauthCallback({error: false, status: 200, response: `{"foo": "bar"}`});
    expect(onTokenSuccess.callCount).to.equal(1);
    expect(onTokenSuccess.args[0]).to.deep.equal([`{"foo": "bar"}`]);
  });
});
