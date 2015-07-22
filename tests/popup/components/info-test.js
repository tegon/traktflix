var React = require('react/addons');
var Info = require('../../../app/scripts/src/popup/components/info');
var TestUtils = React.addons.TestUtils;
var messages = ['Info Message', 'About Message'];
var info = TestUtils.renderIntoDocument(<Info messages={messages} />);

describe('Info', function() {
  beforeEach(function() {
    chrome.runtime.sendMessage.reset();
  });

  it('Returns random message', function() {
    var h4 = TestUtils.findRenderedDOMComponentWithTag(info, 'h4');
    expect(messages).toContain(h4.getDOMNode().textContent);
  });

  it('Has the correct html classes', function() {
    var card = TestUtils.findRenderedDOMComponentWithClass(info, 'mdl-card mdl-shadow--2dp info-card');
    var cardTitle = TestUtils.findRenderedDOMComponentWithClass(info, 'mdl-card__title mdl-card--expand');
    expect(card.getDOMNode().className).toBe('mdl-card mdl-shadow--2dp info-card');
    expect(cardTitle.getDOMNode().className).toBe('mdl-card__title mdl-card--expand');
  });

  it('Sends analytics appView', function() {
    var info = TestUtils.renderIntoDocument(<Info messages={messages} />);
    var h4 = TestUtils.findRenderedDOMComponentWithTag(info, 'h4');
    expect(chrome.runtime.sendMessage.callCount).toEqual(1);
    expect(chrome.runtime.sendMessage.getCall(0).args).toEqual([{
      type: 'sendAppView', view: 'Info ' + h4.getDOMNode().textContent
    }]);
  });
});