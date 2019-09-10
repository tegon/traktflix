const { getArguments } = require('./scripts/common');

const args = getArguments(process);

module.exports = config => {
  const webpackConfig = require('./webpack.config.js');

  const karmaConfig = {
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
    webpack: webpackConfig({
      development: true,
      test: true 
    })
  };

  if (args.token) {
    karmaConfig.coverallsReporter = {
      repoToken: args.token
    };
    karmaConfig.coverageReporter = {
      dir: 'coverage/',
      type: 'lcov'
    };
    karmaConfig.reporters = ['progress', 'coverage', 'coveralls'];
  }

  config.set(karmaConfig);
};
