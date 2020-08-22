const UserClientError = require('../../../src/user/UserClientError')

describe('UserClientError tests', () => {
  test('It should have the message "Invalid parameters provided"', () => {
    let error = new UserClientError(null)
    expect(error.message).toBe('Invalid parameters provided')

    error = new UserClientError(undefined)
    expect(error.message).toBe('Invalid parameters provided')

    error = new UserClientError()
    expect(error.message).toBe('Invalid parameters provided')
  })

  test('It should have the message "Test message"', () => {
    const error = new UserClientError('Test message')
    expect(error.message).toBe('Test message')
  })
})
