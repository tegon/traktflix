import {mount} from '../../test-helpers/EnzymeHelper';
import chrome from 'sinon-chrome/extensions';
import React from 'react';
import Button from '../../src/class/popup/Button';

global.chrome = chrome;

const component = mount(
  <Button text={'Test'} url={'http://foo.bar'}/>
);
const button = component.find(`button`);

chrome.flush();
delete global.chrome;

describe(`Button`, () => {
  before(() => {
    global.chrome = chrome;
  });

  after(() => {
    component.unmount();
    chrome.flush();
    delete global.chrome;
  });

  it(`has the correct html classes`, () => {
    expect(button.hasClass(`mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect`)).to.be.true;
  });

  it(`text content equals props.text`, () => {
    expect(button.text()).to.equal(`Test`);
  });

  it(`creates a tab with props.url when clicked`, () => {
    button.prop(`onClick`)();
    expect(chrome.tabs.create.callCount).to.equal(1);
    expect(chrome.tabs.create.args[0]).to.deep.equal([{url: `http://foo.bar`, active: true}]);
  });
});