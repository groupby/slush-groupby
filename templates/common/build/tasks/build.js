var gulp = require('gulp'),
  runSequence = require('run-sequence');

gulp.task('build', function(cb) {
  runSequence(
    'clean',
    'typings:install', ['webpack:bundle', 'webpack:minify'],
    cb
  );
});
