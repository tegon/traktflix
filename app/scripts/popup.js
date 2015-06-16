'use strict';

console.log('\'Allo \'Allo! Popup');

var button = document.querySelector('a');

button.addEventListener('click', function(e) {
  console.log(e);
  chrome.identity.launchWebAuthFlow(
    { 'url': 'http://trakt.tv/oauth/authorize?client_id=ba57090b4a4f342385afbc0f5c4e188d2dd727206267f1bb0bf6f19f4958aa44&redirect_uri=https%3A%2F%2Foipljbcbbljblkakhdnfjhibfgfgphbm.chromiumapp.org&response_type=code', 'interactive': true },
    function(redirectUrl) {
      console.log(redirectUrl);
    }
  );
}, false);