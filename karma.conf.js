module.exports = config => {
  let webpackConfig = require('./webpack.config.js');
  webpackConfig = webpackConfig({ development: true, test: true });
  const configuration = {
    autoWatch: false,
    basePath: '',
    browsers: ['Chrome', 'Firefox'],
    client: {
      jasmine: {
        random: false
      }
    },
    concurrency: 1,
    files: [
      'test/**/*.js'
    ],
    frameworks: ['mocha', 'chai'],
    preprocessors: {
      ['test/**/*.js']: ['webpack']
    },
    singleRun: true,
    webpack: webpackConfig
  };
  configuration.reporters = ['progress', 'coverage'];
  configuration.coverageReporter = {
    dir: 'coverage/',
    type: 'lcov'
  };
  config.set(configuration);
};
