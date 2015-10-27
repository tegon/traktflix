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

var errorMessages = [
  'Ouch... Trakt has returned an error. Please try again later.',
  'Looks like Trakt has some errors to take care. Please come back later.',
  'Something is wrong with Trakt. We\'re sorry. Give us a time and come back later.'
];

React.render(
  <App
    notWatchingMessages={notWatchingMessages}
    aboutMessages={aboutMessages}
    errorMessages={errorMessages} />,
  document.querySelector('.app-container')
);