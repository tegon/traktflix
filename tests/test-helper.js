window.sinon = require('sinon');

window.chrome = window.chrome || {};

window.chrome = {
  runtime: {
    sendMessage: function(){},
    onMessage: { addListener: sinon.stub() },
    getManifest: sinon.stub()
  },
  storage: {
    local: {
      get: function(){},
      set: function(){},
      clear: function(){}
    }
  },
  identity: { launchWebAuthFlow: function(){} },
  tabs: {
    query: sinon.stub(),
    sendMessage: sinon.stub(),
    create: sinon.stub()
  },
  browserAction: { setIcon: sinon.stub() },
  extension: {
    getURL: function(path) {
      return 'chrome-extension://aabkanfebbckpjbjcelojgljnmeolppf/' + path;
    }
  }
};

sinon.stub(window.chrome.runtime, 'sendMessage', function(data, callback) {
  if (typeof(callback) === 'function') {
    callback.call(this, {});
  }
});

sinon.stub(window.chrome.storage.local, 'get', function(data, callback) {
  if (typeof(data) === 'function') {
    data.call(this, {});
  } else {
    callback.call(this, {});
  }
});

sinon.stub(window.chrome.storage.local, 'set', function(data, callback) {
  callback.call(this, {});
});

sinon.stub(window.chrome.storage.local, 'clear', function(callback) {
  callback.call(this, {});
});

sinon.stub(window.chrome.identity, 'launchWebAuthFlow', function(options, callback) {
  callback.call(this, 'chrome-extension://{extensionId}?code=123324adbadwqe');
});
