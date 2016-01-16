'use strict';

var ViewingActivity = require('./viewing-activity.js');
var Item = require('./item.js');
var moment = require('moment');

function ViewingActivityParser() {}

ViewingActivityParser.parse = function(syncedAt, activity) {
  var date = moment(activity.date);

  if (!syncedAt.isValid() || date.isSameOrAfter(syncedAt)) {
    var item;
    var type = activity.series == undefined ? 'movie' : 'show';

    if (type === 'show') {
      var title = activity.seriesTitle;
      var splittedTitle = activity.title.split(':');
      var season = splittedTitle[0].match(/\d+/g);
      if (season) {
        season = parseInt(season[0]);
      } else {
        return;
      }
      var epTitle = splittedTitle[1].trim().replace('"', '').replace('"', '');

      item = new Item({
        epTitle: epTitle,
        title: title,
        season: season,
        type: type
      });
    } else {
      item = new Item({ title: activity.title, type: type });
    }

    return new ViewingActivity({ item: item, date: date });
  }
};

ViewingActivityParser.start = function(options) {
  var res = JSON.parse(options.data);
  var viewedItems = res.viewedItems;

  var parsedActivities = [];
  var lastSync = moment(options.syncedAt, "YYYY-MM-DDTHH:mm:ss.SSSSZ");

  for (var i = 0; i < viewedItems.length; i++) {
    var activity = ViewingActivityParser.parse(lastSync, viewedItems[i]);

    if (activity !== undefined) {
      parsedActivities.push(activity);
    }
  }
  options.callback.call(this, parsedActivities.slice(0, 10));
};

module.exports = ViewingActivityParser;
