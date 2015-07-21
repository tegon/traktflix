jest.dontMock('../../../app/scripts/src/popup/components/button');

var React = require('react/addons');
var Button = require('../../../app/scripts/src/popup/components/button');
var helper = require('../../test-helper.js');
var TestUtils = React.addons.TestUtils;
var button = TestUtils.renderIntoDocument(<Button text={'Test'} url={'http://foo.bar'} />);

describe('Button', function() {
  it('Text content equals props.text', function() {
    expect('Test').toEqual(button.getDOMNode().textContent);
  });

  it('Has the correct html classes', function() {
    expect(button.getDOMNode().className).toBe('mdl-button mdl-js-button mdl-button--primary');
  });

  it('Creates a tab with props.url when clicked', function() {
    React.addons.TestUtils.Simulate.click(button.getDOMNode());
    expect(chrome.tabs.create.mock.calls.length).toEqual(1);
    expect(chrome.tabs.create.mock.calls[0]).toEqual([{ url: 'http://foo.bar', active: true }])
  });
});