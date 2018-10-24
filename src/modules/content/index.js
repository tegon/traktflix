import ContentController from '../../class/content/ContentController';
import EventWatcher from '../../class/content/EventWatcher';
import Rollbar from '../../class/Rollbar';

// noinspection JSIgnoredPromiseFromCall
Rollbar.init();
const controller = new ContentController();
const eventWatcher = new EventWatcher({
  onPlay: controller.onPlay.bind(controller),
  onPause: controller.onPause.bind(controller),
  onStop: controller.onStop.bind(controller)
});
eventWatcher.startListeners();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === `getCurrentItem`) {
    sendResponse(controller.getCurrentItem());
  }
});

if (location.href.match(/\/Activate\?code=/)) {
  chrome.runtime.sendMessage({type: `authorize`, url: location.href});
}

const netflix = window.netflix || (window.wrappedJSObject && window.wrappedJSObject.netflix);
if (netflix) {
  const authUrl = netflix.reactContext.models.userInfo.data.authURL;
  const buildIdentifier = netflix.reactContext.models.serverDefs.data.BUILD_IDENTIFIER;
  chrome.runtime.sendMessage({type: `setApiDefs`, authUrl, buildIdentifier});
  if (window.XPCNativeWrapper) {
    window.XPCNativeWrapper(window.wrappedJSObject.netflix);
  }
}