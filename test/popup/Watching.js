import {mount} from '../../test-helpers/EnzymeHelper';
import chrome from 'sinon-chrome/extensions';
import React from 'react';
import Watching from '../../src/class/popup/Watching';

global.chrome = chrome;

const item = {title: `Test`};
const component = mount(
  <Watching item={item}/>
);

describe(`Watching`, () => {
  before(() => {
    global.chrome = chrome;
  });

  after(() => {
    component.unmount();
    chrome.flush();
    delete global.chrome;
  });

  it(`sends analytics appView`, () => {
    expect(chrome.runtime.sendMessage.callCount).to.equal(1);
    expect(chrome.runtime.sendMessage.args[0]).to.deep.equal([{
      type: `sendAppView`, view: `Watching ${item.title}`
    }]);
  });

  it(`has the correct html classes`, () => {
    const card = component.find(`.mdl-card.mdl-shadow--2dp.watching-card-thumb`).hostNodes();
    const cardTitle = component.find(`.mdl-card__title.mdl-card--expand`);
    const cardActions = component.find(`.mdl-card__actions`);
    const thumbTitle = component.find(`.watching-card-thumb__title`);
    expect(card.hasClass(`mdl-card mdl-shadow--2dp watching-card-thumb`)).to.be.true;
    expect(cardTitle.hasClass(`mdl-card__title mdl-card--expand`)).to.be.true;
    expect(cardActions.hasClass(`mdl-card__actions`)).to.be.true;
    expect(thumbTitle.hasClass(`watching-card-thumb__title`)).to.be.true;
  });

  it(`text content equals props.item.title`, () => {
    const span = component.find(`span`);
    expect(span.text()).to.equal(item.title);
  });

  it(`card div must have thumb in background style`, () => {
    const card = component.find(`.mdl-card.mdl-shadow--2dp.watching-card-thumb`).hostNodes();
    expect(card.getDOMNode().style.backgroundImage).to.equal(`url("https://trakt.tv/assets/placeholders/thumb/poster-2d5709c1b640929ca1ab60137044b152.png")`);
  });
});
