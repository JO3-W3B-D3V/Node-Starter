const isNull = require('./isNull')

class Logger {
  constructor(envVar) {
    const bunyan = require('bunyan')
    const loggers = {
      test: () => bunyan.createLogger({ name: 'test', level: 'fatal' }),
      development: () => bunyan.createLogger({ name: 'development', level: 'debug' }),
      production: () => bunyan.createLogger({ name: 'production', level: 'info' }),
    }

    let env = envVar || 'test'
    let logger = loggers.test

    if (!isNull(process.env['ENV'])) {
      env = process.env['ENV']
    }

    if (!isNull(loggers[env])) {
      logger = loggers[env]
    }

    this.printer = logger()
  }
}

// Node modules style singleton.
module.exports.log = new Logger().printer
module.exports.Logger = Logger
