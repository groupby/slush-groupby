var webpackConfig = require('./webpack.conf'),
  paths = require('./build/paths');

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai', 'sinon'],
    files: [
      paths.test + '/bootstrap.ts',
      paths.test + '/**/*.ts'
    ],
    exclude: [
      paths.test + '/utils/**',
      paths.test + '/**/_suite.ts'
    ],
    preprocessors: {
      paths.test + '/**/*.ts': ['webpack']
    },
    webpack: {
      module: webpackConfig.module,
      resolve: webpackConfig.resolve
    },
    webpackMiddleware: {
      noInfo: true
    },
    client: {
      captureConsole: true
    },
    browsers: ['PhantomJS'],
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: true,
    concurrency: Infinity
  });
};
