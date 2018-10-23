import sinon from 'sinon';
import ItemParser from '../src/class/ItemParser';

const callback = sinon.spy();

describe(`ItemParser`, () => {
  beforeEach(() => {
    callback.resetHistory();
  });

  it(`isReady() returns true when URL indicates the user is watching something`, () => {
    sinon.stub(ItemParser, `getLocation`).returns(`/watch/12345678`);
    expect(ItemParser.isReady()).toBeTruthy();
    ItemParser.getLocation.restore();
  });

  it(`isReady() returns false when URL indicates the user is not watching something`, () => {
    sinon.stub(ItemParser, `getLocation`).returns(`/browse`);
    expect(ItemParser.isReady()).toBeFalsy();
    ItemParser.getLocation.restore();
  });

  it(`start() waits until the URL changes`, done => {
    sinon.stub(ItemParser, `getLocation`).returns(`/browse`);
    ItemParser.start(callback);
    ItemParser.getLocation.restore();
    sinon.stub(ItemParser, `parse`).callsFake(callback => callback());
    sinon.stub(ItemParser, `getLocation`).returns(`/watch/12345678`);
    setTimeout(() => {
      expect(ItemParser.isReady()).toBeTruthy();
      expect(callback.callCount).toBe(1);
      ItemParser.getLocation.restore();
      ItemParser.parse.restore();
      done();
    }, 500);
  });

  it(`start() does not find a matching URL after timeout`, done => {
    sinon.stub(ItemParser, `getLocation`).returns(`/browse`);
    ItemParser.start(callback);
    setTimeout(() => {
      expect(ItemParser.isReady()).toBeFalsy();
      expect(callback.callCount).toBe(0);
      ItemParser.getLocation.restore();
      done();
    }, 500);
  });
});
