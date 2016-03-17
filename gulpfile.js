var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var gulpif = require('gulp-if');
var minimist = require('minimist');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var zip = require('gulp-zip');
var config = require('./config.json');
var replace = require('gulp-replace-task');

var defaultOptions = {
  string: 'env',
  default: { env: process.env.NODE_ENV || 'development' }
};

var options = minimist(process.argv.slice(2), defaultOptions);

var replacePatterns = {
    patterns: [
        { match: 'clientId', replacement: config[options.env].clientId },
        { match: 'clientSecret', replacement: config[options.env].clientSecret },
        { match: 'analyticsId', replacement: config[options.env].analyticsId }
    ]
};

function buildJS(src) {
    var bundler = browserify({
        entries: 'app/scripts/src/' + src.folder + '/' + src.file,
        debug: options.env !== 'production',
        cache: {}, packageCache: {}, fullPaths: true
    })
    .transform('babelify', { presets: ['es2015', 'react'] });
    var watcher  = watchify(bundler);

    return watcher
    .on('update', function () {
        var updateStart = Date.now();
        console.log('Updating ' + src.file);
        watcher.bundle()
        .pipe(source(src.file))
        .pipe(buffer())
        .pipe(replace(replacePatterns))
        .pipe(gulpif(options.env === 'production', uglify()))
        .pipe(gulp.dest('./app/scripts/build/'))
        console.log(src.file + ' updated!', (Date.now() - updateStart) + 'ms');
    })
    .bundle()
    .pipe(source(src.file))
    .pipe(buffer())
    .pipe(replace(replacePatterns))
    .pipe(gulpif(options.env === 'production', uglify()))
    .pipe(gulp.dest('./app/scripts/build/'));
}

function buildCss() {
    return gulp.src('app/styles/src/*.css')
        .pipe(autoprefixer())
        .pipe(gulpif(options.env === 'production', minifycss()))
        .pipe(concat('popup.css'))
        .pipe(gulp.dest('app/styles/build'));
}

gulp.task('browserify-popup', function() {
    buildJS({ folder: 'popup', file: 'popup.js' });
});

gulp.task('browserify-content', function() {
    buildJS({ folder: 'content', file: 'content.js' });
});

gulp.task('browserify-background', function() {
    buildJS({ folder: 'background', file: 'background.js' });
});

gulp.task('browserify-history-sync', function() {
    buildJS({ folder: 'history-sync', file: 'history-sync.js' });
});

gulp.task('css', function () {
    gulp.watch('app/styles/src/*.css', buildCss);
    buildCss();
});

gulp.task('vendor', function() {
    gulp.src('app/styles/vendor/*.css')
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('app/styles/build'));

    return gulp.src('app/scripts/vendor/*.js')
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('app/scripts/build'))
});

gulp.task('zip', function() {
    return gulp.src([
        'key.pem',
        'app/**',
        '!app/scripts/src/**',
        '!app/scripts/vendor/**',
        '!app/styles/src/**',
        '!app/styles/vendor/**'
    ])
    .pipe(zip('app.zip'))
    .pipe(gulp.dest('./'))
});

gulp.task('default', [
    'browserify-popup',
    'browserify-content',
    'browserify-background',
    'browserify-history-sync',
    'css',
    'vendor'
]);
