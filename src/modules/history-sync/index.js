import React from 'react';
import ReactDOM from 'react-dom';
import Rollbar from '../../class/Rollbar';
import ViewingActivityApp from '../../class/history-sync/ViewingActivityApp';
import NetflixWebAPIUtils from '../../class/history-sync/NetflixWebAPIUtils';
import '../../assets';

// noinspection JSIgnoredPromiseFromCall
Rollbar.init();
NetflixWebAPIUtils.getActivities();
ReactDOM.render(<ViewingActivityApp/>, document.getElementById('viewing-activity-app'));
document.getElementById(`viewing-activity-app-title`).textContent = chrome.i18n.getMessage(`historyTitle`);
