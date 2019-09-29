import { mount } from '../../test-helpers/EnzymeHelper';
import browser from 'sinon-chrome';
import React from 'react';
import Info from '../../src/class/popup/Info';

window.browser = browser;

const messages = [`Info Message`, `About Message`];
const component = mount(
  <Info messages={messages}/>
);

delete window.browser;

describe(`Info`, () => {
  before(() => {
    window.browser = browser;
  });

  after(() => {
    component.unmount();
    browser.flush();
    delete window.browser;
  });

  it(`returns random message`, () => {
    const h4 = component.find(`h4`);
    expect(messages).to.include(h4.text());
  });

  it(`has the correct html classes`, () => {
    const card = component.find(`.mdl-card.mdl-shadow--2dp.info-card`);
    const cardTitle = component.find(`.mdl-card__title.mdl-card--expand`);
    expect(card.hasClass(`mdl-card mdl-shadow--2dp info-card`)).to.be.true;
    expect(cardTitle.hasClass(`mdl-card__title mdl-card--expand`)).to.be.true;
  });
});