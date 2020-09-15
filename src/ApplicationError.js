class ApplicationError extends Error {
  constructor(msg) {
    super(msg)
  }
}

module.exports = ApplicationError
