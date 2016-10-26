import config from 'config';
import Purdy from 'purdy';
import winston from 'winston';

// Config
const loggingConfig = config.logging;
const transports = [];

if (loggingConfig.console) {
  transports.push(new winston.transports.Console(loggingConfig.console));
}

// Export
export default new winston.Logger({
  transports,
  rewriters : [((level, msg, meta) => Purdy(meta))],
});
