//
// Dependencies
//
const gulp = require('gulp');
const gutil = require('gulp-util');
const Knex = require('knex');
const config = require('config');

//
// Variables
//
const migrationSrc = './database/migrations';
const seedSrc = './database/seeds';
const knexConfig = JSON.parse(JSON.stringify(config.get('database')));


//
// Tasks
//

// Apply latest migration
gulp.task('db:migrate', () => {
  const knex = Knex(knexConfig);

  knex.migrate.latest({
    directory: migrationSrc,
  })
  .then((response) => {
    if (response[1].length) {
      gutil.log(gutil.colors.green.bold('Migration successful!'));
      gutil.log(
        gutil.colors.yellow('> Executed Migration(s):'),
        `\n - ${response[1].join('\n- ')}`
      );
    }
    else {
      gutil.log(gutil.colors.yellow.bold('DB Schema already up to date'));
    }

    process.exit(0);
  })
  .catch((err) => {
    gutil.log(gutil.colors.red.bold('Migration failed: '), err);
    process.exit(1);
  });
});

// Rollback latest migration
gulp.task('db:rollback', () => {
  const knex = Knex(knexConfig);

  knex.migrate.rollback({
    directory: migrationSrc,
  })
  .then((response) => {
    if (response[1].length) {
      gutil.log(gutil.colors.green.bold('Rollback successful!'));
      gutil.log(
        gutil.colors.yellow('> Rolledback Migration(s):'),
        `\n - ${response[1].join('\n- ')}`
      );
    }
    else {
      gutil.log(gutil.colors.yellow.bold('No migrations to Rollback'));
    }

    process.exit(0);
  })
  .catch((err) => {
    gutil.log(gutil.colors.red.bold('Rollback failed: '), err);
    process.exit(1);
  });
});

// Insert seeds
gulp.task('db:seed', () => {
  const knex = Knex(knexConfig);

  knex.seed.run({
    directory: seedSrc,
  })
  .then((response) => {
    if (response[0].length) {
      gutil.log(gutil.colors.green.bold('Seed successful!'));
      gutil.log(
        gutil.colors.yellow('> Executed Seeds:'),
        `\n - ${response[0].join('\n- ')}`
      );
    }
    else {
      gutil.log(gutil.colors.yellow.bold('No Seed files to run'));
    }

    process.exit(0);
  })
  .catch((err) => {
    gutil.log(gutil.colors.red('Seed failed: '), err);
    process.exit(1);
  });
});
