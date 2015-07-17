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
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');

var defaultOptions = {
  string: 'env',
  default: { env: process.env.NODE_ENV || 'development' }
};

var options = minimist(process.argv.slice(2), defaultOptions);

function buildJS(src) {
    var bundler = browserify({
        entries: 'app/scripts/src/' + src.name + src.extension,
        transform: [reactify],
        debug: options.env !== 'production',
        cache: {}, packageCache: {}, fullPaths: true
    });
    var watcher  = watchify(bundler);

    return watcher
    .on('update', function () {
        var updateStart = Date.now();
        console.log('Updating ' + src.name);
        watcher.bundle()
        .pipe(source(src.name + '.js'))
        .pipe(buffer())
        .pipe(gulpif(options.env === 'production', uglify()))
        .pipe(gulp.dest('./app/scripts/build/'));
        console.log(src.name + ' updated!', (Date.now() - updateStart) + 'ms');
    })
    .bundle()
    .pipe(source(src.name + '.js'))
    .pipe(buffer())
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
    buildJS({ name: 'popup', extension: '.jsx' });
});

gulp.task('browserify-content', function() {
    buildJS({ name: 'content', extension: '.js' });
});

gulp.task('browserify-background', function() {
    buildJS({ name: 'background', extension: '.js' });
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

gulp.task('default', [
    'browserify-popup',
    'browserify-content',
    'browserify-background',
    'css',
    'vendor'
]);