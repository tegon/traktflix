module.exports = function(config) {
    var istanbul = require('browserify-istanbul');
    var configuration = {

        basePath: '',

        frameworks: ['browserify', 'jasmine'],

        files: [
            'node_modules/phantomjs-polyfill/bind-polyfill.js',
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