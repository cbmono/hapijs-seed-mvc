//
// External dependencies
//
const Purdy = require('purdy')
let winston = require('winston')

//
// Internal dependencies
//
const loggingConfig = require('config').logging

// Prepare transports
let transports = []

if (loggingConfig.console) {
  transports.push(new winston.transports.Console(loggingConfig.console))
}

// Setup winston
winston = new winston.Logger({
  transports: transports,
  rewriters: [ ((level, msg, meta) => Purdy(meta)) ]
})

// Export
module.exports = winston
