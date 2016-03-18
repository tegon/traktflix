import Settings from './settings';

import rollbar from 'rollbar-browser';

let config = {
  accessToken: Settings.rollbarToken,
  captureUncaught: true,
  payload: {
    environment: 'production'
  }
};

const Rollbar = rollbar.init(config);
window.Rollbar = Rollbar;
export default Rollbar;
