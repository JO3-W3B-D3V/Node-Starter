class Logger {
  constructor() {
    const bunyan = require('bunyan')
    const loggers = {
      test: () => bunyan.createLogger({ name: 'test', level: 'fatal' }),
      development: () => bunyan.createLogger({ name: 'development', level: 'debug' }),
      production: () => bunyan.createLogger({ name: 'production', level: 'info' }),
    }

    this.printer = loggers[process.env['ENV']]()
  }
}

// Node modules style singleton.
module.exports = new Logger().printer
