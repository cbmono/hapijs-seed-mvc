'use static'

//
// Dependencies
//
const gulp = require('gulp')
const babel = require('gulp-babel')
const gutil = require('gulp-util')
const codecov = require('gulp-codecov.io')
const jasmine = require('gulp-jasmine')
const istanbul = require('gulp-babel-istanbul')
const runSequence = require('run-sequence')
const mergeStream = require('merge-stream')

//
// Variables
//
var appSrc = 'src/**/*!(.spec).js'
var unitTestSrc = 'src/**/*.spec.js'
var apiTestSrc = 'tests/api/**/*.js'
var coverageSrc = './tests/coverage'

//
// Tasks
//


// Jasmine UnitTest's
gulp.task('jasmine:unit', () => gulp
  .src([ unitTestSrc ])
  .pipe(jasmine({
    verbose: true,
    includeStackTrace: true
  }))
  .on('error', (err) => {
    gutil.log(gutil.colors.red(`Error running UnitTest's: `), err)
    process.exit(1)
  })
)


// Jasmine API tests
gulp.task('jasmine:api', () => gulp
  .src([ apiTestSrc ])
  .pipe(jasmine({
    verbose: true,
    includeStackTrace: true,
  }))
  .on('error', (err) => {
    gutil.log(gutil.colors.red('Error running API Tests: '), err)
    process.exit(1)
  })
)


// Tests Coverage (with Jasmine)
gulp.task('test:coverage', () => mergeStream(
    gulp.src([ appSrc, '!' + unitTestSrc ]).pipe(istanbul()),
    gulp.src([ unitTestSrc ]).pipe(babel())
  )
  .pipe(istanbul.hookRequire())
  .on('finish', () => gulp
    .src([ unitTestSrc ])
    .pipe(jasmine())
    .pipe(istanbul.writeReports({ dir: coverageSrc, reportOpts: { dir: coverageSrc }}))
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }))

    .on('finish', () => {
      // Only run codecov.io inside of an CI env
      if (process.env.NODE_ENV && process.env.NODE_ENV.match(/^ci-/i).length) {
        gulp
          .src(coverageSrc + '/lcov.info')
          .pipe(codecov())
          .on('finish', _coverageDone)
          .on('error', _coverageError)
      }
      else {
        _coverageDone()
      }
    })
    .on('error', _coverageError)
  )
  .on('error', _coverageError)
)

let _coverageDone = () => {
  gutil.log('')
  gutil.log(gutil.colors.yellow('To see more Test Coverage details, run:'))
  gutil.log(gutil.colors.cyan('open tests/coverage/lcov-report/index.html' + `\n`))
  process.exit(0)
}
let _coverageError = (err) => {
  gutil.log(gutil.colors.red(`Error running code coverage: `), err)
  process.exit(1)
}


// Run only UnitTest's
gulp.task('test:unit', () => runSequence(
    'jshint',
    'jasmine:unit',
    process.exit
  )
)


// Run only API tests
gulp.task('test:api', () => runSequence(
    'jshint',
    'jasmine:api',
    process.exit
  )
)


// Run all tests (including tests coverage)
gulp.task('test', () => runSequence(
    [ 'jshint', 'jasmine:unit' ],
    [ 'jasmine:api' ],
    'test:coverage'
  )
)
