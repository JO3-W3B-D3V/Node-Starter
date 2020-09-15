const AbstractController = require('../../src/AbstractController')

describe('Application unit tests', () => {
  const controller = new AbstractController()
  let expectedMessage
  let isJsonObject

  beforeEach(() => {
    expectedMessage = 'Unsupported media type, '
  })

  test('It should throw error for no page implementation', () => {
    expect(() => controller.page()).toThrow(Error)
  })

  test('It should throw error for no create implementation', () => {
    expect(() => controller.create()).toThrow(Error)
  })

  test('It should throw error for no read implementation', () => {
    expect(() => controller.read()).toThrow(Error)
  })

  test('It should throw error for no update implementation', () => {
    expect(() => controller.update()).toThrow(Error)
  })

  test('It should throw error for no delete implementation', () => {
    expect(() => controller.delete()).toThrow(Error)
  })

  test('It should throw error for no delete implementation', () => {
    expect(() => controller.delete()).toThrow(Error)
  })

  test('It should state that no content type header was provided', () => {
    isJsonObject = controller.isJsonRequest(null)
    expectedMessage += 'no content type header was provided, expected application/json'

    expect(isJsonObject.isJson).toBe(false)
    expect(isJsonObject.msg).toBe(expectedMessage)
  })

  test('It should state that an invalid content type header was provided', () => {
    isJsonObject = controller.isJsonRequest('text/plain')
    expectedMessage += 'the provided content type header was text/plain, expected application/json'

    expect(isJsonObject.isJson).toBe(false)
    expect(isJsonObject.msg).toBe(expectedMessage)
  })

  test('It should return a valid status when handling null', () => {
    expect(controller.getExceptionMessage(null)).toBe('Internal server error')
    expect(controller.getExceptionStatus(null)).toBe(500)
  })

  test('It should return a valid status when handling a random error', () => {
    const exception = new Error('test')
    expect(controller.getExceptionMessage(exception)).toBe('Internal server error')
    expect(controller.getExceptionStatus(exception)).toBe(500)
  })

  test('It should return a valid status when handling an application error', () => {
    const UserClientError = require('../../src/user/UserClientError')
    const userError = new UserClientError()
    expect(controller.getExceptionMessage(userError)).toBe('Invalid parameters provided')
    expect(controller.getExceptionStatus(userError)).toBe(400)
  })
})
