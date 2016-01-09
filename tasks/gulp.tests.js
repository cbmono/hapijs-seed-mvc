'use static'

//
// Dependencies
//
const gulp = require('gulp')
const gutil = require('gulp-util')
const mocha = require('gulp-mocha')
const runSequence = require('run-sequence')

//
// Variables
//
var unitTestSrc = 'src/**/*.spec.js'
var integrationTestSrc = 'tests/integration/**/*.spec.js'

//
// Tasks
//

// Mocha UnitTests
gulp.task('mocha:unit', () => gulp
  .src([ unitTestSrc ])
  .pipe(mocha({ reporter: 'spec' }))
  .on('error', process.exit.bind(process, 1))
)

// Mocha Integration tests
gulp.task('mocha:integration', () => gulp
  .src([ integrationTestSrc ])
  .pipe(mocha({ reporter: 'spec', timeout: 10000 }))
  .on('error', process.exit.bind(process, 1))
)

// Run only UnitTest's
gulp.task('test:unit', () => runSequence(
  'jshint',
  'mocha:unit',
  process.exit
))

// Run only Integration tests
gulp.task('test:integration', () => runSequence(
  'jshint',
  'mocha:integration',
  process.exit
))

// Run all tests
gulp.task('test', () => runSequence(
  'jshint',
  'mocha:unit',
  'mocha:integration',
  process.exit
))
.on('error', (error) => {
  gutil.log(gutil.colors.red('Error running tests: '), error)
  process.exit(1)
})
