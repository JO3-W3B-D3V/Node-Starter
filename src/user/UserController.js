const UserClientError = require('./UserClientError')

class UserController {
  constructor() {
    const UserService = require('./UserService')
    this.service = new UserService()
  }

  async getUsers(request, response, next) {
    let header = 'application/json'
    let status = 200
    let data = null

    try {
      const isNoPagePresent = () => {
        return request.query.page === null || request.query.page === undefined
      }

      const page = isNoPagePresent() ? 1 : request.query.page
      let numberOfPages = 0

      if (page > 0 && !isNaN(page)) {
        numberOfPages = await this.service.getTotalNumberOfPages()
      }

      if (page > numberOfPages) {
        header = 'text/plain'
        data = `No users found on the page ${page}`
        status = 404
      } else {
        data = {
          results: await this.service.getUsersByPage(page),
          pages: numberOfPages,
        }
      }
    } catch (exception) {
      const expected = exception instanceof UserClientError

      return this.handleError(exception, expected, next, response)
    }

    response.setHeader('Content-Type', header)
    response.status(status)
    response.send(data)
  }

  async getUser(request, response, next) {
    let header = 'application/json'
    let status = 200
    let data = null

    try {
      const id = request.params.id
      data = await this.service.getUserById(id)

      if (data === null || data === undefined) {
        header = 'text/plain'
        data = `No user found with the id of ${id}`
        status = 404
      }
    } catch (exception) {
      const expected = exception instanceof UserClientError

      return this.handleError(exception, expected, next, response)
    }

    response.setHeader('Content-Type', header)
    response.status(status)
    response.send(data)
  }

  async createUser(request, response, next) {
    let header = 'application/json'
    let status = 200
    let data = null
    let requestInvalid = false

    try {
      const requestBody = request.body
      const contentType = request.headers['content-type']

      if (contentType !== 'application/json') {
        data = 'Unsupported media type'
        status = 415
        header = 'text/plain'
        requestInvalid = true
        throw new Error(data)
      }

      await this.service.createUser(requestBody)
      status = 201
      header = 'text/plain'
    } catch (exception) {
      if (requestInvalid) {
        return this.handleError(exception, requestInvalid, next, response, { header, status, data })
      } else {
        return this.handleError(exception, exception instanceof UserClientError, next, response)
      }
    }

    response.setHeader('Content-Type', header)
    response.status(status)
    response.send(data)
  }

  async updateUser(request, response) {
    response.setHeader('Content-Type', 'text/plain')
    response.status(501)
    response.send('Not implemented')
  }

  async deleteUser(request, response) {
    response.setHeader('Content-Type', 'text/plain')
    response.status(501)
    response.send('Not implemented')
  }

  handleError(exception, expected, next, response, params = { status: 400, header: 'text/plain', data: 'Invalid parameters provided' }) {
    console.error(exception)

    if (!expected) {
      next(exception)
    } else {
      response.setHeader('Content-Type', params.header)
      response.status(params.status)
      response.send(params.data)
    }
  }
}

module.exports = UserController
