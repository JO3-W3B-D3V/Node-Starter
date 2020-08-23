const UserClientError = require('./UserClientError')
const AbstractController = require('../AbstractController')
const isNull = require('../libs/isNull')
const createError = require('http-errors')

class UserController extends AbstractController {
  constructor() {
    super()
    const UserService = require('./UserService')
    this.service = new UserService()
  }

  async page(request, response, next) {
    try {
      let page = 1
      let numberOfPages = 0
      let users = null

      if (!isNull(request.query.page)) {
        page = request.query.page
      }

      if (page > 0 && !isNaN(page)) {
        numberOfPages = await this.service.getTotalNumberOfPages()
      }

      if (page > numberOfPages) {
        this.notFound(page, `No users found on the page ${page}`)
      } else {
        users = {
          results: await this.service.getUsersByPage(page),
          pages: numberOfPages,
        }
      }

      response.setHeader('Content-Type', 'application/json')
      response.status(200)
      response.send(users)
    } catch (exception) {
      return next(createError(exception.status))
    }
  }

  async create(request, response, next) {
    try {
      const requestBody = request.body
      const contentType = request.headers['content-type']
      this.verifyJsonRequest(contentType)
      await this.service.createUser(requestBody)

      response.setHeader('Content-Type', 'text/plain')
      response.status(201)
      response.send()
    } catch (exception) {
      return next(createError(exception.status))
    }
  }

  async read(request, response, next) {
    try {
      const id = request.params.id
      const user = await this.service.getUserById(id)

      if (isNull(user)) {
        this.notFound(id)
      }

      response.setHeader('Content-Type', 'application/json')
      response.status(200)
      response.send(user)
    } catch (exception) {
      return next(createError(exception.status))
    }
  }

  async update(request, response, next) {
    try {
      const contentType = request.headers['content-type']
      const getId = (r) => (!isNull(r.params.id) ? r.params.id : !isNull(r.body.id) ? r.body.id : -1)
      const id = getId(request)
      this.verifyJsonRequest(contentType)

      if (!isNull(await this.service.getUserById(id))) {
        request.body.id = id // Just in the event it was /users/:id
        await this.service.updateUser(request.body)
        response.setHeader('Content-Type', 'application/json')
        response.status(200)
        response.send({ forename: request.body.forename, surname: request.body.surname })
      } else {
        this.notFound(id)
      }
    } catch (exception) {
      return next(createError(exception.status))
    }
  }

  async delete(request, response, next) {
    try {
      const id = request.params.id
      const user = await this.service.getUserById(id)

      if (isNull(user)) {
        this.notFound(id)
      } else {
        await this.service.deleteUserById(id)
      }
    } catch (exception) {
      return next(createError(exception.status))
    }

    response.setHeader('Content-Type', 'text/plain')
    response.status(204)
    response.send()
  }

  verifyJsonRequest(contentType) {
    if (contentType !== 'application/json') {
      throw new UserClientError('Unsupported media type', 415)
    }
  }

  notFound(id, msg) {
    if (!isNull(msg)) {
      throw new UserClientError(msg, 404)
    } else {
      throw new UserClientError(`No user found with the id of ${id}`, 404)
    }
  }
}

module.exports = UserController
