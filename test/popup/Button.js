import chrome from 'sinon-chrome/extensions';
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import Button from '../../src/class/popup/Button';

global.chrome = chrome;

const button = TestUtils.renderIntoDocument(
  <Button text={'Test'} url={'http://foo.bar'}/>
);
const buttonTag = TestUtils.findRenderedDOMComponentWithTag(button, `button`);

chrome.flush();
delete global.chrome;

describe(`Button`, () => {
  beforeAll(() => {
    global.chrome = chrome;
  });

  it(`text content equals props.text`, () => {
    expect(`Test`).toEqual(buttonTag.textContent);
  });

  it(`has the correct html classes`, () => {
    expect(buttonTag.className).toBe(`mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect`);
  });

  it(`creates a tab with props.url when clicked`, () => {
    TestUtils.Simulate.click(buttonTag);
    expect(chrome.tabs.create.callCount).toEqual(1);
    expect(chrome.tabs.create.getCall(0).args).toEqual([{url: `http://foo.bar`, active: true}]);
  });

  afterAll(() => {
    chrome.flush();
    delete global.chrome;
  });
});