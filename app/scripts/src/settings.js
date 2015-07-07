getExtensionId = function() {
  return chrome.extension.getURL('').split('://')[1].replace('/', '');
}

module.exports = {
  authorizeUri: 'http://trakt.tv/oauth/authorize',
  tokenUri: 'https://api-v2launch.trakt.tv/oauth/token',
  redirectUri: 'https://' + getExtensionId() + '.chromiumapp.org',
  clientId: 'ba57090b4a4f342385afbc0f5c4e188d2dd727206267f1bb0bf6f19f4958aa44',
  clientSecret: '68e9da27682eaeb6600241b7e0134a1f1010e905349360c7fb70c6a73a317e25',
  apiVersion: 2
};