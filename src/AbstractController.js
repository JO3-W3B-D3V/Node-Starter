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
}

module.exports = AbstractController
