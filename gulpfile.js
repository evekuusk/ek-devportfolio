'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    uglifyCSS = require('gulp-minify-css'),
    maps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    del = require('del');

gulp.task("concatScripts", function() {
  return gulp.src([
    // vendor scripts
    'js/vendor/jquery.min.js',
    'js/vendor/angular.min.js',
    'js/vendor/angular-route.js',
    'js/vendor/draggabilly.pkgd.js',
    'js/vendor/featherlight.js',
    // custom scripts
    'js/main.js',
    'js/controllers/**',
    'js/directives/**',
    'js/services/**'
  ])
  .pipe(maps.init())
  .pipe(concat('app.js'))
  .pipe(maps.write('./'))
  .pipe(gulp.dest('js'));
})

gulp.task("minCSS", function() {
  return gulp.src([
    "css/styles.css"
  ])
  .pipe(uglifyCSS().on('error', function(e) { console.log('\x07',e.message); return this.end(); }))
  .pipe(rename(function (path) {
    path.basename += ".min";
  }))
  .pipe(gulp.dest("css"))
})

gulp.task("minJS", ["concatScripts"],function() {
  return gulp.src(['js/app.js'])
  .pipe(uglify().on('error', function(e) { console.log('\x07',e.message); return this.end(); }))
  .pipe(rename(function (path) {
    path.basename += ".min";
  }))
  .pipe(gulp.dest('js'));
})

gulp.task("minify", ["minJS", "minCSS"], function() {
})

gulp.task('clean', function() {
  del('public');
})

gulp.task("build", ["clean", "minify"], function() {
  return gulp.src([
    "css/styles.min.css",
    "js/app.min.js",
    "data/**",
    "img/**",
    "templates/**/**",
    "*.php"
  ], {base: './'})
  .pipe(gulp.dest("public"));
})

gulp.task("default", ["build"], function() {
})

gulp.task("watch", ['build'],function() {
  // gulp.watch('./php/**', ['build']);
  gulp.watch('./js/**.js', ['build']);
  gulp.watch('./js/controllers/*.js', ['build']);
  gulp.watch('./js/directives/*.js', ['build']);
  gulp.watch('./css/styles.css', ['build']);
  gulp.watch('./index.php', ['build']);
  gulp.watch('./templates/**/*.php', ['build']);
  gulp.watch('./templates/*.php', ['build']);
})
