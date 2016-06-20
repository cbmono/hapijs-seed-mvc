'use strict'

import _  from 'lodash'
import fs  from 'fs'
import config  from 'config'
import Hapi  from 'hapi'
import path  from 'path'
import { default as pluginsConfig } from '../config/hapijs.plugins'
import { default as log } from './logger'


//
// Global dependencies 
// (available across the whole App)
//
GLOBAL._ = _        // lodash
GLOBAL.log = log    // Used instead of console()

//
// Create server
//
const server = new Hapi.Server()
server.connection(config.get('server'))

//
// Register Hapi plugin's
//
server.register(pluginsConfig,

  (err) => {
    if (err) throw err

    // Load routes from ./routes
    let routesNormalizedPath = path.join(__dirname, 'routes')

    fs.readdirSync(routesNormalizedPath).forEach((file) => {
      
      // Ignore base.routes and .spec files
      if (file !== 'base.routes.js' && file.indexOf('.spec.') === -1) {
        let routes = require('./routes/' + file).default

        routes.forEach((route) => server.route(route))
      }
    })
    
    //
    // Start the server
    //
    server.start((err) => {
      if (err) throw err

      log.info({
        'Server running at': server.info.uri,
        'NODE_ENV': process.env.NODE_ENV
      })
    })
  }
)
