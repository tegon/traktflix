var React = require('react/addons');
var Loading = require('../../../app/scripts/src/popup/components/loading');
var TestUtils = React.addons.TestUtils;
var loading = TestUtils.renderIntoDocument(<Loading show={true} />);

describe('Loading', function() {
  it('When props.show is true, spinner-wrapper has display: block style', function() {
    var spinnerWrapper = TestUtils.findRenderedDOMComponentWithClass(loading, 'spinner-wrapper');
    expect(spinnerWrapper.getDOMNode().style['display']).toBe('block');
  });

  it('When props.show is false, spinner-wrapper has display: none style', function() {
    var loading = TestUtils.renderIntoDocument(<Loading show={false} />);
    var spinnerWrapper = TestUtils.findRenderedDOMComponentWithClass(loading, 'spinner-wrapper');
    expect(spinnerWrapper.getDOMNode().style['display']).toBe('none');
  });

  it('Has the correct html classes', function() {
    var spinnerWrapper = TestUtils.findRenderedDOMComponentWithClass(loading, 'spinner-wrapper');
    var spinner = TestUtils.findRenderedDOMComponentWithClass(loading, 'mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active');
    expect(spinnerWrapper.getDOMNode().className).toBe('spinner-wrapper');
    expect(spinner.getDOMNode().className).toBe('mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active');
  });
});