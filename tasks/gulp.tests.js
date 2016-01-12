'use static'

//
// Dependencies
//
const gulp = require('gulp')
const gutil = require('gulp-util')
const jasmine = require('gulp-jasmine')
const runSequence = require('run-sequence')

//
// Variables
//
var unitTestSrc = 'src/**/*.spec.js'
var apiTestSrc = 'tests/api/**/*.js'

//
// Tasks
//

// Mocha UnitTests
gulp.task('jasmine:unit', () => gulp
  .src([ unitTestSrc ])
  .pipe(jasmine({ verbose: true }))
  .on('error', (err) => {
    gutil.log(gutil.colors.red(`Error running UnitTest's: `), err)
    process.exit(1)
  })
)

// Mocha Integration tests
gulp.task('jasmine:api', () => gulp
  .src([ apiTestSrc ])
  .pipe(jasmine({ verbose: true }))
  .on('error', (err) => {
    gutil.log(gutil.colors.red('Error running API Tests: '), err)
    process.exit(1)
  })
)

// Run only UnitTest's
gulp.task('test:unit', () => runSequence(
  'jshint',
  'jasmine:unit',
  process.exit
))

// Run only Integration tests
gulp.task('test:api', () => runSequence(
  'jshint',
  'jasmine:api',
  process.exit
))

// Run all tests
gulp.task('test', () => runSequence(
  'jshint',
  'jasmine:unit',
  'jasmine:api',
  process.exit
))
.on('error', (err) => {
  gutil.log(gutil.colors.red('Error running tests: '), err)
  process.exit(1)
})
