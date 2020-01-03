'use strict';

var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync  = require('browser-sync').create();

sass.compiler = require('node-sass');

gulp.task('sass', function () {
  return gulp.src('./styles/main.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./styles/'))
    .pipe(autoprefixer({cascade: false}))
    .pipe(browserSync.stream());
});

gulp.task('watch', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch('styles/**/*.scss', gulp.series('sass'));
  gulp.watch("./**/*.html").on('change', browserSync.reload);
  gulp.watch("./**/*.js").on('change', browserSync.reload);
});