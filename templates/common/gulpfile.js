var gulp = require('gulp');

require('git-guppy')(gulp);
require('require-dir')('build/tasks');

gulp.task('default', ['build']);
