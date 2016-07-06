//
// This config file is used for Continues Integration
//
// NOTE: don't forget to export `ci` as NODE_ENV:
//
//   $ export NODE_ENV=ci-circle
//
module.exports = {

  database : {
    //
    // Postgres
    //
    client     : 'pg',
    connection : {
      database : 'circle_test',
      host     : 'localhost',
      port     : 5432,
      user     : 'ubuntu',
      password : '',
    },
  },

  //
  // Logging
  //
  logging : {
    console : {
      level : 'debug',
    },
  },
};
