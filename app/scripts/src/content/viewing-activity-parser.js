'use strict';

var ViewingActivity = require('./viewing-activity.js');
var Item = require('./item.js');

function ViewingActivityParser() {}

ViewingActivityParser.parse = function(syncedAt, activity) {
  var date = new Date(activity.querySelector('.date').textContent);
  date.setHours(0, 0, 0, 0);

  if (isNaN(syncedAt.getTime()) || date >= syncedAt) {
    var item;
    var type = !!activity.attributes['data-series'].value ? 'show' : 'movie';
    var title = activity.querySelector('.title').textContent;

    if (type === 'show') {
      var splittedTitle = title.split(':');
      var title = splittedTitle[0];
      var season = splittedTitle[1].match(/\d+/g);
      if (season) {
        season = parseInt(season[0]);
      } else {
        return;
      }
      var epTitle = splittedTitle[2].trim().replace('"', '').replace('"', '');

      item = new Item({
        epTitle: epTitle,
        title: title,
        season: season,
        type: type
      });
    } else {
      item = new Item({ title: title, type: type });
    }

    return new ViewingActivity({ item: item, date: date });
  }
};

ViewingActivityParser.start = function(options) {
  var parser = new DOMParser();
  var html = parser.parseFromString(options.data, 'text/html');
  var viewingActivity = html.getElementById('viewingactivity');
  var activities = viewingActivity.getElementsByTagName('li');
  var parsedActivities = [];
  var lastSync = new Date(options.syncedAt);
  lastSync.setHours(0, 0, 0, 0);

  for (var i = 0; i < activities.length; i++) {
    var activity = ViewingActivityParser.parse(lastSync, activities[i]);

    if (activity !== undefined) {
      parsedActivities.push(activity);
    }
  }

  options.callback.call(this, parsedActivities.slice(0, 10));
};

module.exports = ViewingActivityParser;