import React from 'react';
import ReactDOM from 'react-dom';
import Rollbar from '../../class/Rollbar';
import ViewingActivityApp from '../../class/history-sync/ViewingActivityApp';
import NetflixWebAPIUtils from '../../class/history-sync/NetflixWebAPIUtils';
import '../../assets/styles';

Rollbar.init();
NetflixWebAPIUtils.getActivities();
ReactDOM.render(<ViewingActivityApp />, document.getElementById('viewing-activity-app'));
