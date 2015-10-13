'use strict';

var React = require('react');
var App = require('./components/app.js');

var notWatchingMessages = [
  'You\'re not watching anything right now :/',
  'Dude, just watch something',
  'Grab a pillow, a blanket and a movie on Netflix',
  'Two of five doctors says you should be watching something on Netflix right now',
  'Get yourself some rest, and some movie on Netflix',
  'Now is a great time to watch something',
  'A Netflix movie a day, keeps the doctor away',
  'Did you hear that? That\'s the sound of you not watching something on Netflix',
  'It\'s Netflix time!',
  'You really deserve it! Watch something on Netflix.',
  'Hey psst... Netflix has some great stuff for you to watch. Go check it out!',
  'A wise man once said that you should watch more Netflix. In fact, why don\'t you start, right now!'
];

var aboutMessages = [
  'Bringing your Netflix history to Trakt.tv'
];

React.render(
  <App notWatchingMessages={notWatchingMessages} aboutMessages={aboutMessages} />,
  document.querySelector('.app-container')
);