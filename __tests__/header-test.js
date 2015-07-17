jest.dontMock('../app/scripts/src/header.jsx');

var React = require('react/addons');
var Header = require('../app/scripts/src/header.jsx');
var TestUtils = React.addons.TestUtils;

describe('Header', function() {
  it('Renders the items', function() {
    var items = [{ name: 'Foo', show: true }, { name: 'Bar', show: true }];
    var clickMock = jest.genMockFunction();
    var header = TestUtils.renderIntoDocument(<Header items={items} onItemClicked={clickMock} />);
    var nav = TestUtils.findRenderedDOMComponentWithTag(header, 'nav');
    items.map(function(item, index) {
      expect(item.name).toBe(nav.getDOMNode().children[index].textContent)
    });
  });

  it('Does not render items with show: false', function() {
    var items = [{ name: 'Foo', show: true }, { name: 'Bar', show: false }];
    var clickMock = jest.genMockFunction();
    var header = TestUtils.renderIntoDocument(<Header items={items} onItemClicked={clickMock} />);
    var nav = TestUtils.findRenderedDOMComponentWithTag(header, 'nav');
    items.map(function(item, index) {
      if (item.show) {
        expect(nav.getDOMNode().children[index].style.display).toBe('block');
      } else {
        expect(nav.getDOMNode().children[index].style.display).toBe('none');
      }
    });
  });

  it('has the correct html classes', function() {
    var items = [{ name: 'Foo', show: true }, { name: 'Bar', show: false }];
    var clickMock = jest.genMockFunction();
    var header = TestUtils.renderIntoDocument(<Header items={items} onItemClicked={clickMock} />);
    var headerTag = TestUtils.findRenderedDOMComponentWithTag(header, 'header');
    var headerRow = TestUtils.findRenderedDOMComponentWithClass(header, 'mdl-layout__header-row');
    var title = TestUtils.findRenderedDOMComponentWithTag(header, 'span');
    var spacer = TestUtils.findRenderedDOMComponentWithClass(header, 'mdl-layout-spacer');
    var nav = TestUtils.findRenderedDOMComponentWithTag(header, 'nav');
    expect(headerTag.getDOMNode().className).toBe('mdl-layout__header mdl-shadow--7dp');
    expect(headerRow.getDOMNode().className).toBe('mdl-layout__header-row');
    expect(title.getDOMNode().className).toBe('mdl-layout-title');
    expect(spacer.getDOMNode().className).toBe('mdl-layout-spacer');
    expect(nav.getDOMNode().className).toBe('mdl-navigation');
    items.map(function(item, index) {
      expect(nav.getDOMNode().children[index].className).toBe('mdl-navigation__link item-' + item.name);
    });
  });
});