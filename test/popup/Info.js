import chrome from 'sinon-chrome';
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import Info from '../../src/class/popup/Info';

global.chrome = chrome;

const messages = [`Info Message`, `About Message`];
const info = TestUtils.renderIntoDocument(
  <Info messages={messages}/>
);

describe(`Info`, () => {
  beforeAll(() => {
    global.chrome = chrome;
  });

  it(`returns random message`, () => {
    const h4 = TestUtils.findRenderedDOMComponentWithTag(info, `h4`);
    expect(messages).toContain(h4.textContent);
  });

  it(`has the correct html classes`, () => {
    const card = TestUtils.findRenderedDOMComponentWithClass(info, `mdl-card mdl-shadow--2dp info-card`);
    const cardTitle = TestUtils.findRenderedDOMComponentWithClass(info, `mdl-card__title mdl-card--expand`);
    expect(card.className).toBe(`mdl-card mdl-shadow--2dp info-card`);
    expect(cardTitle.className).toBe(`mdl-card__title mdl-card--expand`);
  });

  it(`sends analytics appView`, () => {
    expect(chrome.runtime.sendMessage.callCount).toEqual(1);
    expect(chrome.runtime.sendMessage.getCall(0).args).toEqual([{
      type: `sendAppView`, view: `Info`
    }]);
  });

  afterAll(() => {
    chrome.flush();
    delete global.chrome;
  });
});