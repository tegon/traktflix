import '../../assets';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import Rollbar from '../../class/Rollbar';
import App from '../../class/popup/App';

// noinspection JSIgnoredPromiseFromCall
Rollbar.init();
ReactDOM.render((
  <Router>
    <Route component={App}/>
  </Router>
), document.querySelector('.app-container'));
