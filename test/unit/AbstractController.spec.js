const AbstractController = require('../../src/AbstractController')
const UserClientError = require('../../src/user/UserClientError')

describe('Application tests', () => {
  test('It should throw error for no implementation', () => {
    const controller = new AbstractController()

    expect(() => controller.page()).toThrow(Error)
    expect(() => controller.create()).toThrow(Error)
    expect(() => controller.read()).toThrow(Error)
    expect(() => controller.update()).toThrow(Error)
    expect(() => controller.delete()).toThrow(Error)
    expect(() => controller.verifyJsonRequest(null)).toThrow(UserClientError)
  })
})
