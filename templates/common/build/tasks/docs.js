var gulp = require('gulp'),
  typedoc = require('gulp-typedoc'),
  pjson = require('../../package.json'),
  paths = require('../paths.js');

gulp.task('docs', function() {
  return gulp.src([paths.src + '/**/*.ts'])
    .pipe(typedoc({
      module: 'commonjs',
      target: 'es5',
      includeDeclarations: true,
      exclude: 'node_modules',

      out: paths.docs,
      mode: 'file',

      name: pjson.name,
      ignoreCompilerErrors: true,
      excludeExternals: true,
      version: true
    }));
});
