const fs = require(`fs`);
const gulp = require(`gulp`);
const zip = require(`gulp-zip`);
const generateManifest = require(`./scripts/generateManifest.js`);

gulp.task(`zip-chrome`, () => {
  return zipExtension(`chrome`);
});

gulp.task(`zip-firefox`, () => {
  return zipExtension(`firefox`);
});

function zipExtension(browserName) {
  fs.writeFileSync(`./build/manifest.json`, generateManifest(browserName));

  return gulp.src([
    `build/**`
  ])
    .pipe(zip(`extension-${browserName}.zip`))
    .pipe(gulp.dest(`./`));
}

gulp.task(`zip-src`, () => {
  return gulp.src([
    `README.md`,
    `src/**`
  ])
    .pipe(zip(`src.zip`))
    .pipe(gulp.dest(`./`));
});