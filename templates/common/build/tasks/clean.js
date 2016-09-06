var gulp = require('gulp'),
  del = require('del'),
  paths = require('../paths.js');
<% if (language === 'typescript') { %>
gulp.task('clean:typings', function(cb) {
  del([
    paths.typings
  ], cb);
});<% } %>

gulp.task('clean:dist', function(cb) {
  del([
    paths.dist
  ], cb);
});

gulp.task('clean', ['clean:dist'<% if (language === 'typescript') { %>, 'clean:typings'<% } %>]);
