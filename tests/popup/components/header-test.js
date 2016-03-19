var React = require('react/addons');
var Header = require('../../../app/scripts/src/popup/components/header');
var TestUtils = React.addons.TestUtils;
var logoutClicked = sinon.stub();
var header = TestUtils.renderIntoDocument(<Header logged={true} logoutClicked={logoutClicked} />);
var nav = TestUtils.findRenderedDOMComponentWithTag(header, 'nav');

describe('Header', function() {
  it('Calls on logoutClicked function', function() {
    React.addons.TestUtils.Simulate.click(nav.getDOMNode().children[2]);
    expect(logoutClicked.callCount).toEqual(1);
  });

  it('has the correct html classes', function() {
    var headerTag = TestUtils.findRenderedDOMComponentWithTag(header, 'header');
    var headerRow = TestUtils.findRenderedDOMComponentWithClass(header, 'mdl-layout__header-row');
    var title = TestUtils.findRenderedDOMComponentWithTag(header, 'span');
    var spacer = TestUtils.findRenderedDOMComponentWithClass(header, 'mdl-layout-spacer');
    expect(headerTag.getDOMNode().className).toBe('mdl-layout__header mdl-shadow--7dp');
    expect(headerRow.getDOMNode().className).toBe('mdl-layout__header-row');
    expect(title.getDOMNode().className).toBe('mdl-layout-title');
    expect(spacer.getDOMNode().className).toBe('mdl-layout-spacer');
    expect(nav.getDOMNode().className).toBe('mdl-navigation');
  });
});
