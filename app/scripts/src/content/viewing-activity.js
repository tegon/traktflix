'use strict';

var Request = require('../request.js');
var Settings = require('../settings.js');
var Item = require('./item.js');

function ViewingActivity(options) {
};

ViewingActivity.prototype = {
  sync: function() {
    chrome.runtime.sendMessage({ type: 'getLastSyncedAt' }, function(data) {
      if (!data.synced_at || new Date() > new Date(data.synced_at)) {

      }
    });
  },

  list: function() {
    Request.send({
      method: 'GET',
      url: 'https://www.netflix.com/WiViewingActivity',
      success: function(response) {
        var parser = new DOMParser();
        var html = parser.parseFromString(response, 'text/html');
        window.html = html;
        var viewingActivity = html.getElementById('viewingactivity');
        var activities = viewingActivity.getElementsByTagName('li');
        for (var i = 0; i < activities.length; i++) {
          var item;
          var activity = activities[i];
          var type = !!activity.attributes['data-series'].value ? 'show' : 'movie';
          var date = activity.querySelector('.date').textContent;
          var title = activity.querySelector('.title').textContent;

          if (type === 'show') {
            var splittedTitle = title.split(':');
            var title = splittedTitle[0];
            var season = splittedTitle[1].match(/\d+/g);
            if (season) {
              season = season[0];
            }
            var epTitle = splittedTitle[2].trim();

            item = new Item({
              epTitle: epTitle,
              title: title,
              season: season,
              type: type
            });
          } else {
            item = new Item({ title: title, type: type });
          }

          console.log('item', item);
        };
      },
      error: function(resp, status) {
        console.log('error', resp, status);
      }
    });
  },
};

module.exports = ViewingActivity;