const ApplicationError = require('../ApplicationError')

class UserClientError extends ApplicationError {
  constructor(msg, status) {
    const isNull = require('../libs/isNull')

    const getPrintableMessage = () => {
      if (isNull(msg)) {
        return 'Invalid parameters provided'
      } else {
        return msg
      }
    }

    super(getPrintableMessage())

    if (isNull(status)) {
      this.status = 400
    } else {
      this.status = status
    }
  }
}

module.exports = UserClientError
