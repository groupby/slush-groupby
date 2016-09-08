/*
 * slush-groupby
 * https://github.com/groupby/slush-groupby
 *
 * Copyright (c) 2016, Ben Teichman
 * Licensed under the MIT license.
 */

'use strict';

var gulp = require('gulp'),
  install = require('gulp-install'),
  conflict = require('gulp-conflict'),
  template = require('gulp-template'),
  rename = require('gulp-rename'),
  _ = require('underscore.string'),
  inquirer = require('inquirer'),
  path = require('path');

function format(string) {
  var username = string.toLowerCase();
  return username.replace(/\s/g, '');
}

var defaults = (function() {
  var workingDirName = path.basename(process.cwd()),
    homeDir, osUserName, configFile, user;

  if (process.platform === 'win32') {
    homeDir = process.env.USERPROFILE;
    osUserName = process.env.USERNAME || path.basename(homeDir).toLowerCase();
  } else {
    homeDir = process.env.HOME || process.env.HOMEPATH;
    osUserName = homeDir && homeDir.split('/').pop() || 'root';
  }

  configFile = path.join(homeDir, '.gitconfig');
  user = {};

  if (require('fs').existsSync(configFile)) {
    user = require('iniparser').parseSync(configFile).user;
  }

  return {
    appName: workingDirName,
    userName: osUserName || format(user.name || ''),
    authorName: user.name || '',
    authorEmail: user.email || ''
  };
})();

gulp.task('default', function(done) {
  var prompts = [{
    name: 'appName',
    message: 'What is the name of your project?',
    default: defaults.appName
  }, {
    name: 'appDescription',
    message: 'What is the description?'
  }, {
    name: 'appVersion',
    message: 'What is the version of your project?',
    default: '0.0.1'
  }, {
    name: 'authorName',
    message: 'What is the author name?',
    default: defaults.authorName
  }, {
    name: 'authorEmail',
    message: 'What is the author email?',
    default: defaults.authorEmail
  }, {
    name: 'userName',
    message: 'What is the github username?',
    default: defaults.userName
  }, {
    type: 'confirm',
    name: 'simple',
    message: 'Create a simple js project?',
    default: false
  }, {
    when: function(answers) {
      return !answers.simple;
    },
    type: 'list',
    name: 'language',
    message: 'Which flavour of javascript?',
    choices: [{
      name: 'Typescript',
      value: 'typescript'
    }, {
      name: 'ES6',
      value: 'es6'
    }, {
      name: 'Vanilla JS',
      value: 'vanilla'
    }],
    default: 'typescript'
  }, {
    type: 'confirm',
    name: 'circleci',
    message: 'Will this project build on Circle CI?',
    default: true
  }, {
    type: 'confirm',
    name: 'cdn',
    message: 'Will this project be deployed to the CDN?',
    default: false
  }, {
    type: 'confirm',
    name: 'moveon',
    message: 'Continue?'
  }];
  //Ask
  inquirer.prompt(prompts,
    function(answers) {
      if (!answers.moveon) {
        return done();
      }
      answers.appNameSlug = _.slugify(answers.appName);

      var files = [__dirname + '/templates/simple/**'];

      if (!answers.simple) {
        files.push(__dirname + '/templates/common/**');
      }
      if (answers.language === 'typescript') {
        files.push(__dirname + '/templates/typescript/**');
      }
      if (answers.circleci) {
        files.push(__dirname + '/templates/circleci/**');
      }
      if (answers.cdn) {
        files.push(__dirname + '/templates/cdn/**');
      }

      gulp.src(files)
        .pipe(template(answers))
        .pipe(rename(function(file) {
          if (file.basename[0] === '_') {
            file.basename = '.' + file.basename.slice(1);
          }
        }))
        .pipe(conflict('./'))
        .pipe(gulp.dest('./'))
        .pipe(install())
        .on('end', function() {
          done();
        });
    });
});
