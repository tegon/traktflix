var React = require('react/addons');
var Watching = require('../../../app/scripts/src/popup/components/watching');
var TestUtils = React.addons.TestUtils;
var item = { title: 'Item title', images: { poster: { thumb: 'http://images.foo/poster' } } };
var watching = TestUtils.renderIntoDocument(<Watching item={item} />);

describe('Watching', function() {
  it('Text content equals props.item.title', function() {
    var span = TestUtils.findRenderedDOMComponentWithTag(watching, 'span');
    expect(item.title).toContain(span.getDOMNode().textContent);
  });

  it('Card div must have thumb in background style', function() {
    var card = TestUtils.findRenderedDOMComponentWithClass(watching, 'mdl-card mdl-shadow--2dp watching-card-thumb');
    expect(card.getDOMNode().style['background-image']).toContain('https://trakt.tv/assets/placeholders/thumb/poster-2d5709c1b640929ca1ab60137044b152.png');
  });

  it('Has the correct html classes', function() {
    var card = TestUtils.findRenderedDOMComponentWithClass(watching, 'mdl-card mdl-shadow--2dp watching-card-thumb');
    var cardTitle = TestUtils.findRenderedDOMComponentWithClass(watching, 'mdl-card__title mdl-card--expand');
    var cardActions = TestUtils.findRenderedDOMComponentWithClass(watching, 'mdl-card__actions');
    var thumbTitle = TestUtils.findRenderedDOMComponentWithClass(watching, 'watching-card-thumb__title');
    expect(card.getDOMNode().className).toBe('mdl-card mdl-shadow--2dp watching-card-thumb');
    expect(cardTitle.getDOMNode().className).toBe('mdl-card__title mdl-card--expand');
    expect(cardActions.getDOMNode().className).toBe('mdl-card__actions');
    expect(thumbTitle.getDOMNode().className).toBe('watching-card-thumb__title');
  });

  it('Sends analytics appView', function() {
    var watching = TestUtils.renderIntoDocument(<Watching item={item} />);
    expect(chrome.runtime.sendMessage.callCount).toEqual(1);
    expect(chrome.runtime.sendMessage.getCall(0).args).toEqual([{
      type: 'sendAppView', view: 'Watching ' + item.title
    }]);
  });

  it('When item does not have an poster image, screenshot is used', function() {
    var item = { title: 'Item title', images: { screenshot: { thumb: 'http://images.foo/screenshot' } } };
    var watching = TestUtils.renderIntoDocument(<Watching item={item} />);
    var card = TestUtils.findRenderedDOMComponentWithClass(watching, 'mdl-card mdl-shadow--2dp watching-card-thumb');
    expect(card.getDOMNode().style['background-image']).toContain('https://trakt.tv/assets/placeholders/thumb/poster-2d5709c1b640929ca1ab60137044b152.png');
  });
});
