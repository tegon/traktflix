import ChromeStorage from './ChromeStorage';
import Settings from '../settings';
import RollbarSdk from 'rollbar';

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
    const data = await ChromeStorage.get(`options`);
    if (data.options && data.options.allowRollbar) {
      this._rollbar = RollbarSdk.init(this._config);
      window.Rollbar = this._rollbar;
      this.error = this._rollbar.error.bind(this._rollbar);
      this.warning = this._rollbar.warning.bind(this._rollbar);
    }
    return this;
  }

  error() {}
  warning() {}
}

const rollbar = new Rollbar();
export default rollbar;