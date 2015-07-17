jest.dontMock('../app/scripts/src/info.jsx');

var React = require('react/addons');
var Info = require('../app/scripts/src/info.jsx');
var TestUtils = React.addons.TestUtils;

describe('Info', function() {
  it('Returns random message', function() {
    var messages = ['Info Message', 'About Message'];
    var info = TestUtils.renderIntoDocument(<Info messages={messages} />);
    var h4 = TestUtils.findRenderedDOMComponentWithTag(info, 'h4');
    expect(messages).toContain(h4.getDOMNode().textContent);
  });

  it('Has the correct html classes', function() {
    var messages = ['Info Message', 'About Message'];
    var info = TestUtils.renderIntoDocument(<Info messages={messages} />);
    var card = TestUtils.findRenderedDOMComponentWithClass(info, 'mdl-card mdl-shadow--2dp info-card');
    var cardTitle = TestUtils.findRenderedDOMComponentWithClass(info, 'mdl-card__title mdl-card--expand');
    expect(card.getDOMNode().className).toBe('mdl-card mdl-shadow--2dp info-card');
    expect(cardTitle.getDOMNode().className).toBe('mdl-card__title mdl-card--expand');
  });
});