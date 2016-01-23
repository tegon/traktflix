var ViewingActivityParser = require('../../app/scripts/src/content/viewing-activity-parser.js');
var ViewingActivity = require('../../app/scripts/src/content/viewing-activity.js');
var moment = require('moment');

describe('ViewingActivityParser', function() {
  beforeEach(function() {
    ViewingActivityParser();
  });

  describe('parse', function() {
    it('creates the activity when synced_at is undefined', function() {
      var activity = ViewingActivityParser.parse(moment(undefined, "YYYY-MM-DDTHH:mm:ss.SSSSZ"), window.movieActivity);
      expect(activity instanceof ViewingActivity).toBeTruthy();
    });

    it('creates the activity when synced_at equals to item date', function() {
      var activity = ViewingActivityParser.parse(moment('10/1/2015', 'M/D/YYYY'), window.episodeActivity);
      expect(activity instanceof ViewingActivity).toBeTruthy();
    });

    it('does not create the activity when synced_at is less than item date', function() {
      var activity = ViewingActivityParser.parse(moment('10/20/2015', 'M/D/YYYY'), window.movieActivity);
      expect(activity).toBeUndefined();
    });

    it('creates the movie activity', function() {
      var activity = ViewingActivityParser.parse(moment('10/01/2015', 'M/D/YYYY'), window.movieActivity);
      expect(activity.item.title).toBe('Bad Boys');
      expect(activity.item.type).toBe('movie');
      expect(activity.date.valueOf()).toEqual(moment(1444687200000).valueOf());
      expect(activity.item.scrubber).toBe(undefined);
    });

    it('creates the episode activity', function() {
      var activity = ViewingActivityParser.parse(moment('09/01/2015', 'M/D/YYYY'), window.episodeActivity);
      expect(activity.item.title).toBe('How I Met Your Mother');
      expect(activity.item.type).toBe('show');
      expect(activity.item.epTitle).toBe('Pilot');
      expect(activity.item.season).toBe(1);
      expect(activity.item.episode).toBe(undefined);
      expect(activity.date.valueOf()).toEqual(moment(1443736800000).valueOf());
      expect(activity.item.scrubber).toBe(undefined);
    });
  });

  describe('start', function() {
    var callback = sinon.spy();

    beforeEach(function() {
      if (ViewingActivityParser.start.restore) {
        ViewingActivityParser.start.restore();
      }
    });

    afterEach(function() {
      callback.reset();
    });

    it('returns an empty array when there are no activities', function() {
      ViewingActivityParser.start({
        callback: callback, data: '{"viewedItems": []}', syncedAt: '2015-09-01T00:00:00.000Z'
      });
      expect(callback.callCount).toBe(1);
      expect(callback.getCall(0).args).toEqual([[]]);
    });

    it('returns all the activities parsed', function() {
      ViewingActivityParser.start({
        callback: callback, data: window.viewingActivityList(), syncedAt: '2015-09-01T00:00:00.000Z'
      });
      expect(callback.callCount).toBe(1);
      expect(callback.getCall(0).args[0].length).toBe(10);
    });
  });
});
