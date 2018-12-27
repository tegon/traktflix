import {mount} from '../../test-helpers/EnzymeHelper';
import chrome from 'sinon-chrome';
import React from 'react';
import Info from '../../src/class/popup/Info';

global.chrome = chrome;

const messages = [`Info Message`, `About Message`];
const component = mount(
  <Info messages={messages}/>
);

describe(`Info`, () => {
  before(() => {
    global.chrome = chrome;
  });

  after(() => {
    component.unmount();
    chrome.flush();
    delete global.chrome;
  });

  it(`returns random message`, () => {
    const h4 = component.find(`h4`);
    expect(messages).to.include(h4.text());
  });

  it(`sends analytics appView`, () => {
    expect(chrome.runtime.sendMessage.callCount).to.equal(1);
    expect(chrome.runtime.sendMessage.args[0]).to.deep.equal([{
      type: `sendAppView`, view: `Info`
    }]);
  });

  it(`has the correct html classes`, () => {
    const card = component.find(`.mdl-card.mdl-shadow--2dp.info-card`);
    const cardTitle = component.find(`.mdl-card__title.mdl-card--expand`);
    expect(card.hasClass(`mdl-card mdl-shadow--2dp info-card`)).to.be.true;
    expect(cardTitle.hasClass(`mdl-card__title mdl-card--expand`)).to.be.true;
  });
});