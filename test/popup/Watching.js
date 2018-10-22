import chrome from 'sinon-chrome/extensions';
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import Watching from '../../src/class/popup/Watching';

global.chrome = chrome;

const itemPoster = {title: `Item title`, images: {poster: {thumb: `http://images.foo/screenshot`}}};
const watchingPoster = TestUtils.renderIntoDocument(
  <Watching item={itemPoster}/>
);
const itemScreenshot = {title: `Item title`, images: {background: {thumb: `http://images.foo/screenshot`}}};
const watchingScreenshot = TestUtils.renderIntoDocument(
  <Watching item={itemScreenshot}/>
);

describe(`Watching`, () => {
  beforeAll(() => {
    global.chrome = chrome;
  });

  it(`text content equals props.item.title`, () => {
    const span = TestUtils.findRenderedDOMComponentWithTag(watchingPoster, `span`);
    expect(itemPoster.title).toContain(span.textContent);
  });

  it(`card div must have thumb in background style`, () => {
    const card = TestUtils.findRenderedDOMComponentWithClass(watchingPoster, `mdl-card mdl-shadow--2dp watching-card-thumb`);
    expect(card.style[`background-image`]).toContain(`https://trakt.tv/assets/placeholders/thumb/poster-2d5709c1b640929ca1ab60137044b152.png`);
  });

  it(`when item does not have a poster image, screenshot is used`, () => {
    const card = TestUtils.findRenderedDOMComponentWithClass(watchingScreenshot, `mdl-card mdl-shadow--2dp watching-card-thumb`);
    expect(card.style[`background-image`]).toContain(`https://trakt.tv/assets/placeholders/thumb/poster-2d5709c1b640929ca1ab60137044b152.png`);
  });

  it(`has the correct html classes`, () => {
    const card = TestUtils.findRenderedDOMComponentWithClass(watchingPoster, `mdl-card mdl-shadow--2dp watching-card-thumb`);
    const cardTitle = TestUtils.findRenderedDOMComponentWithClass(watchingPoster, `mdl-card__title mdl-card--expand`);
    const cardActions = TestUtils.findRenderedDOMComponentWithClass(watchingPoster, `mdl-card__actions`);
    const thumbTitle = TestUtils.findRenderedDOMComponentWithClass(watchingPoster, `watching-card-thumb__title`);
    expect(card.className).toBe(`mdl-card mdl-shadow--2dp watching-card-thumb`);
    expect(cardTitle.className).toBe(`mdl-card__title mdl-card--expand`);
    expect(cardActions.className).toBe(`mdl-card__actions`);
    expect(thumbTitle.className).toBe(`watching-card-thumb__title`);
  });

  it(`sends analytics appView`, () => {
    expect(chrome.runtime.sendMessage.callCount).toEqual(2);
    expect(chrome.runtime.sendMessage.getCall(0).args).toEqual([{
      type: `sendAppView`, view: `Watching ${itemPoster.title}`
    }]);
    expect(chrome.runtime.sendMessage.getCall(1).args).toEqual([{
      type: `sendAppView`, view: `Watching ${itemScreenshot.title}`
    }]);
  });

  afterAll(() => {
    chrome.flush();
    delete global.chrome;
  });
});
