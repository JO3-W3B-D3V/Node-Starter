class Application {
  static init() {
    const express = require('express')
    const app = express()
    const router = express.Router()

    Application.applyEnvironmentVars()
    Application.applySecurityConfig(app)
    Application.applyOtherConfig(app, express)
    Application.setupLogger(app)
    Application.setupCookieParsing(app)
    Application.applyRouting(app, router)
    Application.errorHandling(app)

    return app
  }

  static applyEnvironmentVars() {
    const path = require('path').join(__dirname, '..', '.env')
    require('dotenv').config({ path })
  }

  static applyOtherConfig(app, express) {
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
  }

  static setupLogger(app) {
    const logger = require('morgan')
    app.use(logger('dev'))
  }

  static setupCookieParsing(app) {
    const cookieParser = require('cookie-parser')
    app.use(cookieParser())
  }

  static applyRouting(app, router) {
    const UserRouter = require('./user/UserRouter')
    app.use('/users', new UserRouter().applyRouting(router))
  }

  static errorHandling(app) {
    app.use((req, res, next) => {
      const createError = require('http-errors')
      next(createError(404))
    })

    // eslint-disable-next-line  no-unused-vars
    app.use((err, req, res, next) => {
      res.locals.message = err.message
      console.error(err)
      res.status(Application.getErrorStatusCode(err))
      res.setHeader('Content-Type', 'text/plain')

      if (res.status !== 500) {
        res.end(err.message)
      } else {
        res.end('Internal Server Error')
      }
    })
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
  }

  static getErrorStatusCode(err) {
    const code = 500
    const isNull = require('./libs/isNull')
    const isErrorStatusValid = () => !isNull(err) && !isNull(err.status)

    return isErrorStatusValid() ? err.status : code
  }
}

module.exports = Application
