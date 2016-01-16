//
// This config file is used for Continues Integration
//
// NOTE: don't forget to export `ci` as NODE_ENV:
//
//   $ export NODE_ENV=ci
//
module.exports = {

  database: {
    //
    // Postgres
    //
    client: 'pg',
    connection: {
      database: 'todo',
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: ''
    }
  },

  //
  // Logging
  //
  logging: {
    console: {
      level: 'debug'
    }
  }
}
