import {mount} from '../../test-helpers/EnzymeHelper';
import sinon from 'sinon';
import chrome from 'sinon-chrome/extensions';
import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Header from '../../src/class/popup/Header';

global.chrome = chrome;

const logoutClicked = sinon.stub();
const component = mount(
  <Router>
    <Header logged={true} logoutClicked={logoutClicked}/>
  </Router>
);
const nav = component.find(`nav`);

chrome.flush();
delete global.chrome;

describe(`Header`, () => {
  after(() => {
    component.unmount();
  });

  it(`has the correct html classes`, () => {
    const header = component.find(`header`);
    const row = component.find(`.mdl-layout__header-row`);
    const title = component.find(`span`);
    expect(nav.hasClass(`mdl-navigation`)).to.be.true;
    expect(header.hasClass(`mdl-layout__header mdl-shadow--7dp`)).to.be.true;
    expect(row.hasClass(`mdl-layout__header-row`)).to.be.true;
    expect(title.hasClass(`mdl-layout-title`)).to.be.true;
  });

  it(`calls onLogoutClicked function`, () => {
    nav.childAt(3).prop(`onClick`)();
    expect(logoutClicked.callCount).to.equal(1);
  });
});
