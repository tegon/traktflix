import '../../assets';
import React from 'react';
import ReactDOM from 'react-dom';
import BrowserStorage from '../../class/BrowserStorage';
import NetflixApiUtils from '../../class/NetflixApiUtils';
import Rollbar from '../../class/Rollbar';
import ViewingActivityApp from '../../class/history-sync/ViewingActivityApp';
import shared from '../../class/Shared';

shared.setBackgroundPage(true);

// noinspection JSIgnoredPromiseFromCall
Rollbar.init();
BrowserStorage.get(`prefs`).then(storage => {
  NetflixApiUtils.getActivities();
  ReactDOM.render(<ViewingActivityApp addWithReleaseDate={(storage.prefs && storage.prefs.addWithReleaseDate) || false} pagesToLoad={(storage.prefs && storage.prefs.pagesToLoad) || `0`}/>, document.getElementById('viewing-activity-app'));
  document.getElementById(`viewing-activity-app-title`).textContent = browser.i18n.getMessage(`historyTitle`);
});
