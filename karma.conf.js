module.exports = function(config) {
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
    }

    config.set(configuration);
};