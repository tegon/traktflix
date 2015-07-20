'use strict';

var React = require('react');
var App = require('./app.js');

var notWatchingMessages = [
  'You\'re not watching anything right now :/',
  'Dude, just open Neflix, plz',
  'Grab a pillow, a blanket and a movie on Neflix',
  'Two of five doctors says you should be on Neflix right now',
  'Get yourself some rest, and some Neflix'
];

var aboutMessages = [
  'Bringing your Netflix history to Trakt.tv'
];

React.render(
  <App notWatchingMessages={notWatchingMessages} aboutMessages={aboutMessages} />,
  document.querySelector('.app-container')
);