//
// This file is the default config file and
// contains common configuration data for all environments.
//
// You can overwrite specific settings by just creating
// the corresponding block in your environment config file, ie:
//
//   // config/dev.js
//
//   module.exports = {
//     //
//     // Database
//     //
//     database: {
//       connection: {
//         database: 'my-app-db'
//       }
//     }
//   }
//
module.exports = {
  //
  // Server
  //
  server : {
    port   : 3000,
    router : {
      stripTrailingSlash : true,
    },
    routes : {
      cors : true,
    },
  },

  //
  // API URL
  //
  apiUrl : 'http://localhost:3000',

  //
  // Node runtime settings
  //
  node : {
    debugPort : 5858,
  },

  //
  // Database
  //
  database : {
    connection : {
      database : 'my-database-name',    // @changeme
    },
  },

  //
  // Logging
  //
  logging : {
    console : {
      prettyPrint : true,
      colorize    : true,
      silent      : false,
      timestamp   : true,
    },
  },
};
