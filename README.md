# [hapi] Seed Project (MVC / RDMS)

This project is an application skeleton for a typical [hapi] RESTful API. You can use it to quickly bootstrap your [hapi] API projects and be ready to deploy within minutes.

The seed contains a sample [hapi] application (ToDo Lists) and is preconfigured to install the [hapi] framework and a bunch of development and testing tools for instant API development gratification. You will get all this by just running `npm install`:

- ES6 ToDo List example
- MVC file structure + base classes (a'la Rails/Laravel/Django)
- Relational Database support (via [knex.js])
  - MySQL / MariaDB
  - postgreSQL
  - SQLite3
  - Schema Migrations and Seeding
- Pre-configured environments (_local_, _dev_, _staging_, _production_)
- Auto-generated documentation ([lout])
- Unit & Integration tests examples ([Mocha]/[Chai])
- RESTful outputs
- Improved Logging and Remote debugging
- Healthcheck end-point
- [Gulp] for workflows (ie. launch local server for development)
- \+ all features and plugin's from [hapi]

---

## Prerequisites

- You need git to clone the hapi-seed repository: http://git-scm.com/

- node.js and npm are needed to execute the code: http://nodejs.org/.

- A relational database is needed, for instance postgreSQL:
  - Mac: http://postgresapp.com/
  - Linux/Windows: http://www.postgresql.org/download/


## Getting started

To get you started you can simply clone the hapi-seed repository and install the dependencies:

1. `git clone https://github.com/cbmono/hapijs-mvc-seed-es6.git`

2. Install the dependencies
  ```
  $ npm install
  ```

3. Create a Database
  ```
  $ CREATE DATABASE todo;
  ```

4. Duplicate `config/local.js.default` and rename into `config/local.js`. Then edit and enter your database settings (DB name goes into `config/default.js`).

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

## Go to staging/production
```

```

[hapi]:     http://hapijs.com/
[knex.js]:  http://knexjs.org/
[lout]:     https://github.com/hapijs/lout
[Mocha]:    https://mochajs.org/
[Chai]:     http://chaijs.com/
[Gulp]:     http://gulpjs.com/
