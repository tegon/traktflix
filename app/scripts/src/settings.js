module.exports = {
  authorizeUri: 'http://trakt.tv/oauth/authorize',
  apiUri: 'https://api.trakt.tv',
  redirectUri: 'https://' + chrome.runtime.id + '.chromiumapp.org',
  clientId: '@@clientId',
  clientSecret: '@@clientSecret',
  apiVersion: 2,
  analyticsId: '@@analyticsId',
  rollbarToken: '@@rollbarToken',
  tmdbApiKey: '@@tmdbApiKey'
};
