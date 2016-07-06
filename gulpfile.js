require('babel-polyfill');
require('babel-register');

//
// Dependencies
//
const path = require('path');
const glob = require('glob');
const gulp = require('gulp');

//
// Variables
//
const gulpTasksSrc = './tasks/**/gulp.*.js';

//
// Load Gulp Tasks
//
glob.sync(gulpTasksSrc)
  .forEach((file) => require(path.resolve(file)));

//
// Default (gulp) task
//
//  * Lint Javascript files
//  * Run local node server
//  * Resatart on file changes
gulp.task('default', [
  'lint',
  'nodemon',
]);
