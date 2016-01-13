'use static'

//
// Dependencies
//
const gulp = require('gulp')
const jshint = require('gulp-jshint')
const nodemon = require('gulp-nodemon')
const config = require('config')

//
// Variables
//
var appSrc = 'src/**/*.js'
  , appInitSrc = 'index.js'

//
// Tasks
//

// Lint Javascript code
gulp.task('jshint', () => gulp
  .src(appSrc)
  .pipe(jshint())
)

// Local node server
gulp.task('nodemon', nodemon.bind({}, {
  script: appInitSrc,
  ext: 'js html',
  ignore: [ 'src/**/*.spec.js', 'tests/', 'tasks/gulp.*.js' ],
  tasks: [ 'jshint' ],
  execMap: {
    js: 'node --debug=' + config.get('node.debugPort', 5858)
  }
}))
