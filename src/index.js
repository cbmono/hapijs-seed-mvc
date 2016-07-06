import _ from 'lodash';
import fs from 'fs';
import config from 'config';
import Hapi from 'hapi';
import path from 'path';
import { default as pluginsConfig } from '../config/hapijs.plugins';
import { default as log } from './logger';


//
// Global dependencies
// (available across the whole App)
//
GLOBAL._ = _;        // lodash
GLOBAL.log = log;    // Used instead of console()

//
// Create server
//
const server = new Hapi.Server();
server.connection(config.get('server'));


/**
 * registerRoute - Register Routes to the server
 *
 * @param { Object } file
 *
 */
const registerRoute = file => {
  const routes = require(`./routes/${file}`).default;
  routes.forEach(route => server.route(route));
};

//
// Register Hapi plugin's
//
server.register(pluginsConfig,

  err => {
    if (err) throw err;

    // Load routes from ./routes
    const routesNormalizedPath = path.join(__dirname, 'routes');

    fs.readdirSync(routesNormalizedPath)
      .filter(file => !file.includes('.spec') && file !== 'base.routes.js')
      .forEach(registerRoute);

    //
    // Start the server
    //
    server.start(error => {
      if (error) throw error;

      log.info({
        'Server running at' : server.info.uri,
        'NODE_ENV'          : process.env.NODE_ENV,
      });
    });
  }
);
