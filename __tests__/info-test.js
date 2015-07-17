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
});