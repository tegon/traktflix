'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var browserHistory = ReactRouter.browserHistory;

var App = require('./components/app.js');
var LoginButton = require('./components/login-button.js');
var About = require('./components/about.js');
var NotWatching = require('./components/not-watching.js');
var Watching = require('./components/watching.js');

React.render((
  <Router history={browserHistory}>
    <Route path='/popup.html' component={App}>
      <IndexRoute component={LoginButton} />
      <Route path='/login' component={LoginButton}/>
      <Route path='/about' component={About}/>
      <Route path='/not-watching' component={NotWatching}/>
      <Route path='/watching/:item' component={Watching}/>
    </Route>
  </Router>
), document.querySelector('.app-container'));
