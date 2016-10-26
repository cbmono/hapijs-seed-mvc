//
// Dependencies
//
const gulp = require('gulp');
const gutil = require('gulp-util');
const codecov = require('gulp-codecov');
const jasmine = require('gulp-jasmine');
const istanbul = require('gulp-babel-istanbul');
const runSequence = require('run-sequence');
const mergeStream = require('merge-stream');
const babel = require('gulp-babel');

//
// Variables
//
const appSrc = [
  'src/**/*!(.spec).js',
  '!src/**/*.spec.js',
  '!src/logger.js',
  '!src/db.js'
];
const unitTestSrc = 'src/**/*.spec.js';
const apiTestSrc = 'tests/api/**/*.js';
const coverageSrc = './tests/coverage';

const coverageDone$ = () => {
  gutil.log('');
  gutil.log(gutil.colors.yellow('To see more Test Coverage details, run:'));
  gutil.log(gutil.colors.cyan(`open tests/coverage/lcov-report/index.html \n`));

  process.exit(0);
};

const coverageError$ = (err) => {
  gutil.log(gutil.colors.red('Error running code coverage: '), err);

  process.exit(1);
};

//
// Tasks
//

// Jasmine UnitTest's
gulp.task('jasmine:unit', () => gulp
  .src([unitTestSrc])
  .pipe(jasmine({
    verbose: true,
    includeStackTrace: true
  }))
  .on('error', (err) => {
    gutil.log(gutil.colors.red('Error running UnitTest\'s: '), err);

    process.exit(1);
  })
);


// Jasmine API tests
gulp.task('jasmine:api', () => gulp
  .src([apiTestSrc])
  .pipe(jasmine({
    verbose: true,
    includeStackTrace: true
  }))
  .on('error', (err) => {
    gutil.log(gutil.colors.red('Error running API Tests: '), err);

    process.exit(1);
  })
);


// Tests Coverage (with Jasmine)
gulp.task('test:coverage', () => mergeStream(
    gulp.src(appSrc).pipe(istanbul()),
    gulp.src([unitTestSrc]).pipe(babel())
  )
  .pipe(istanbul.hookRequire())
  .on('finish', () => gulp
    .src([unitTestSrc])
    .pipe(jasmine())
    .pipe(istanbul.writeReports({ dir: coverageSrc, reportOpts: { dir: coverageSrc } }))
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }))

    .on('finish', () => {
      // Only run codecov.io inside of a CI environment
      if (process.env.NODE_ENV && /^ci-/i.test(process.env.NODE_ENV)) {
        gulp
          .src(`${coverageSrc}/lcov.info`)
          .pipe(codecov())
          .on('finish', coverageDone$)
          .on('error', coverageError$);
      }
      else {
        coverageDone$();
      }
    })
    .on('error', coverageError$)
  )
  .on('error', coverageError$)
);

// Run only UnitTest's
gulp.task('test:unit', () => runSequence(
    'lint',
    'jasmine:unit',
    process.exit
  )
);


// Run only API tests
gulp.task('test:api', () => runSequence(
    'lint',
    'jasmine:api',
    process.exit
  )
);


// Run all tests (including tests coverage)
gulp.task('test', () => runSequence(
    ['lint', 'jasmine:unit'],
    ['jasmine:api'],
    'test:coverage'
  )
);
