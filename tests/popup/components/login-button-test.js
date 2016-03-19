var React = require('react/addons');
var Login = require('../../../app/scripts/src/popup/components/login-button');
var TestUtils = React.addons.TestUtils;
var onLoginClicked = sinon.stub();
var onTokenFailed = sinon.stub();
var onTokenSuccess = sinon.stub();
var loginButton = TestUtils.renderIntoDocument(
  <Login onLoginClicked={onLoginClicked} loading={true}
    onTokenSuccess={onTokenSuccess} onTokenFailed={onTokenFailed} />
);

describe('Login', function() {
  beforeEach(function() {
    onLoginClicked.reset();
    onTokenFailed.reset();
    onTokenSuccess.reset();
    chrome.runtime.sendMessage.reset();
  });

  it('Has the correct html classes', function() {
    var loginWrapper = TestUtils.findRenderedDOMComponentWithClass(loginButton, 'login-wrapper');
    var button = TestUtils.findRenderedDOMComponentWithClass(loginButton, 'mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect');
    expect(loginWrapper.getDOMNode().className).toBe('login-wrapper');
    expect(button.getDOMNode().className).toBe('mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect');
  });

  it('Sends analytics appView', function() {
    var loginButton = TestUtils.renderIntoDocument(
      <Login onLoginClicked={onLoginClicked} loading={false}
        onTokenSuccess={onTokenSuccess} onTokenFailed={onTokenFailed} />
    );
    expect(chrome.runtime.sendMessage.callCount).toEqual(1);
    expect(chrome.runtime.sendMessage.getCall(0).args).toEqual([{
      type: 'sendAppView', view: 'Login'
    }]);
  });

  it('When button is clicked, props.onLoginClicked and launchAuthorize are called', function() {
    var button = TestUtils.findRenderedDOMComponentWithClass(loginButton, 'mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect');
    React.addons.TestUtils.Simulate.click(button);
    expect(onLoginClicked.callCount).toEqual(1);
    expect(chrome.runtime.sendMessage.callCount).toEqual(1);
    expect(chrome.runtime.sendMessage.getCall(0).args).toContain({ type: 'launchAuthorize' });
  });

  it('Oauth callback calls onTokenFailed', function() {
    loginButton.oauthCallback({ error: true, status: 401, response: '{}' });
    expect(onTokenFailed.callCount).toEqual(1);
    expect(onTokenFailed.getCall(0).args).toEqual([401, '{}']);
  });

  it('Oauth callback calls onTokenSuccess', function() {
    loginButton.oauthCallback({ error: false, status: 200, response: '{foo: 1}' });
    expect(onTokenSuccess.callCount).toEqual(1);
    expect(onTokenSuccess.getCall(0).args).toEqual(['{foo: 1}']);
  });
});
