jest.dontMock('../../../app/scripts/src/popup/components/login-button');

var React = require('react/addons');
var Login = require('../../../app/scripts/src/popup/components/login-button');
var helper = require('../../test-helper.js');
var TestUtils = React.addons.TestUtils;
var onClickMock = jest.genMockFunction();
var onTokenFailedMock = jest.genMockFunction();
var onTokenSuccessMock = jest.genMockFunction();
var loginButton = TestUtils.renderIntoDocument(
  <Login onClick={onClickMock} loading={true}
    onTokenSuccess={onTokenSuccessMock} onTokenFailed={onTokenFailedMock} />
);

describe('Login', function() {
  beforeEach(function() {
    onClickMock.mockClear();
    onTokenFailedMock.mockClear();
    onTokenSuccessMock.mockClear();
    chrome.runtime.sendMessage.mockClear();
  });

  it('When props.loading is true, spinner-wrapper has display: block style', function() {
    var spinnerWrapper = TestUtils.findRenderedDOMComponentWithClass(loginButton, 'spinner-wrapper');
    expect(spinnerWrapper.getDOMNode().style['display']).toBe('block');
  });

  it('When props.loading is false, spinner-wrapper has display: none style', function() {
    var loginButton = TestUtils.renderIntoDocument(
      <Login onClick={onClickMock} loading={false}
        onTokenSuccess={onTokenSuccessMock} onTokenFailed={onTokenFailedMock} />
    );
    var spinnerWrapper = TestUtils.findRenderedDOMComponentWithClass(loginButton, 'spinner-wrapper');
    expect(spinnerWrapper.getDOMNode().style['display']).toBe('none');
  });

  it('Has the correct html classes', function() {
    var loginWrapper = TestUtils.findRenderedDOMComponentWithClass(loginButton, 'login-wrapper');
    var spinnerWrapper = TestUtils.findRenderedDOMComponentWithClass(loginButton, 'spinner-wrapper');
    var spinner = TestUtils.findRenderedDOMComponentWithClass(loginButton, 'mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active');
    var button = TestUtils.findRenderedDOMComponentWithClass(loginButton, 'mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect');
    expect(loginWrapper.getDOMNode().className).toBe('login-wrapper');
    expect(spinnerWrapper.getDOMNode().className).toBe('spinner-wrapper');
    expect(spinner.getDOMNode().className).toBe('mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active');
    expect(button.getDOMNode().className).toBe('mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect');
  });

  it('Sends analytics appView', function() {
    var loginButton = TestUtils.renderIntoDocument(
      <Login onClick={onClickMock} loading={false}
        onTokenSuccess={onTokenSuccessMock} onTokenFailed={onTokenFailedMock} />
    );
    expect(chrome.runtime.sendMessage.mock.calls.length).toEqual(1);
    expect(chrome.runtime.sendMessage.mock.calls[0]).toEqual([{
      type: 'sendAppView', view: 'Login'
    }]);
  });

  it('When button is clicked, props.onClick and launchAuthorize are called', function() {
    var button = TestUtils.findRenderedDOMComponentWithClass(loginButton, 'mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect');
    React.addons.TestUtils.Simulate.click(button);
    expect(onClickMock.mock.calls.length).toEqual(1);
    expect(chrome.runtime.sendMessage.mock.calls.length).toEqual(1);
    expect(chrome.runtime.sendMessage.mock.calls[0]).toContain({ type: 'launchAuthorize' });
  });

  it('Oauth callback calls onTokenFailed', function() {
    loginButton.oauthCallback({ err: true, status: 401, response: '{}' });
    expect(onTokenFailedMock.mock.calls.length).toEqual(1);
    expect(onTokenFailedMock.mock.calls[0]).toEqual([401, '{}']);
  });

  it('Oauth callback calls onTokenSuccess', function() {
    loginButton.oauthCallback({ err: false, status: 200, response: '{foo: 1}' });
    expect(onTokenSuccessMock.mock.calls.length).toEqual(1);
    expect(onTokenSuccessMock.mock.calls[0]).toEqual(['{foo: 1}']);
  });
});