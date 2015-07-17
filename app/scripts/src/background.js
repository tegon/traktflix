'use strict';

var Utils = require('./utils.js');

function setInactiveIcon() {
  chrome.browserAction.setIcon({
    path: {
      19: 'images/traktflix-icon-19.png',
      38: 'images/traktflix-icon-38.png'
    }
  });
}

function setActiveIcon() {
  chrome.browserAction.setIcon({
    path: {
      19: 'images/traktflix-icon-selected-19.png',
      38: 'images/traktflix-icon-selected-38.png'
    }
  });
}

Utils.Messages.addListener('setActiveIcon', function(){
  setActiveIcon();
});

Utils.Messages.addListener('setInactiveIcon', function(){
  setInactiveIcon();
});