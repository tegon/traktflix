window.sinon = require('sinon');

window.chrome = window.chrome || {};

window.chrome = {
  runtime: {
    sendMessage: sinon.stub(),
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
  identity: { launchWebAuthFlow: sinon.stub() },
  tabs: {
    query: sinon.stub(),
    sendMessage: sinon.stub(),
    create: sinon.stub()
  },
  browserAction: { setIcon: sinon.stub() }
};

sinon.stub(window.chrome.storage.local, 'get', function(data, callback) {
  callback.call(this, {});
});