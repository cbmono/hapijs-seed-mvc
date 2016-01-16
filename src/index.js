'use strict'

import config  from 'config'
import fs  from 'fs'
import Hapi  from 'hapi'
import _  from 'lodash'
import path  from 'path'
import { default as pluginsConfig } from '../config/plugins'
import { default as log } from './logger'


// Global dependencies (available across the whole App)
GLOBAL._ = _
GLOBAL.log = log

// Setup the server
const server = new Hapi.Server()
server.connection(config.get('server'))

// Register hapi plugins
for (let plugin in pluginsConfig) {
  server.register(
    {
      register: require(plugin),
      options: pluginsConfig[plugin]
    },
    (err) => { if (err) throw err }
  )
}

// Require all routes found in the ./routes folder
let routesNormalizedPath = path.join(__dirname, 'routes')

fs.readdirSync(routesNormalizedPath).forEach((file) => {
  if (file !== 'base.routes.js' && file.indexOf('.spec.') === -1) {
    let route = require('./routes/' + file)
    server.route(route.default)
  }
})


///////////////////////////////////////
//
// Start the server
//
///////////////////////////////////////
server.start(() => {
  log.info({
    'Server running at': server.info.uri,
    'With NODE_ENV': process.env.NODE_ENV || 'local'
  })
})
