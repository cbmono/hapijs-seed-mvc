# [hapi] Seed Project - MVC
[![Circle CI](https://circleci.com/gh/cbmono/hapijs-seed-mvc.svg?style=shield)](https://circleci.com/gh/cbmono/hapijs-seed-mvc)
[![Travis CI](https://travis-ci.org/cbmono/hapijs-seed-mvc.svg?branch=master)](https://travis-ci.org/cbmono/hapijs-seed-mvc)
[![codecov.io](https://codecov.io/github/cbmono/hapijs-seed-mvc/coverage.svg?branch=master)](https://codecov.io/github/cbmono/hapijs-seed-mvc?branch=master)
[![Dependency Status](https://david-dm.org/cbmono/hapijs-seed-mvc.svg)](https://david-dm.org/cbmono/hapijs-seed-mvc/master)
[![Dependency Status](https://david-dm.org/cbmono/hapijs-seed-mvc/dev-status.svg)](https://david-dm.org/cbmono/hapijs-seed-mvc/master#info=devDependencies)

This project is an application skeleton for a typical [hapi] RESTful API. You can use it to quickly bootstrap your [hapi] API projects and be ready to code the core of your App within minutes.

![image](https://cloud.githubusercontent.com/assets/352146/12811440/baeb4f62-cb2c-11e5-97e4-5236d99b493f.png)

The seed contains a sample [hapi] application (ToDo Lists) and is preconfigured to install the [hapi] framework and a bunch of development and testing tools for instant API development gratification. You will get all this by just running `npm install`:

- ES6 ToDo List example
- MVC file structure + base classes (a'la Rails/Laravel/Django)
- Relational Database support (via [knex.js])
  - MySQL
  - postgreSQL
  - SQLite3
  - Schema Migrations and Seeding
- Pre-configured environments (_dev_, _qa_, _staging_, _production_)
- Pre-configured CI settings ([Circle CI] / [Travis CI])
- Powerful payload validations via [joi]
- Auto-generated documentation ([lout])
- Unit & API/REST tests examples ([Jasmine2])
- Test Coverage ([istanbul])
- RESTful outputs
- Improved Logging and Remote debugging
- Healthcheck end-point
- [Gulp] for workflows (ie. watch files changes and launch local server)
- \+ all features and plugin's from [hapi]

---

## Prerequisites

- You need git to clone the hapi-seed repository: http://git-scm.com/

- node.js and npm are needed to execute the code: http://nodejs.org/.

- A relational database is needed, for instance postgreSQL:
  - Mac: http://postgresapp.com/
  - Linux/Windows: http://www.postgresql.org/download/


## Getting started

1. Fork this repo (top right button) and clone it from your account (replace `YOUR-USERNAME`)
  ```
  git clone https://github.com/YOUR-USERNAME/hapijs-seed-mvc.git
  cd hapijs-seed-mvc
  ```

2. Install the dependencies
  ```
  npm install
  ```

3. Create a Database. In case of postgreSQL, go into your psql terminal and enter:
  ```
  CREATE DATABASE todo;
  ```

4. Duplicate `config/dev.js.default` and rename it into `config/dev.js`. Then edit and enter your database settings (DB name goes into `config/default.js`).

5. [Migrate the database and seed it](#database-migration-and-seed)
  ```
  npm run db:migrate
  npm run db:seed
  ```

6. Run the app
  ```
  export NODE_ENV=dev
  npm start
  ```

7. Go to: [http://localhost:3000](http://localhost:3000)


## Database Migration and Seed

Knex is taking care of migrating the DB schema and populating (seeding) the tables.
The documentation is available here: http://knexjs.org/#Migrations-CLI.

### Migration

Knex will keep a history of your executed migrations and save them into the DB table `knex_migrations`.

You have to save the migrations in `database/migrations/`. It's recommended to prefix the files with an incrementing number or timestamp. Otherwise it might be hard to keep track of the order the DB changes were executed.

```
npm run db:migrate
```

### Rollback

You can rollback the last group of executed migrations:
```
npm run db:rollback
```

### Seeds

You can populate your DB tables by executing seed files through Knex. Seed files are saved in `database/seeds/`.
```
npm run db:seed
```

## Tests

This project has two kind of tests: _UnitTest_ and _API Tests_. For both [Jasmine2] is being used. If you want to execute both kind of tests (including Test Coverage), run:
```
npm test
```

### UnitTest's

UnitTest's are stored within the folders of the implementation and contain `.spec` as part of their file name. For instance `src/controllers/main.controller.js` and `src/controllers/main.controller.spec.js`. This pattern makes it easier not to forget to write tests :)

You can execute them by running:
```
npm run test:unit
```

### API Tests

API Tests, also known as Integration Tests, are saved in `/tests/api` and are meant to test the RESTful end-points of your App.

In order to test the server responses you have to start the server in a new terminal/tab:
```
cd /path/to/your/project
export NODE_ENV=dev
npm start
```

Then execute your API Tests from a different terminal:
```
export NODE_ENV=dev     # only needed once
npm run test:api
```

### Test Coverage

Test Coverage reports are generated through [istanbul]. The default threshold to pass the test coverage is set at [90%](https://github.com/cbmono/hapijs-seed-mvc/blob/master/tasks/gulp.tests.js#L71):
```
npm run test:coverage
```

Full reports can be found in `./tests/coverage`. Or just open `./tests/coverage/lcov-report` in your browser:
```
open tests/coverage/lcov-report/index.html
```


## API Documentation

The auto-generated API documentation is provided by [lout] and it's based on the configuration of every route (`/routes`).

[http://localhost:3000/docs](http://localhost:3000/docs)


## Remote debug setup

The configuration allows to setup the TCP debug port for node remote debug functionality (5858 by default). This should be overridden when multiple micro node.js services are running on a local machine in a typical dev environment setup.

Remote debug can be used the command line using node debug or with IDEs supporting this feature.


## Go to Staging/Production

Deploy your App on a server and you can use [forever] to run it. [forever] is used to run your App continuously. It will automatically restart if it crashes.
```
[sudo] npm install forever -g
cd /path/to/your/project

export NODE_ENV=staging
forever start index.js
```

## Others

* [lodash] is available across the whole app
  ```js
  _.keys({ foo: 'bar' })
  ```

* Logging with [winston] and [purdy] is available across the whole app
  ```js
  log.debug('Debugging log', { foo: 'bar' })

  log.info('Info output')

  log.error('Error: ', err)
  ```




[hapi]:       http://hapijs.com/
[knex.js]:    http://knexjs.org/
[lout]:       https://github.com/hapijs/lout
[joi]:        https://github.com/hapijs/joi
[Jasmine2]:   http://jasmine.github.io/2.4/introduction.html
[Gulp]:       http://gulpjs.com/
[forever]:    https://github.com/foreverjs/forever
[winston]:    https://www.npmjs.com/package/winston
[purdy]:      https://www.npmjs.com/package/purdy
[lodash]:     https://lodash.com/
[Circle CI]:  https://circleci.com
[Travis CI]:  https://travis-ci.org
[istanbul]:   https://gotwarlost.github.io/istanbul
