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
var jsSrc = 'src/**/*.js'
var appInitSrc = 'index.js'

//
// Tasks
//

// Lint Javascript code
gulp.task('jshint', () => gulp
  .src(jsSrc)
  .pipe(jshint())
)

// Keep track of file changes
gulp.task('watch', () => gulp
  .watch(jsSrc, [ 'jshint' ])
)

// Local node server
gulp.task('nodemon', nodemon.bind({}, {
  script: appInitSrc,
  ext: 'js html',
  tasks: [ 'jshint' ],
  execMap: {
    js: 'node --debug=' + config.get('node.debugPort', 5858)
  }
}))
