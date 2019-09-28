const settings = {
  browser: browser.runtime.getURL('/').match(/^moz/) ? 'firefox' : 'chrome',
  authorizeUri: `https://trakt.tv/oauth/authorize`,
  apiUri: `https://api.trakt.tv`,
  redirectUri: `https://www.netflix.com/Activate`,
  clientId: `@@clientId`,
  clientSecret: `@@clientSecret`,
  apiVersion: `2`,
  rollbarToken: `@@rollbarToken`,
  tmdbApiKey: `@@tmdbApiKey`
};

export default settings;