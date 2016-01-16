var ViewingActivity = require('../../app/scripts/src/content/viewing-activity.js');
var Item = require('../../app/scripts/src/content/item.js');
var rocky = new Item({ title: 'Rocky', type: 'movie' });
var date = new Date();
var success = sinon.spy();
var error = sinon.spy();

describe('ViewingActivity', function() {
  beforeEach(function() {
    this.xhr = sinon.useFakeXMLHttpRequest();
    var requests = this.requests = [];
    this.xhr.onCreate = function (xhr) {
      requests.push(xhr);
    };

    beforeEach(function() {
      if (ViewingActivity.list.restore) {
        ViewingActivity.list.restore();
      }
    });
  });

  afterEach(function() {
    this.xhr.restore();
    success.reset();
    error.reset();
  });

  it('constructor sets item and date', function() {
    var activity = new ViewingActivity({ item: rocky, date: date });
    expect(activity.item).toBe(rocky);
    expect(activity.date).toBe(date);
  });

  it('list calls success callback', function() {
    ViewingActivity.list({ success: success, error: error });
    expect(this.requests.length).toBe(1);
    this.requests[0].respond(200, { 'Content-Type': 'text/html' },
      window.activityPage());
    this.requests[1].respond(200, { 'Content-Type': 'application/json' },
      window.viewingActivityList());
    expect(success.callCount).toBe(1);
    expect(success.getCall(0).args).toEqual([window.viewingActivityList()]);
  });

  it('list calls error callback', function() {
    ViewingActivity.list({ success: success, error: error });
    expect(this.requests.length).toBe(1);
    this.requests[0].respond(404, { 'Content-Type': 'text/html' }, '');
    expect(error.callCount).toBe(1);
    expect(error.getCall(0).args).toEqual([404, '']);
  });
});