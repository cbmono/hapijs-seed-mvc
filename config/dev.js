//
// If you change this file to local.coffee,
// it will be the last one to be loaded
// and the values will overwrite all the others.
//
module.exports = {
  //
  // Database
  // DB name is defined in default.coffee
  //
  database: {
    //
    // Postgres
    //
    client: 'pg',
    connection: {
      database: 'test',
      host: 'localhost',
      port: 5432,
      user: 'root',
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
