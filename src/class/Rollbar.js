import RollbarSdk from 'rollbar';
import Settings from '../settings';
import BrowserStorage from './BrowserStorage';

class Rollbar {
  constructor() {
    this._config = {
      accessToken: Settings.rollbarToken,
      autoInstrument: {
        network: false // If set to true, causes error on Firefox (see https://github.com/rollbar/rollbar.js/issues/638)
      },
      captureIp: false,
      captureUncaught: true,
      captureUnhandledRejections: true,
      payload: {
        environment: `production`
      }
    };
  }

  async init() {
    if (typeof this._rollbar !== `undefined`) {
      return this;
    }
    const storage = await BrowserStorage.get(`options`);
    if (storage.options && storage.options.allowRollbar && (await browser.permissions.contains({ origins: [`*://api.rollbar.com/*`] }))) {
      this._rollbar = RollbarSdk.init(this._config);
      window.Rollbar = this._rollbar;
      this.error = this._rollbar.error.bind(this._rollbar);
      this.warning = this._rollbar.warning.bind(this._rollbar);
    }
    return this;
  }

  error() {
  }

  warning() {
  }
}

const rollbar = new Rollbar();
export default rollbar;