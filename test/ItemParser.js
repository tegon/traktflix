import sinon from 'sinon';
import ItemParser from '../src/class/ItemParser';
import NetflixApiUtils from '../src/class/NetflixApiUtils';

describe(`ItemParser`, () => {
  before(() => {
    sinon.spy(ItemParser, `isReady`);
  });

  beforeEach(() => {
    sinon.stub(NetflixApiUtils, `getSession`).resolves();
  });

  afterEach(() => {
    ItemParser.isReady.resetHistory();
    NetflixApiUtils.getSession.restore();
  });

  after(() => {
    ItemParser.isReady.restore();
  });

  it(`isReady() returns true when the URL indicates that the user is watching something`, async () => {
    const url = `/watch/12345678`;
    sinon.stub(ItemParser, `getLocation`).returns(url);
    expect(await ItemParser.isReady()).to.be.true;
    expect(ItemParser.getLocation.callCount).to.equal(1);
    expect(ItemParser.getLocation.returnValues[0]).to.equal(url);
    ItemParser.getLocation.restore();
  });

  it(`isReady() returns false when the URL indicates that the user is not watching something`, async () => {
    const url = `/browse`;
    sinon.stub(ItemParser, `getLocation`).returns(url);
    expect(await ItemParser.isReady()).to.be.false;
    expect(ItemParser.getLocation.callCount).to.equal(1);
    expect(ItemParser.getLocation.returnValues[0]).to.equal(url);
    ItemParser.getLocation.restore();
  });

  it(`start() resolves immediately`, async () => {
    sinon.stub(ItemParser, `getLocation`).returns(`/watch/12345678`);
    sinon.stub(NetflixApiUtils, `getMetadata`).withArgs(`12345678`).resolves(`Test`);
    const result = await ItemParser.start();
    expect(ItemParser.isReady.callCount).to.equal(1);
    expect(NetflixApiUtils.getMetadata.callCount).to.equal(1);
    expect(NetflixApiUtils.getMetadata.args[0]).to.deep.equal([`12345678`]);
    expect(result).to.equal(`Test`);
    NetflixApiUtils.getMetadata.restore();
    ItemParser.getLocation.restore();
  });

  it(`start() waits until the URL changes`, async () => {
    const stub = sinon.stub(ItemParser, `getLocation`);
    stub.returns(`/browse`);
    sinon.stub(NetflixApiUtils, `getMetadata`).withArgs(`12345678`).resolves(`Test`);
    setTimeout(() => {
      stub.returns(`/watch/12345678`);
    }, 500);
    const result = await ItemParser.start();
    expect(ItemParser.isReady.callCount).to.equal(2);
    expect(NetflixApiUtils.getMetadata.callCount).to.equal(1);
    expect(NetflixApiUtils.getMetadata.args[0]).to.deep.equal([`12345678`]);
    expect(result).to.equal(`Test`);
    NetflixApiUtils.getMetadata.restore();
    ItemParser.getLocation.restore();
  });

  it(`start() does not detect a URL change after timeout`, done => {
    sinon.stub(ItemParser, `getLocation`).returns(`/browse`);
    sinon.stub(NetflixApiUtils, `getMetadata`);
    ItemParser.start();
    setTimeout(() => {
      expect(NetflixApiUtils.getMetadata.callCount).to.equal(0);
      NetflixApiUtils.getMetadata.restore();
      ItemParser.getLocation.restore();
      done();
    }, 500);
  });
});