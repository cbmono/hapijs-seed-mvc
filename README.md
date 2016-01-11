# [hapi] Seed Project - MVC / RDMS

This project is an application skeleton for a typical [hapi] RESTful API. You can use it to quickly bootstrap your [hapi] API projects and be ready to code the core of your App within minutes.

The seed contains a sample [hapi] application (ToDo Lists) and is preconfigured to install the [hapi] framework and a bunch of development and testing tools for instant API development gratification. You will get all this by just running `npm install`:

- ES6 ToDo List example
- MVC file structure + base classes (a'la Rails/Laravel/Django)
- Relational Database support (via [knex.js])
  - MySQL / MariaDB
  - postgreSQL
  - SQLite3
  - Schema Migrations and Seeding
- Pre-configured environments (_local_, _dev_, _staging_, _production_)
- Powerful payload validations via [joi]
- Auto-generated documentation ([lout])
- Unit & Integration tests examples ([Jasmine2])
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

1. Fork this repo (top right button) and clone it form your account (replace `YOUR-USERNAME`)
  ```
  $ git clone https://github.com/YOUR-USERNAME/hapijs-seed-mvc.git
  $ cd hapijs-seed-mvc
  ```

2. Install the dependencies
  ```
  $ npm install
  ```

3. Create a Database. In case of postgreSQL, go into your psql terminal and enter:
  ```
  $ CREATE DATABASE todo;
  ```

4. Duplicate `config/local.js.default` and rename it into `config/local.js`. Then edit and enter your database settings (DB name goes into `config/default.js`).

5. [Migrate the database and seed it](#database-migration-and-seed)
  ```
  $ gulp db:migrate
  $ gulp db:seed
  ```

6. Run the app
  ````
  $ gulp
  ````

  (if `NODE_ENV` wasn't exported, then `local` is going to be used)


## Database Migration and Seed

Knex is taking care of migrating the DB schema and populating (seeding) the tables.
The documentation is available here: http://knexjs.org/#Migrations-CLI.

### Migration

Knex will keep a history of your executed migrations and save them into the DB table `knex_migrations`.

You have to save the migrations in `database/migrations/`. It's recommended to prefix the files with an incrementing number or timestamp. Otherwise it might be hard to keep track of the order the DB changes were executed.

````
$ gulp db:migrate
````

### Rollback

You can rollback the last group of executed migrations.
You have to save the seed files in `database/seeds/`.

````
$ gulp db:rollback
````

### Seeds

You can populate your DB tables by running seed files:


## Tests

This project has to kind of tests: UnitTest and Integration tests. For both [Jasmine2] is being used. If you want to execute both kind of tests at the same time, you can do:
```
$ gulp test
```

### UnitTest's

UnitTest's are stored within the folders of the implementation and contain `.spec` as part of their file name. For instance `src/controllers/main.controller.js` and `src/controllers/main.controller.spec.js`. This pattern makes it easier not to forget to write tests :)

You can execute them by running:
```
$ gulp test:unit
```

### Integration Tests

Integration Tests are stored under `/tests/integration` and are meant to test the API end-points, for instance: `curl localhost:3000/healthcheck`

In order to test the server responses you have to start the server in a new terminal/tab:
```
$ cd /path/to/your/project
$ gulp
```

Then execute your integration test by running:
```
$ gulp test:integration
```

## API Documentation

The auto-generated API documentation is provided by [lout] and it's based on the configuration of every route (`/routes`).

http://localhost:3000/docs


## Remote debug setup

The configuration allows to setup the TCP debug port for node remote debug functionality (5858 by default). This should be overridden when multiple micro node.js services are running on a local machine in a typical dev environment setup.

Remote debug can be used the command line using node debug or with IDEs supporting this feature.


## Go to Staging/Production

Deploy your App on a server and you can use [forever] to run it. [forever] is used to run your App continuously. It will automatically restart if it crashes.
```
$ [sudo] npm install forever -g
$ cd /path/to/your/project

$ export NODE_ENV=staging
$ forever start index.js
```

[hapi]:     http://hapijs.com/
[knex.js]:  http://knexjs.org/
[lout]:     https://github.com/hapijs/lout
[joi]:      https://github.com/hapijs/joi
[Jasmine2]: http://jasmine.github.io/2.4/introduction.html
[Gulp]:     http://gulpjs.com/
[forever]:  https://github.com/foreverjs/forever
