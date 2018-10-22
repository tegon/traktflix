import React from 'react';
import TestUtils from 'react-dom/test-utils';
import Loading from '../../src/class/popup/Loading';

const loadingTrue = TestUtils.renderIntoDocument(
  <Loading show={true}/>
);
const loadingFalse = TestUtils.renderIntoDocument(
  <Loading show={false}/>
);

describe(`Loading`, () => {
  it(`.spinner-wrapper has display: empty style when props.show is true`, () => {
    const spinnerWrapper = TestUtils.findRenderedDOMComponentWithClass(loadingTrue, `spinner-wrapper`);
    expect(spinnerWrapper.style[`display`]).toBe(``);
  });

  it(`.spinner-wrapper has display: none style when props.show is false`, () => {
    const spinnerWrapper = TestUtils.findRenderedDOMComponentWithClass(loadingFalse, 'spinner-wrapper');
    expect(spinnerWrapper.style[`display`]).toBe(`none`);
  });

  it(`has the correct html classes`, () => {
    const spinnerWrapper = TestUtils.findRenderedDOMComponentWithClass(loadingTrue, `spinner-wrapper`);
    const spinner = TestUtils.findRenderedDOMComponentWithClass(loadingTrue, `mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active`);
    expect(spinnerWrapper.className).toBe(`spinner-wrapper`);
    expect(spinner.className).toBe(`mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active`);
  });
});