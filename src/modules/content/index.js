import BrowserStorage from '../../class/BrowserStorage';
import ContentController from '../../class/content/ContentController';
import EventWatcher from '../../class/content/EventWatcher';
import Rollbar from '../../class/Rollbar';

// noinspection JSIgnoredPromiseFromCall
Rollbar.init();

let controller = null;

init();

browser.runtime.onMessage.addListener((request) => {
  return new Promise(resolve => {
    if (request.type === `getCurrentItem`) {
      resolve(controller && controller.getCurrentItem());
    }
  });
});
if (location.href.match(/\/Activate\?code=/)) {
  browser.runtime.sendMessage({type: `authorize`, url: location.href});
}

getApiDefs();

async function init() {
  const storage = await BrowserStorage.get(`options`);
  if (!storage.options || !storage.options.disableScrobbling) {
    controller = new ContentController();
    const eventWatcher = new EventWatcher({
      onPlay: controller.onPlay.bind(controller),
      onPause: controller.onPause.bind(controller),
      onStop: controller.onStop.bind(controller)
    });
    eventWatcher.startListeners();
  }
}

function getApiDefs() {
  const netflix = window.netflix || (window.wrappedJSObject && window.wrappedJSObject.netflix);
  if (netflix) {
    const authUrl = netflix.reactContext.models.userInfo.data.authURL;
    const buildIdentifier = netflix.reactContext.models.serverDefs.data.BUILD_IDENTIFIER;
    browser.runtime.sendMessage({type: `setApiDefs`, authUrl, buildIdentifier});
    if (window.XPCNativeWrapper) {
      window.XPCNativeWrapper(window.wrappedJSObject.netflix);
    }
  }
}