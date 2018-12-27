/**
 * @type {Object} chrome
 * @property {Object} declarativeContent
 * @property {Object} declarativeContent.onPageChanged
 * @property {Function} declarativeContent.onPageChanged.addRules
 * @property {Function} declarativeContent.onPageChanged.removeRules
 * @property {Function} declarativeContent.PageStateMatcher
 * @property {Function} declarativeContent.ShowPageAction
 * @property {Function} extension.getURL
 * @property {Object} i18n
 * @property {Function} i18n.getMessage
 * @property {Object} notifications
 * @property {Object} pageAction
 * @property {Function} pageAction.setIcon
 * @property {Object} runtime
 * @property {Object} runtime.onInstalled
 * @property {Function} runtime.sendMessage
 * @property {ChromeManifest} runtime.getManifest
 * @property {Object} tabs
 * @property {Object} tabs.onUpdated
 * @property {Object} windows
 */

/**
 * @typedef {Function} ChromeManifest
 * @return {ChromeManifestOutput}
 */

/**
 * @typedef {Object} ChromeManifestOutput
 * @property {Object} page_action
 * @property {Object} page_action.default_icon
 * @property {Object} page_action.selected_icon
 */