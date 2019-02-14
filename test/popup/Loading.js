import { mount } from '../../test-helpers/EnzymeHelper';
import React from 'react';
import Loading from '../../src/class/popup/Loading';

const componentTrue = mount(
  <Loading show={true}/>
);
const componentFalse = mount(
  <Loading show={false}/>
);

describe(`Loading`, () => {
  after(() => {
    componentTrue.unmount();
    componentFalse.unmount();
  });

  it(`has the correct html classes`, () => {
    const spinnerWrapper = componentTrue.find(`.spinner-wrapper`);
    const spinner = componentTrue.find(`.mdl-spinner.mdl-spinner--single-color.mdl-js-spinner.is-active`);
    expect(spinnerWrapper.hasClass(`spinner-wrapper`)).to.be.true;
    expect(spinner.hasClass(`mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active`)).to.be.true;
  });

  it(`.spinner-wrapper has display: empty style when props.show is true`, () => {
    const spinnerWrapper = componentTrue.find(`.spinner-wrapper`);
    expect(spinnerWrapper.getDOMNode().style.display).to.equal(``);
  });

  it(`.spinner-wrapper has display: none style when props.show is false`, () => {
    const spinnerWrapper = componentFalse.find(`.spinner-wrapper`);
    expect(spinnerWrapper.getDOMNode().style.display).to.equal(`none`);
  });
});