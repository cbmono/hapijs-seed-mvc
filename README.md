# [hapi] (MVC) Seed Project

This project runs the latest version of hapi JS to help building RESTful applications, featuring the following:

- ES6
- MVC file structure
- RDMS (via [knex.js]), supporting:
  - MySQL / MariaDB
  - postgreSQL
  - SQLite3
  - Schema Migrations and Seeds
- Support for many environments (_local_, _dev_, _staging_, _production_)
- Auto-generated documentation ([lout])
- Unit / Integration tests ([Mocha]/[Chai])
- Remote debugging
- Logging
- [Gulp]

## Getting started

1. Duplicate `config/local.coffee.default` into `config/local.coffee` and enter your database settings (only necessary once)

2. [Migrate the database](#database-migration-and-seed) (only necessary once)

3. Install the dependencies and run the app
````
$ npm install
$ export NODE_ENV=staging # local | staging | production
$ gulp
````

If `NODE_ENV` wasn't defined, then `local` is used

4. Go to [http://localhost:3000](http://localhost:3000)


## Dependencies

- postgreSQL | MySQL | MariaDB | SQLite3

## Database migration and seed
Knex is taking care of migrating the DB schema and populating (seeding) the tables.
The documentation is available here: http://knexjs.org/#Migrations-CLI
There's a gulp task to execute to create or update the DB schema:
````
$ export NODE_ENV=local
$ gulp database:migrate
````

## Tests
Unit tests are stored within the folders of the implementations.
Integration tests are stored under /tests/integration.
````
npm test
````
If you are testing server responses probably you have to start the server in another terminal using ```` gulp ````


## Remote debug setup
The configuration allows to setup the TCP debug port for node remote debug functionality (5858 be default). This should be
overridden when multiple micro node.js services are running on a local machine in a typical dev environment setup.
Remote debug can be used the command line using node debug or with IDEs supporting this feature.


## Documentation
The auto-generated documentation of the API is available under /docs.
It's based on the options defined in the routes:

[http://localhost:3000/docs](http://localhost:3000/docs)



[hapi]:     http://hapijs.com/
[knex.js]:  http://knexjs.org/
[lout]:     https://github.com/hapijs/lout
[Mocha]:    https://mochajs.org/
[Chai]:     http://chaijs.com/
[Gulp]:     http://gulpjs.com/
