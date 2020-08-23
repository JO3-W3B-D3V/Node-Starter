class Application {
  static init() {
    const express = require('express')
    const app = express()
    const router = express.Router()

    Application.applyEnvironmentVars()
    Application.applyHeaders(app)
    Application.applyOtherConfig(app, express)
    Application.setupLogger(app)
    Application.setupCookieParsing(app)
    Application.applyRouting(app, router)
    Application.errorHandling(app)

    return app
  }

  static applyEnvironmentVars() {
    require('dotenv').config({ path: `${__dirname}/.env` })
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
      res.end(err.message)
    })
  }

  static applyHeaders(app) {
    const cors = require('cors')
    const corsConfig = {
      origin: ['http://localhost:3000'],
      methods: ['GET', 'POST', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }

    app.use(cors(corsConfig))
    app.disable('x-powered-by')
    app.disable('server')
  }

  static getErrorStatusCode(err) {
    const code = 500

    const isErrorStatusValid = () => {
      return err !== null && err !== undefined && err.status !== null && err.status !== undefined
    }

    return isErrorStatusValid() ? err.status : code
  }
}

module.exports = Application
