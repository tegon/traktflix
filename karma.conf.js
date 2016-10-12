module.exports = function(config) {
    var istanbul = require('browserify-istanbul');
    var configuration = {

        basePath: '',

        frameworks: ['browserify', 'jasmine'],

        files: [
            'node_modules/phantomjs-polyfill/bind-polyfill.js',
            'node_modules/es6-promise-polyfill/promise.js',
            'node_modules/fetch-polyfill/fetch.js',
            'node_modules/es6-shim/es6-shim.js',
            'support/*.js',
            'tests/test-helper.js',
            'tests/**/*.js'
        ],

        exclude: [
        ],

        preprocessors: {
            'tests/**/*.js': ['browserify']
        },

        reporters: ['dots'],

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: false,

        browsers: ['Chrome', 'PhantomJS'],

        browserify: {
            debug: true,
            transform: ['reactify']
        },

        singleRun: true
    };

    if (process.env.TRAVIS) {
        configuration.browsers = ['PhantomJS'];
        configuration.reporters.push('coverage');
        configuration.browserify.transform.push(istanbul({
            ignore: ['**/node_modules/**', '**/test/**'],
        }));
        configuration.coverageReporter = {
            type: 'lcov',
            dir: 'coverage/'
        };
    }

    config.set(configuration);
};
