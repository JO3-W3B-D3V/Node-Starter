const UserClientError = require('./user/UserClientError')
const isNull = require('./libs/isNull')

class AbstractController {
  // Read - Pagination
  page() {
    throw new Error('Not yet implemented')
  }

  // Create
  create() {
    throw new Error('Not yet implemented')
  }

  // Read
  read() {
    throw new Error('Not yet implemented')
  }

  // Update
  update() {
    throw new Error('Not yet implemented')
  }

  // Delete
  delete() {
    throw new Error('Not yet implemented')
  }

  // General Purpose methods
  verifyJsonRequest(contentType) {
    const expected = 'application/json'
    const startOfMessage = 'Unsupported media type,'
    let msg = null

    if (isNull(contentType)) {
      msg = `${startOfMessage} no content type header was provided, expected ${expected}`
    } else if (contentType !== 'application/json') {
      msg = `${startOfMessage} the provided content type header was ${contentType}, expected ${expected}`
    }

    if (!isNull(msg)) {
      throw new UserClientError(msg, 415)
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

module.exports = AbstractController
