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

function _getApiDefs(event) {
  window.removeEventListener('traktflix-getApiDefs-fromPage', getApiDefs);

  const { authUrl, buildIdentifier } = event.detail;

  if (authUrl && buildIdentifier) {
    browser.runtime.sendMessage({ type: 'setApiDefs', authUrl, buildIdentifier });
  }
}

function getApiDefs() {
  if (window.wrappedJSObject) {
    const netflix = window.wrappedJSObject.netflix;

    if (netflix) {
      const authUrl = netflix.reactContext.models.userInfo.data.authURL;
      const buildIdentifier = netflix.reactContext.models.serverDefs.data.BUILD_IDENTIFIER;

      browser.runtime.sendMessage({ type: 'setApiDefs', authUrl, buildIdentifier });

      XPCNativeWrapper(window.wrappedJSObject.netflix);
    }
  } else {
    const script = document.createElement('script');

    script.textContent = `
      window.addEventListener('traktflix-getApiDefs-toPage', () => {
        let authUrl = '';
        let buildIdentifier = '';

        if (netflix) {
          authUrl = netflix.reactContext.models.userInfo.data.authURL;
          buildIdentifier = netflix.reactContext.models.serverDefs.data.BUILD_IDENTIFIER;
        }

        const event = new CustomEvent('traktflix-getApiDefs-fromPage', {
          detail: { authUrl, buildIdentifier },
        });

        window.dispatchEvent(event);
      });

      window.addEventListener('traktflix-getSession-toPage', () => {
        let session;

        if (netflix) {
          const sessions = netflix.appContext.state.playerApp.getState().videoPlayer.playbackStateBySessionId;
          const key = Object.keys(sessions).filter(key => key.match(/^watch/))[0];

          session = null;

          if (key) {
            session = sessions[key];
          }
        }

        const event = new CustomEvent('traktflix-getSession-fromPage', {
          detail: { session: JSON.stringify(session) },
        });

        window.dispatchEvent(event);
      });
    `;

    document.body.appendChild(script);

    window.addEventListener('traktflix-getApiDefs-fromPage', _getApiDefs, false);

    const event = new CustomEvent('traktflix-getApiDefs-toPage');

    window.dispatchEvent(event);
  }
}