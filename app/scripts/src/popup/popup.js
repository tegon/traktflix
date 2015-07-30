'use strict';

var React = require('react');
var App = require('./components/app.js');

var notWatchingMessages = [
  'You\'re not watching anything right now :/',
  'Dude, just open Netflix, plz',
  'Grab a pillow, a blanket and a movie on Netflix',
  'Two of five doctors says you should be on Netflix right now',
  'Get yourself some rest, and some Netflix'
];

var aboutMessages = [
  'Bringing your Netflix history to Trakt.tv'
];

React.render(
  <App notWatchingMessages={notWatchingMessages} aboutMessages={aboutMessages} />,
  document.querySelector('.app-container')
);