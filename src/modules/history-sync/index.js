import React from 'react';
import ReactDOM from 'react-dom';
import Rollbar from '../../class/Rollbar';
import ViewingActivityApp from '../../class/history-sync/ViewingActivityApp';
import NetflixApiUtils from '../../class/NetflixApiUtils';
import '../../assets';

// noinspection JSIgnoredPromiseFromCall
Rollbar.init();
NetflixApiUtils.getActivities();
ReactDOM.render(<ViewingActivityApp/>, document.getElementById('viewing-activity-app'));
document.getElementById(`viewing-activity-app-title`).textContent = chrome.i18n.getMessage(`historyTitle`);
