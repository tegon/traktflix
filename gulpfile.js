var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var gulpif = require('gulp-if');
var minimist = require('minimist');

var defaultOptions = {
  string: 'env',
  default: { env: process.env.NODE_ENV || 'development' }
};

var options = minimist(process.argv.slice(2), defaultOptions);

gulp.task('browserify-popup', function() {
    var bundler = browserify({
        entries: 'app/scripts/src/popup.jsx',
        transform: [reactify],
        debug: options.env !== 'production',
        cache: {}, packageCache: {}, fullPaths: true
    });
    var watcher  = watchify(bundler);

    return watcher
    .on('update', function () {
        var updateStart = Date.now();
        console.log('Updating popup!');
        watcher.bundle()
        .pipe(source('popup.js'))
        .pipe(buffer())
        .pipe(gulpif(options.env === 'production', uglify()))
        .pipe(gulp.dest('./app/scripts/build/'));
        console.log('popup updated!', (Date.now() - updateStart) + 'ms');
    })
    .bundle()
    .pipe(source('popup.js'))
    .pipe(buffer())
    .pipe(gulpif(options.env === 'production', uglify()))
    .pipe(gulp.dest('./app/scripts/build/'));
});

gulp.task('browserify-content', function() {
    var bundler = browserify({
        entries: 'app/scripts/src/content.js',
        debug: options.env !== 'production',
        cache: {}, packageCache: {}, fullPaths: true
    });
    var watcher  = watchify(bundler);

    return watcher
    .on('update', function () {
        var updateStart = Date.now();
        console.log('Updating content!');
        watcher.bundle()
        .pipe(source('content.js'))
        .pipe(buffer())
        .pipe(gulpif(options.env === 'production', uglify()))
        .pipe(gulp.dest('./app/scripts/build/'));
        console.log('content updated!', (Date.now() - updateStart) + 'ms');
    })
    .bundle()
    .pipe(source('content.js'))
    .pipe(buffer())
    .pipe(gulpif(options.env === 'production', uglify()))
    .pipe(gulp.dest('./app/scripts/build/'));
});

gulp.task('css', function () {
    gulp.watch('styles/**/*.css', function () {
        return gulp.src('styles/**/*.css')
        .pipe(concat('content.css'))
        .pipe(gulp.dest('app/styles/build/'));
    });
});

gulp.task('default', ['browserify-popup', 'browserify-content', 'css']);