const log = require('./libs/Logger')
const isNull = require('./libs/isNull')

class Application {
  static init() {
    const express = require('express')
    const app = express()
    const router = express.Router()

    Application.applySecurityConfig(app)
    Application.applyGeneralConfig(app, express)
    Application.applyRouting(app, router)
    Application.errorHandling(app)
    log.debug('Application - The application has been configured & is now running')

    return app
  }

  static applyGeneralConfig(app, express) {
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))

    const compression = require('compression')
    app.use(compression())
    log.debug('Application - The general configuration has been applied successfully')
  }

  static applyRouting(app, router) {
    const UserRouter = require('./user/UserRouter')
    app.use('/users', new UserRouter().applyRouting(router))
    log.debug('Application - All resources have been applied successfully')
  }

  static errorHandling(app) {
    app.use((req, res, next) => {
      const createError = require('http-errors')
      next(createError(404))
    })

    // eslint-disable-next-line  no-unused-vars
    app.use((err, req, res, next) => {
      res.locals.message = err.message
      const status = Application.getErrorStatusCode(err)
      log.error(err)
      res.status(status)
      res.setHeader('Content-Type', 'text/plain')

      if (process.env['DEBUG'] === 'true') {
        res.end(err.message)
      } else {
        if (status === 500) {
          res.end('Internal Server Error')
        } else {
          res.end(err.message)
        }
      }
    })

    log.debug('Application - Error handling has been applied successfully')
  }

  static applySecurityConfig(app) {
    const cors = require('cors')
    const corsConfig = {
      origin: ['http://localhost:3000'],
      methods: ['GET', 'POST', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }

    app.use(cors(corsConfig))
    app.disable('x-powered-by')
    app.disable('server')

    const helmet = require('helmet')
    app.use(helmet())

    const RateLimit = require('express-rate-limit')
    const limiter = new RateLimit({
      windowMs: 5 * 60 * 1000, // 5 Minutes
      max: 1000, // 1000 Maximum requests within the 5 minutes, based on the IP
      delayMs: 0, // Disable a delay
    })

    app.use(limiter)
    log.debug('Application - The rate limiter & security configuration has been applied successfully')
  }

  static getErrorStatusCode(err) {
    const code = 500
    const isErrorStatusValid = () => !isNull(err) && !isNull(err.status)

    return isErrorStatusValid() ? err.status : code
  }
}

module.exports = Application
