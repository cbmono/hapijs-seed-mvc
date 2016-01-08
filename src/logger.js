let winston = require('winston')
let loggingConfig = require('config').logging

// Prepare transports
let transports = []

if (loggingConfig.console) {
  transports.push(new winston.transports.Console(loggingConfig.console))
}

// Setup winston
winston = new winston.Logger({
  transports: transports
})

// Export
module.exports = winston
