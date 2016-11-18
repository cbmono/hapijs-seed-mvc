import _ from 'lodash';
import fs from 'fs';
import config from 'config';
import Hapi from 'hapi';
import path from 'path';
import log from '../libs/logger';


//
// Global dependencies
// (available across the whole App)
//
global._ = _;        // lodash
global.log = log;    // Used instead of console()

//
// Create server
//
const server = new Hapi.Server();
server.connection(config.get('server'));

//
// Load & Register Hapi Plugins
//
const pluginsPath = path.join(__dirname, '../libs/plugins');

fs.readdirSync(pluginsPath).forEach((pluginFile) => {
  // Only require JS files
  if (/.*\.js$/.test(pluginFile)) {
    const plugin = require('../libs/plugins/' + pluginFile).default();

    plugin.register(server);
  }
});

//
// Load Hapi routes
//
const routesPath = path.join(__dirname, 'routes');

fs.readdirSync(routesPath).forEach((file) => {
  // Ignore base.routes and .spec files
  if (file !== 'base.routes.js' && file.indexOf('.spec.') === -1) {
    const routes = require('./routes/' + file).default;

    routes.forEach(route => server.route(route));
  }
});

//
// Start the server
//
server.start((err) => {
  if (err) throw err;

  log.info({
    'Server running at': server.info.uri,
    'NODE_ENV': process.env.NODE_ENV
  });
});
