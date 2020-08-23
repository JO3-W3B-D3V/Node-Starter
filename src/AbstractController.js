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
    if (contentType !== 'application/json') {
      throw new UserClientError(`Unsupported media type, the content type header was ${contentType}`, 415)
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
