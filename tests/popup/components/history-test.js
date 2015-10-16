var React = require('react/addons');
var History = require('../../../app/scripts/src/popup/components/history.js');
var ChromeStorage = require('../../../app/scripts/src/chrome-storage.js');
var TestUtils = React.addons.TestUtils;
var onSyncNowClicked = sinon.stub();
var onAutoSyncChanged = sinon.stub();
var componentHandler = { upgradeDom: sinon.stub() };
var history = TestUtils.renderIntoDocument(
  <History onSyncNowClicked={onSyncNowClicked} loading={true}
    componentHandler={componentHandler} onAutoSyncChanged={onAutoSyncChanged} />
);

describe('History', function() {
  beforeEach(function() {
    onSyncNowClicked.reset();
    onAutoSyncChanged.reset();
    chrome.runtime.sendMessage.reset();
    ChromeStorage.set.reset();
  });

  it('Has the correct html classes', function() {
    var historyCard = TestUtils.findRenderedDOMComponentWithClass(history, 'mdl-card mdl-shadow--2dp info-card history-card');
    var cardTitle = TestUtils.findRenderedDOMComponentWithClass(history, 'mdl-card__title mdl-card--expand');
    var checkBox = TestUtils.findRenderedDOMComponentWithClass(history, 'mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect');
    var input = TestUtils.findRenderedDOMComponentWithClass(history, 'mdl-checkbox__input');
    var span = TestUtils.findRenderedDOMComponentWithClass(history, 'mdl-checkbox__label');
    var button = TestUtils.findRenderedDOMComponentWithClass(history, 'mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect');
    expect(historyCard.getDOMNode().className).toBe('mdl-card mdl-shadow--2dp info-card history-card');
    expect(cardTitle.getDOMNode().className).toBe('mdl-card__title mdl-card--expand');
    expect(checkBox.getDOMNode().className).toBe('mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect');
    expect(input.getDOMNode().className).toBe('mdl-checkbox__input');
    expect(span.getDOMNode().className).toBe('mdl-checkbox__label');
    expect(button.getDOMNode().className).toBe('mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect');
  });

  it('Sends analytics appView', function() {
    var history = TestUtils.renderIntoDocument(
      <History onSyncNowClicked={onSyncNowClicked} loading={false}
        componentHandler={componentHandler} onAutoSyncChanged={onAutoSyncChanged} />
    );
    expect(chrome.runtime.sendMessage.callCount).toEqual(1);
    expect(chrome.runtime.sendMessage.getCall(0).args).toEqual([{
      type: 'sendAppView', view: 'History'
    }]);
  });

  it('When button is clicked, props.onSyncNowClicked is called', function() {
    var button = TestUtils.findRenderedDOMComponentWithClass(history, 'mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect');
    React.addons.TestUtils.Simulate.click(button);
    expect(onSyncNowClicked.callCount).toEqual(1);
  });

  it('When auto sync is changed, props.onAutoSyncChanged and ChromeStorage.set are called', function() {
    var input = TestUtils.findRenderedDOMComponentWithClass(history, 'mdl-checkbox__input');
    React.addons.TestUtils.Simulate.change(input);
    expect(onAutoSyncChanged.callCount).toEqual(1);
    expect(ChromeStorage.set.callCount).toEqual(1);
    expect(ChromeStorage.set.getCall(0).args[0]).toEqual({ 'auto_sync': false });
  });
});