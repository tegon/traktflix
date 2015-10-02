'use strict';

var Request = require('../request.js');

function ViewingActivity(options) {
  this.item = options.item;
  this.date = options.date;
}

ViewingActivity.list = function(options) {
  Request.send({
    method: 'GET',
    url: 'https://www.netflix.com/WiViewingActivity',
    success: function(response) {
      options.success.call(this, response);
    },
    error: function(resp, status) {
      options.error.call(this, resp, status);
    }
  });
};

module.exports = ViewingActivity;