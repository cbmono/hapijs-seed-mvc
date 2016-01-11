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
var appSrc = 'src/**/!(*.spec)*.js'
var unitTestSrc = 'src/**/*.spec.js'
var integrationTestSrc = 'tests/integration/**/*.spec.js'

//
// Tasks
//

// Mocha UnitTests
gulp.task('jasmine:unit', () => gulp
  .src([ unitTestSrc ])
  .pipe(jasmine({ verbose: true }))
  .on('error', process.exit.bind(process, 1))
)

// Mocha Integration tests
gulp.task('jasmine:integration', () => gulp
  .src([ integrationTestSrc ])
  .pipe(jasmine())
  .on('error', process.exit.bind(process, 1))
)

// Run only UnitTest's
gulp.task('test:unit', () => runSequence(
  'jshint',
  'jasmine:unit',
  process.exit
))

// Run only Integration tests
gulp.task('test:integration', () => runSequence(
  'jshint',
  'jasmine:integration',
  process.exit
))

// Run all tests
gulp.task('test', () => runSequence(
  'jshint',
  'jasmine:unit',
  'jasmine:integration',
  process.exit
))
.on('error', (error) => {
  gutil.log(gutil.colors.red('Error running tests: '), error)
  process.exit(1)
})
