'use strict'

//
// External dependencies
//
const fs = require('fs')
const path = require('path')
const Hapi = require('hapi')

//
// Load config settings
//
const config = require('config')
const serverConfig = config.get('server')

//
// Internal dependencies
//
const log = require('./logger')
const pluginsConfig = require('../config/plugins')

//
// Setup the server
//
const server = new Hapi.Server()
server.connection(serverConfig)

//
// Register hapi plugins
//
for (let plugin in pluginsConfig) {
  server.register(
    {
      register: require(plugin),
      options: pluginsConfig[plugin]
    },
    (err) => { if (err) throw err }
  )
}

//
// Require all routes found in the ./routes folder
//
let routesNormalizedPath = path.join(__dirname, 'routes')

fs.readdirSync(routesNormalizedPath).forEach((file) => {
  if (file !== 'base.routes.js') {
    server.route(require('./routes/' + file))
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
