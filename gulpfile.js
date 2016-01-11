'use static'

require('babel-polyfill')
require('babel-register')

//
// Dependencies
//
const path = require('path')
const glob = require('glob')
const gulp = require('gulp')

//
// Variables
//
var gulpTasksSrc = './tasks/**/gulp.*.js'

//
// Load Gulp Tasks
//
glob.sync( gulpTasksSrc )
  .forEach((file) => require(path.resolve(file)))

//
// Default (gulp) task
//
//  * Lint Javascript files
//  * Run local node server
//  * Watch file changes
//
gulp.task('default', [
  'jshint',
  'nodemon',
  'watch'
])
