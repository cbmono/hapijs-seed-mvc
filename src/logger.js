import config  from 'config'
import Purdy  from 'purdy'
import winston  from 'winston'

// Config
const loggingConfig = config.logging
let transports = []

if (loggingConfig.console) {
  transports.push(new winston.transports.Console(loggingConfig.console))
}

// Export
export default new winston.Logger({
  transports: transports,
  rewriters: [ ((level, msg, meta) => Purdy(meta)) ]
})
