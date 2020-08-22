class UserClientError extends Error {
  constructor(msg) {
    const getPrintableMessage = () => {
      if (msg === null || msg === undefined) {
        return 'Invalid parameters provided'
      } else {
        return msg
      }
    }

    super(getPrintableMessage())
  }
}

module.exports = UserClientError
