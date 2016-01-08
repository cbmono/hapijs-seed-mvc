'use static'

//
// Dependencies
//
const gulp = require('gulp')
const gutil = require('gulp-util')
const Knex = require('knex')
const config = require('config')

//
// Variables
//
var jsSrc = 'src/**/*.js'
var migrationSrc = './database/migrations'
var seedSrc = './database/seeds'
var knexConfig = JSON.parse(JSON.stringify(config.get('database')))

//
// Tasks
//

// Apply latest migrations
gulp.task('database:migrate', () => {
  var knex = Knex(knexConfig)

  knex.migrate.latest({
    directory: migrationSrc
  })
  .then(() => {
    gutil.log('>>> Migration successful')
    process.exit(0)
  })
  .catch((err) => {
    gutil.error('Migrate failed', err)
    process.exit(1)
  })
})

// Rollback latest migration
gulp.task('database:rollback', () => {
  var knex = Knex(knexConfig)

  knex.migrate.rollback({
    directory: migrationSrc
  })
  .then(() => {
    gutil.log('>>> Rollback successful')
    process.exit(0)
  })
  .catch((err) => {
    gutil.error('Rollback failed', err)
    process.exit(1)
  })
})

// Insert seeds
gulp.task('database:seed', () => {
  var knex = Knex(knexConfig)

  knex.seed.run({
    directory: seedSrc
  })
  .then(() => {
    gutil.log('>>> Seed successful')
    process.exit(0)
  })
  .catch((err) => {
    gutil.error('Seed failed', err)
    process.exit(1)
  })
})
