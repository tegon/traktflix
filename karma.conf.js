module.exports = function(config) {
    config.set({

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
    });
};