class UserClientError extends Error {
  constructor(msg) {
    const getPrintableMessage = () => {
      const isNull = require('../libs/isNull')

      if (isNull(msg)) {
        return 'Invalid parameters provided'
      } else {
        return msg
      }
    }

    super(getPrintableMessage())
  }
}

module.exports = UserClientError
