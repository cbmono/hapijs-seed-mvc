module.exports = {
  //
  // API url
  //
  apiUrl : 'https://api.my-domain.com',

  //
  // Database
  // DB name is defined in default.js
  //
  database : {
    //
    // Postgres
    //
    client     : 'pg',
    connection : {
      host     : 'localhost',
      port     : 5432,
      user     : 'root',
      password : '',
    },
  },

  //
  // Logging
  //
  logging : {
    console : {
      level : 'info',
    },
  },
};
