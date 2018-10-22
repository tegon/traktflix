import sinon from 'sinon';
import Item from '../src/class/Item';
import ItemParser from '../src/class/ItemParser';
import NetflixTestUtils from '../test-helpers/NetflixTestHelper';

const callback = sinon.spy();

describe(`ItemParser`, () => {
  beforeEach(() => {
    document.body.innerHTML = ``;
    callback.resetHistory();
  });

  it(`isReady() returns true when player is on page`, () => {
    NetflixTestUtils.renderPlayer(`show`);
    expect(ItemParser.isReady()).toBeTruthy();
  });

  it(`isReady() returns false when player is not on page`, () => {
    expect(ItemParser.isReady()).toBeFalsy();
  });

  it(`start() waits until player arrives on page`, done => {
    ItemParser.start(callback);
    NetflixTestUtils.renderPlayer(`show`);
    setTimeout(() => {
      expect(ItemParser.isReady()).toBeTruthy();
      expect(callback.callCount).toBe(1);
      done();
    }, 500);
  });

  it(`start() does not find player after timeout`, done => {
    ItemParser.start(callback);
    setTimeout(() => {
      expect(ItemParser.isReady()).toBeFalsy();
      expect(callback.callCount).toBe(0);
      done();
    }, 500);
  });

  it(`parse() returns a show item when player has episodes selector`, () => {
    NetflixTestUtils.renderPlayer(`show`);
    ItemParser.start(callback);
    expect(callback.callCount).toBe(1);
    const item = new Item({
      epTitle: `Pilot`,
      title: `The Flash`,
      season: `1`,
      episode: `1`,
      type: `show`
    });
    expect(callback.getCall(0).args).toEqual([item]);
  });

  it(`parse() returns a movie item when player does not have episodes selector`, () => {
    NetflixTestUtils.renderPlayer(`movie`);
    ItemParser.start(callback);
    expect(callback.callCount).toBe(1);
    const item = new Item({
      title: `Ant-Man`,
      type: `movie`
    });
    expect(callback.getCall(0).args).toEqual([item]);
  });
});
