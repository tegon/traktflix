import ChromeStorage from '../ChromeStorage';
import OptionsActionsCreators from './OptionsActionCreators';

class OptionsUtils {
  constructor() {
    this.options = [{
      id: `allowGoogleAnalytics`,
      name: ``,
      description: ``,
      value: false
    }, {
      id: `allowRollbar`,
      name: ``,
      description: ``,
      value: false
    }, {
      id: `showNotifications`,
      name: ``,
      description: ``,
      value: false
    }];
  }

  async getOptions() {
    try {
      const data = await ChromeStorage.get(`options`);
      for (const option of this.options) {
        option.name = chrome.i18n.getMessage(`${option.id}Name`);
        option.description = chrome.i18n.getMessage(`${option.id}Description`);
        if (data.options) {
          option.add = data.options[option.id];
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