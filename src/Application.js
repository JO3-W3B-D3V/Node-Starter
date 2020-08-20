class Application {
  static init() {
    const express = require("express");
    const app = express();
    const router = express.Router();

    Application.applyEnvironmentVars();
    Application.applyOtherConfig(app, express);
    Application.setupLogger(app);
    Application.setupCookieParsing(app);
    Application.applyRouting(app, router);
    Application.errorHandling(app);
    Application.applyHeaders(app);

    return app;
  }

  static applyEnvironmentVars() {
    require("dotenv").config({ path: __dirname + "/.env" });
  }

  static applyOtherConfig(app, express) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
  }

  static setupLogger(app) {
    const logger = require("morgan");
    app.use(logger("dev"));
  }

  static setupCookieParsing(app) {
    const cookieParser = require("cookie-parser");
    app.use(cookieParser());
  }

  static applyRouting(app, router) {
    const UserRouter = require("./user/UserRouter");
    app.use("/users", new UserRouter().applyRouting(router));
  }

  static errorHandling(app) {
    const createError = require("http-errors");
    app.use((req, res, next) => next(createError(404)));

    app.use((err, req, res, next) => {
      res.locals.message = err.message;
      console.log(err);
      res.status(Application.getErrorStatusCode(err));
      res.setHeader("Content-Type", "text/plain");
      res.end("Internal server error");
    });
  }

  static applyHeaders(app) {
    const cors = require("cors");
    const corsConfig = {
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    };

    app.use(cors(corsConfig));
    app.disable("X-Powered-By");
    app.disable("Server");
  }

  static getErrorStatusCode(err) {
    let code = 500;

    if (err != null && err.status != null) {
      code = err.status;
    }

    return code;
  }
}

module.exports = Application;
