const isNull = require('./libs/isNull')
const ApplicationError = require('./ApplicationError')

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
  isJsonRequest(contentType) {
    const expected = 'application/json'
    const startOfMessage = 'Unsupported media type,'
    let isJson = true
    let msg = null

    if (isNull(contentType)) {
      msg = `${startOfMessage} no content type header was provided, expected ${expected}`
      isJson = false
    } else if (contentType !== 'application/json') {
      msg = `${startOfMessage} the provided content type header was ${contentType}, expected ${expected}`
      isJson = false
    }

    return { isJson, msg }
  }

  getExceptionStatus(exception) {
    if (!isNull(exception) && !isNull(exception.status)) {
      return exception.status
    } else {
      return 500
    }
  }

  getExceptionMessage(exception) {
    if (!isNull(exception) && exception instanceof ApplicationError) {
      return exception.message
    } else {
      return 'Internal server error'
    }
  }
}

module.exports = AbstractController
