module.exports = {
  //
  // API url
  //
  apiUrl : 'http://api.my-domain.test',

  //
  // Database
  // DB name is defined in default.js
  //
  database : {
    //
    // SQLite3
    //
    client     : 'sqlite3',
    connection : {
      filename : './my_SQLite3.db',
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
