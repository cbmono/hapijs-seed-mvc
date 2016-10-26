//
// Dependencies
//
const gulp = require('gulp');
const gutil = require('gulp-util');
const eslint = require('gulp-eslint');
const nodemon = require('gulp-nodemon');
const config = require('config');

//
// Variables
//
const appInitSrc = './src/index.js';
const ignoreSrc = [
  'coverage',
  'src/**/*.spec.js',
  'libs/tasks/gulp.*.js',
  'tests/',
];

//
// Tasks
//

// Lint Javascript code
gulp.task('lint', () => gulp.src(['./src/**/*.js', '!node_modules/**'])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())

        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
);

// Local node server
gulp.task('nodemon', () => {
  if (!process.env.NODE_ENV) {
    gutil.log('');
    gutil.log(gutil.colors.red('NODE_ENV is not defined'));
    gutil.log(gutil.colors.cyan('Please run: export NODE_ENV=dev \n'));

    process.exit(1);
  }

  nodemon({
    script: appInitSrc,
    ext: 'js html',
    ignore: ignoreSrc,
    tasks: ['lint'],
    execMap: {
      js: `babel-node --debug=${config.get('node.debugPort', 5858)}`
    }
  })
  .on('crash', () => {
    gutil.log(gutil.colors.red('Local server crashed (nodemon): '));

    // Exit if running on CI environment
    if (process.env.NODE_ENV && /^ci-/i.test(process.env.NODE_ENV)) {
      process.exit(1);
    }
  });
});
