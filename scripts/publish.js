const chromePublisher = require(`@bext/chrome-publisher`);
const firefoxPublisher = require(`@bext/firefox-publisher`);
const path = require(`path`);

const ROOT_PATH = path.join(__dirname, `..`);
const CONFIG_PATH = `${ROOT_PATH}/bext.json`;

const packageJson = require(`${ROOT_PATH}/package.json`);

publish();

async function publish() {
  try {
    await chromePublisher.init(CONFIG_PATH);
    await chromePublisher.update(`${ROOT_PATH}/extension-chrome.zip`);
    await firefoxPublisher.init(CONFIG_PATH);
    await firefoxPublisher.update(`${ROOT_PATH}/extension-firefox.zip`, {
      path: {
        version: packageJson.version
      }
    });
  } catch (error) {
    console.log(error);
  }
}