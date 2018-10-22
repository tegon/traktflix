import chrome from 'sinon-chrome/extensions';
import sinon from 'sinon';
import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import TestUtils from 'react-dom/test-utils';
import Header from '../../src/class/popup/Header';

global.chrome = chrome;

const logoutClicked = sinon.stub();
const header = TestUtils.renderIntoDocument(
  <Router>
    <Header logged={true} logoutClicked={logoutClicked}/>
  </Router>
);
const nav = TestUtils.findRenderedDOMComponentWithTag(header, `nav`);

chrome.flush();
delete global.chrome;

describe(`Header`, () => {
  it(`calls onLogoutClicked function`, () => {
    TestUtils.Simulate.click(nav.children[3]);
    expect(logoutClicked.callCount).toEqual(1);
  });

  it(`has the correct html classes`, () => {
    const headerTag = TestUtils.findRenderedDOMComponentWithTag(header, `header`);
    const headerRow = TestUtils.findRenderedDOMComponentWithClass(header, `mdl-layout__header-row`);
    const title = TestUtils.findRenderedDOMComponentWithTag(header, `span`);
    expect(headerTag.className).toBe(`mdl-layout__header mdl-shadow--7dp`);
    expect(headerRow.className).toBe(`mdl-layout__header-row`);
    expect(title.className).toBe(`mdl-layout-title`);
    expect(nav.className).toBe(`mdl-navigation`);
  });
});
