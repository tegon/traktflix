import React from 'react';
import ReactDOM from 'react-dom';
import Rollbar from '../../class/Rollbar';
import ViewingOptionsApp from '../../class/options/ViewingOptionsApp';
import OptionsUtils from '../../class/options/OptionsUtils';
import '../../assets';

// noinspection JSIgnoredPromiseFromCall
Rollbar.init();
// noinspection JSIgnoredPromiseFromCall
OptionsUtils.getOptions();
ReactDOM.render(<ViewingOptionsApp/>, document.getElementById('viewing-options-app'));
document.getElementById(`viewing-options-app-title`).textContent = chrome.i18n.getMessage(`options`);