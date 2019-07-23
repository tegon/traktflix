

const path = require(`path`);

const ROOT_PATH = path.join(__dirname, `..`);

const packageJson = require(`${ROOT_PATH}/package.json`);

module.exports = function (browserName) {
  const manifest = {
    manifest_version: 2,
    name: `__MSG_appName__`,
    version: packageJson.version,

    description: `__MSG_appDescription__`,
    icons: {
      16: `images/traktflix-icon-16.png`,
      128: `images/traktflix-icon-128.png`
    },

    background: {
      scripts: [
        `js/lib/browser-polyfill.js`,
        `js/vendor.js`,
        `js/background.js`
      ]
    },
    content_scripts: [
      {
        js: [
          `js/lib/browser-polyfill.js`,
          `js/content.js`
        ],
        matches: [
          `*://*.netflix.com/*`
        ],
        run_at: `document_idle`
      }
    ],
    default_locale: `en`,
    optional_permissions: [
      `notifications`,
      `*://api.rollbar.com/*`,
      `*://google-analytics.com/*`,
      `*://script.google.com/*`,
      `*://script.googleusercontent.com/*`
    ],
    page_action: {
      default_icon: {
        19: `images/traktflix-icon-19.png`,
        38: `images/traktflix-icon-38.png`
      },
      default_popup: `html/popup.html`,
      default_title: `traktflix`
    },
    permissions: [
      `identity`,
      `storage`,
      `tabs`,
      `unlimitedStorage`,
      `*://*.netflix.com/*`,
      `*://*.trakt.tv/*`
    ],
    web_accessible_resources: [
      `images/traktflix-icon-38.png`,
      `images/traktflix-icon-selected-38.png`,
      `images/svg/*.svg`
    ]
  };

  switch (browserName) {
    case `chrome`: {
      const bextJson = require(`${ROOT_PATH}/bext.json`);
      manifest.key = bextJson.chrome.extensionKey;
      manifest.permissions.push(`declarativeContent`);
      break;
    }
    case `firefox`: {
      const bextJson = require(`${ROOT_PATH}/bext.json`);
      manifest.browser_specific_settings = {
        gecko: {
          id: bextJson.firefox.extensionId
        }
      };
      break;
    }
    default:
      break;
  }

  return JSON.stringify(manifest, null, 2);
}