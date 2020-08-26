const isNull = require('../libs/isNull')
const AbstractController = require('../AbstractController')
const createError = require('http-errors')

class UserController extends AbstractController {
  constructor() {
    super()
    const UserService = require('./UserService')
    this.service = new UserService()
  }

  async page(request, response, next) {
    try {
      const pageNumber = !isNull(request.query.page) ? request.query.page : 1
      const pages = pageNumber > 0 && !isNaN(pageNumber) ? await this.service.getTotalNumberOfPages() : 0

      if (pageNumber > pages) {
        this.notFound(pageNumber, `No users found on the page ${pageNumber}`)
      }

      const results = await this.service.getUsersByPage(pageNumber)
      response.setHeader('Content-Type', 'application/json').status(200).send({ results, pages })
    } catch (exception) {
      next(createError(exception.status, exception.message))
    }
  }

  async create(request, response, next) {
    try {
      this.verifyJsonRequest(request.headers['content-type'])
      await this.service.createUser(request.body)
      response.setHeader('Content-Type', 'text/plain').status(201).send()
    } catch (exception) {
      next(createError(exception.status, exception.message))
    }
  }

  async read(request, response, next) {
    try {
      const id = request.params.id
      const user = await this.service.getUserById(id)

      if (isNull(user)) {
        this.notFound(id)
      }

      response.setHeader('Content-Type', 'application/json').status(200).send(user)
    } catch (exception) {
      next(createError(exception.status, exception.message))
    }
  }

  async update(request, response, next) {
    try {
      const getId = (r) => (!isNull(r.params.id) ? r.params.id : !isNull(r.body.id) ? r.body.id : -1)
      const id = getId(request)
      this.verifyJsonRequest(request.headers['content-type'])

      if (isNull(await this.service.getUserById(id))) {
        this.notFound(id)
      }

      request.body.id = id // Just in the event it was /users/:id
      await this.service.updateUser(request.body)
      response
        .setHeader('Content-Type', 'application/json')
        .status(200)
        .send({ forename: request.body.forename, surname: request.body.surname })
    } catch (exception) {
      next(createError(exception.status, exception.message))
    }
  }

  async delete(request, response, next) {
    try {
      const id = request.params.id
      const user = await this.service.getUserById(id)

      if (isNull(user)) {
        this.notFound(id)
      }

      await this.service.deleteUserById(id)
      response.setHeader('Content-Type', 'text/plain').status(204).send()
    } catch (exception) {
      next(createError(exception.status, exception.message))
    }
  }
}

module.exports = UserController
