// Gulpfile.js

// Check required packages
var gulp = require('gulp');
var sass = require('gulp-sass');



// Concatenate Sass task
gulp.task('sass', function() {
  gulp.src('scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css/'));
});



// Watch task
gulp.task('default',function() {
    gulp.watch('scss/**/*.scss',['sass']);
});

