// Gulpfile.js

// Check required packages
const gulp = require('gulp');
const rename = require("gulp-rename");
// CSS compiling
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');

function style() {
  return gulp.src('scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('css/'))
    .pipe(cleanCSS({compatibility: 'ie9', debug: true}))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('css'));
}


// Watch task
function watch() {
  gulp.watch('scss/**/*.scss', style);
}

exports.style = style;
exports.default = watch;
