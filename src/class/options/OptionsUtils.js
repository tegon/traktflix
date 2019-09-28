import React from 'react';
import BrowserStorage from '../BrowserStorage';
import OptionsActionsCreators from './OptionsActionCreators';
import Settings from '../../settings';

class OptionsUtils {
  constructor() {
    this.options = [{
      id: `disableScrobbling`,
      name: ``,
      description: ``,
      value: false
    }, {
      id: `allowGoogleAnalytics`,
      name: ``,
      description: ``,
      value: false,
      origins: [`*://google-analytics.com/*`]
    }, {
      id: `allowRollbar`,
      name: ``,
      description: ``,
      value: false,
      origins: [`*://api.rollbar.com/*`]
    }, {
      id: `showNotifications`,
      name: ``,
      description: ``,
      value: false,
      permissions: [`notifications`]
    }, {
      id: `sendReceiveSuggestions`,
      name: ``,
      description: ``,
      value: false,
      origins: [`*://script.google.com/*`, `*://script.googleusercontent.com/*`],
      additionalElements: (
        <React.Fragment>
          <br></br>
          <a href="https://docs.google.com/spreadsheets/d/1Yq9rnpszwh2XFVllLkNelaFeu8FY0lldd91ce7JVZPk/edit?usp=sharing" target="_blank">Database</a>
        </React.Fragment>
      )
    }];

    if (Settings.browser === 'firefox') {
      this.options.push({
        id: `grantCookies`,
        name: ``,
        description: ``,
        value: false,
        permissions: [`cookies`],
      });
    }
  }

  async getOptions() {
    try {
      const storage = await BrowserStorage.get(`options`);
      for (const option of this.options) {
        option.name = browser.i18n.getMessage(`${option.id}Name`);
        option.description = browser.i18n.getMessage(`${option.id}Description`);
        if (storage.options) {
          option.add = storage.options[option.id];
        }
      }
      OptionsActionsCreators.receiveOptions(this.options);
    } catch (error) {
      OptionsActionsCreators.receiveOptionsFailed(error);
    }
  }
}

const optionsUtils = new OptionsUtils();
export default optionsUtils;