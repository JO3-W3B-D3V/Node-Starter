const UserClientError = require('./UserClientError')
const isNull = require('../libs/isNull')

class UserController {
  constructor() {
    const UserService = require('./UserService')
    this.service = new UserService()

    this.header = 'application/json'
    this.status = 200
    this.data = null
    this.requestInvalid = false
  }

  async getUsers(request, response, next) {
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
        this.header = 'text/plain'
        this.data = `No users found on the page ${page}`
        this.status = 404
      } else {
        this.data = {
          results: await this.service.getUsersByPage(page),
          pages: numberOfPages,
        }
      }
    } catch (exception) {
      const expected = exception instanceof UserClientError

      return this.handleError(exception, expected, next, response)
    }

    this.sendResponse(response)
  }

  async getUser(request, response, next) {
    try {
      const id = request.params.id
      this.data = await this.service.getUserById(id)

      if (isNull(this.data)) {
        this.header = 'text/plain'
        this.data = `No user found with the id of ${id}`
        this.status = 404
      }
    } catch (exception) {
      const expected = exception instanceof UserClientError

      return this.handleError(exception, expected, next, response)
    }

    this.sendResponse(response)
  }

  async createUser(request, response, next) {
    try {
      const requestBody = request.body
      const contentType = request.headers['content-type']

      this.verifyJsonRequest(contentType)
      await this.service.createUser(requestBody)
    } catch (exception) {
      if (this.requestInvalid) {
        const params = { header: this.header, status: this.status, data: this.data }

        return this.handleError(exception, this.requestInvalid, next, response, params)
      } else {
        return this.handleError(exception, exception instanceof UserClientError, next, response)
      }
    }

    this.status = 201
    this.header = 'text/plain'
    this.sendResponse(response)
  }

  async updateUser(request, response, next) {
    try {
      const contentType = request.headers['content-type']
      const id = !isNull(request.body.id) ? request.body.id : 0
      this.verifyJsonRequest(contentType)
      const user = await this.service.getUserById(id)

      if (!isNull(user)) {
        await this.service.updateUser(request.body)
        this.data = { forename: request.body.forename, surname: request.body.surname }
      } else {
        this.noUserFound(id)
      }
    } catch (exception) {
      if (this.requestInvalid) {
        const params = { header: this.header, status: this.status, data: this.data }

        return this.handleError(exception, this.requestInvalid, next, response, params)
      } else {
        return this.handleError(exception, exception instanceof UserClientError, next, response)
      }
    }

    this.sendResponse(response)
  }

  async deleteUser(request, response, next) {
    try {
      const id = request.params.id
      const user = await this.service.getUserById(id)

      if (isNull(user)) {
        this.noUserFound(id)
      } else {
        await this.service.deleteUserById(id)
        this.status = 204
        this.header = 'text/plain'
      }
    } catch (exception) {
      return this.handleError(exception, exception instanceof UserClientError, next, response)
    }

    this.sendResponse(response)
  }

  defaultErrorParams() {
    return { status: 400, header: 'text/plain', data: 'Invalid parameters provided' }
  }

  handleError(exception, expected, next, response, params = this.defaultErrorParams()) {
    console.error(exception)

    if (!expected) {
      next(exception)
    } else {
      response.setHeader('Content-Type', params.header)
      response.status(params.status)
      response.send(params.data)
    }
  }

  verifyJsonRequest(contentType) {
    if (contentType !== 'application/json') {
      this.data = 'Unsupported media type'
      this.status = 415
      this.header = 'text/plain'
      this.requestInvalid = true
      throw new Error(this.data)
    }
  }

  noUserFound(id) {
    this.header = 'text/plain'
    this.status = 404
    this.data = `No user found with the id of ${id}`
  }

  sendResponse(response) {
    response.setHeader('Content-Type', this.header)
    response.status(this.status)
    response.send(this.data)
  }
}

module.exports = UserController
