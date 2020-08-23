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
    let data = null

    try {
      let page = 1
      let numberOfPages = 0

      if (!isNull(request.query.page)) {
        page = request.query.page
      }

      if (page > 0 && !isNaN(page)) {
        numberOfPages = await this.service.getTotalNumberOfPages()
      }

      if (page > numberOfPages) {
        this.notFound(page, `No users found on the page ${page}`)
      } else {
        data = {
          results: await this.service.getUsersByPage(page),
          pages: numberOfPages,
        }
      }
    } catch (exception) {
      return next(createError(exception.status))
    }

    response.setHeader('Content-Type', 'application/json')
    response.status(200)
    response.send(data)
  }

  async create(request, response, next) {
    try {
      const requestBody = request.body
      const contentType = request.headers['content-type']

      this.verifyJsonRequest(contentType)
      await this.service.createUser(requestBody)
    } catch (exception) {
      return next(createError(exception.status))
    }

    response.setHeader('Content-Type', 'text/plain')
    response.status(201)
    response.send()
  }

  async read(request, response, next) {
    let data = null

    try {
      const id = request.params.id
      data = await this.service.getUserById(id)

      if (isNull(data)) {
        this.notFound(id)
      }
    } catch (exception) {
      return next(createError(exception.status))
    }

    response.setHeader('Content-Type', 'application/json')
    response.status(200)
    response.send(data)
  }

  async update(request, response, next) {
    let data = null

    try {
      const contentType = request.headers['content-type']
      const getId = () => {
        if (!isNull(request.params.id)) {
          return request.params.id
        } else if (!isNull(request.body.id)) {
          return request.body.id
        } else {
          return -1
        }
      }

      const id = getId()
      this.verifyJsonRequest(contentType)
      const user = await this.service.getUserById(id)

      if (!isNull(user)) {
        request.body.id = id // Just in the event it was /users/:id
        await this.service.updateUser(request.body)
        data = { forename: request.body.forename, surname: request.body.surname }
      } else {
        this.notFound(id)
      }
    } catch (exception) {
      return next(createError(exception.status))
    }

    response.setHeader('Content-Type', 'application/json')
    response.status(200)
    response.send(data)
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
