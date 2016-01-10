let winston = require('winston')
let Purdy = require('purdy')
let loggingConfig = require('config').logging

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
