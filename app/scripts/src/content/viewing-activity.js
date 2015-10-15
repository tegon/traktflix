'use strict';

var Request = require('../request.js');

function ViewingActivity(options) {
  this.item = options.item;
  this.date = options.date;
  this.url = 'https://www.netflix.com/WiViewingActivity';
}

ViewingActivity.list = function(options) {
  Request.send({
    method: 'GET',
    url: this.url,
    success: function(response) {
      options.success.call(this, response);
    },
    error: function(resp, status) {
      options.error.call(this, resp, status);
    }
  });
};

module.exports = ViewingActivity;