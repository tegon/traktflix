const gulp = require(`gulp`);
const zip = require(`gulp-zip`);

gulp.task(`zip`, () => {
  return gulp.src([
    `app/**`
  ])
    .pipe(zip(`app.zip`))
    .pipe(gulp.dest(`./`));
});

gulp.task(`zip-src`, () => {
  return gulp.src([
    `README.md`,
    `src/**`
  ])
    .pipe(zip(`src.zip`))
    .pipe(gulp.dest(`./`));
});