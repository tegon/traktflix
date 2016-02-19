'use strict';

var Request = require('../request.js');

function ViewingActivity(options) {
  this.item = options.item;
  this.date = options.date;
}

ViewingActivity.list = function(options) {
  Request.send({
    method: 'GET',
    url: 'https://www.netflix.com/Activate',
    success: function(response) {
      var authRegExp = new RegExp("\"authURL\":\"(.*?)\"");
      var buildRegExp = new RegExp("\"BUILD_IDENTIFIER\":\"(.*?)\"");
      var authKey = authRegExp.exec(response)[1];
      var buildKey = buildRegExp.exec(response)[1];

      //pg=0 means the first page. This is only the first 100 results.
      var url = "https://www.netflix.com/api/shakti/" + buildKey + "/viewingactivity?pg=0&authURL=" + authKey;
      Request.send({
        method: 'GET',
        url: url,
        success: function(response) {
          options.success.call(this, response);
        },
        error: function(resp, status) {
          options.error.call(this, resp, status);
        }
      });
    },
    error: function(resp, status) {
      options.error.call(this, resp, status);
    }
  });
};


ViewingActivity.fullList = function(options) {
  Request.send({
    method: 'GET',
    url: 'https://www.netflix.com/Activate',
    success: function(response) {
      var authRegExp = new RegExp("\"authURL\":\"(.*?)\"");
      var buildRegExp = new RegExp("\"BUILD_IDENTIFIER\":\"(.*?)\"");
      var authKey = authRegExp.exec(response)[1];
      var buildKey = buildRegExp.exec(response)[1];

      //pg=0 means the first page. This is only the first 100 results.
      var url = "https://www.netflix.com/api/shakti/" + buildKey + "/viewingactivity?authURL=" + authKey;
      rFullList(undefined,url,0,options);
    },
    error: function(resp, status) {
      options.error.call(this, resp, status);
    }
  });
};


function rFullList(res, url, pg,options){
  Request.send({
        method: 'GET',
        url: url+"&pg="+pg,
        success: function(response) {
          var history =JSON.parse(response)

          var len = history.viewedItems.length; 
          if(res)
            history.viewedItems = history.viewedItems.concat(res.viewedItems); //only care about new items

          if(len == history.size){ //probably more pages
            rFullList(history,url,++pg ,options); //get next page
          }
          else{
          options.success.call(this, JSON.stringify(history)); //convert back to string

          }
          
        },
        error: function(resp, status) {
          options.error.call(this, resp, status);
        }
      });

};


module.exports = ViewingActivity;