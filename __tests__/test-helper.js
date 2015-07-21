window.chrome = {
  runtime: {
    sendMessage: jest.genMockFunction(),
    onMessage: { addListener: jest.genMockFunction() },
    getManifest: jest.genMockFunction()
  },
  storage: {
    local: {
      get: jest.genMockFunction(),
      set: jest.genMockFunction(),
      clear: jest.genMockFunction()
    }
  },
  identity: { launchWebAuthFlow: jest.genMockFunction() },
  tabs: {
    query: jest.genMockFunction(),
    sendMessage: jest.genMockFunction(),
    create: jest.genMockFunction()
  },
  browserAction: { setIcon: jest.genMockFunction() }
};