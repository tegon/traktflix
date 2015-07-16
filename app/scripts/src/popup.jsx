'use strict';

var React = require('react');
var App = require('./app.jsx');
var Settings = require('./settings.js');
var Utils = require('./utils.js');
var service = analytics.getService('traktflix');
var tracker = service.getTracker(Settings.analyticsId);
Utils.Analytics.setTracker(tracker);

var notWatchingMessages = [
  'You\'re not watching anything right now :/',
  'Dude, just open Neflix, plz',
  'Grab a pillow, a blanket and a movie on Neflix',
  'Two of five doctors says you should be on Neflix right now',
  'Get yourself some rest, and some Neflix'
];

var aboutMessages = [
  'Netflix rocks,\n Trakt.tv rocks,\n So... trakflix ROCKS WITH LASERS!'
];

React.render(
  <App notWatchingMessages={notWatchingMessages} aboutMessages={aboutMessages} />,
  document.querySelector('.app-container')
);