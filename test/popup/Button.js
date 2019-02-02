import { mount } from '../../test-helpers/EnzymeHelper';
import browser from 'sinon-chrome';
import React from 'react';
import Button from '../../src/class/popup/Button';

window.browser = browser;

const component = mount(
  <Button text={'Test'} url={'http://foo.bar'}/>
);
const button = component.find(`button`);

browser.flush();
delete window.browser;

describe(`Button`, () => {
  before(() => {
    window.browser = browser;
  });

  after(() => {
    component.unmount();
    browser.flush();
    delete window.browser;
  });

  it(`has the correct html classes`, () => {
    expect(button.hasClass(`mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect`)).to.be.true;
  });

  it(`text content equals props.text`, () => {
    expect(button.text()).to.equal(`Test`);
  });

  it(`creates a tab with props.url when clicked`, () => {
    button.prop(`onClick`)();
    expect(browser.tabs.create.callCount).to.equal(1);
    expect(browser.tabs.create.args[0]).to.deep.equal([{url: `http://foo.bar`, active: true}]);
  });
});