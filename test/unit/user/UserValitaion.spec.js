const UserValidation = require('../../../src/user/UserValidation')
const UserClientError = require('../../../src/user/UserClientError')

describe('UserValidation tests', () => {
  let validator
  let number
  let user

  beforeEach(() => {
    validator = new UserValidation()
    number = 1
    user = {
      forename: 'Joe',
      surname: 'Bloggs',
    }
  })

  test('It should throw an error for passing a null', () => {
    user = null
    expect(() => validator.validateUserObject(user)).toThrow(UserClientError)
  })

  test('It should throw an error for passing an invalid data type', () => {
    user = 10
    expect(() => validator.validateUserObject(user)).toThrow(UserClientError)
  })

  test('It should throw an error on null forename', () => {
    user.forename = null
    expect(() => validator.validateUserObject(user)).toThrow(UserClientError)
  })

  test('It should throw an error on an invalid data type on the forename', () => {
    user.forename = 10
    expect(() => validator.validateUserObject(user)).toThrow(UserClientError)
  })

  test('It should throw an error on a short forename', () => {
    user.forename = 'J'
    expect(() => validator.validateUserObject(user)).toThrow(UserClientError)
  })

  test('It should throw an error on a long forename', () => {
    user.forename = 'Joeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
    expect(() => validator.validateUserObject(user)).toThrow(UserClientError)
  })

  test('It should throw an error on null surname', () => {
    user.surname = null
    expect(() => validator.validateUserObject(user)).toThrow(UserClientError)
  })

  test('It should throw an error on a short surname', () => {
    user.surname = 'B'
    expect(() => validator.validateUserObject(user)).toThrow(UserClientError)
  })

  test('It should throw an error on a long surname', () => {
    user.surname = 'Blogssssssssssssssssssssssssssssssssssssssssssssssssssssssss'
    expect(() => validator.validateUserObject(user)).toThrow(UserClientError)
  })

  test('It should throw an error on an invalid data type on the surname', () => {
    user.surname = 10
    expect(() => validator.validateUserObject(user)).toThrow(UserClientError)
  })

  test('It should throw an error on the forename failing the partial regex', () => {
    user.forename = '?"!£$%^&@@@#'
    expect(() => validator.validateUserObject(user)).toThrow(UserClientError)
  })

  test('It should throw an error on the surname failing the partial regex', () => {
    user.surname = '?"!£$%^&@@@#'
    expect(() => validator.validateUserObject(user)).toThrow(UserClientError)
  })

  test('It should throw an error on the full name failing the full name regex', () => {
    user.surname = "O''''Conor"
    expect(() => validator.validateUserObject(user)).toThrow(UserClientError)
  })

  test('It should throw an error for null id', () => {
    number = null
    expect(() => validator.idValidation(number)).toThrow(UserClientError)
  })

  test('It should throw an error for the id being less than or equal to 0', () => {
    number = -1
    expect(() => validator.idValidation(number)).toThrow(UserClientError)
  })

  test('It should throw an error for the id being non-numeric', () => {
    number = 'tests'
    expect(() => validator.idValidation(number)).toThrow(UserClientError)
  })

  test('It should throw an error for null page', () => {
    number = null
    expect(() => validator.pageValidation(number)).toThrow(UserClientError)
  })

  test('It should throw an error for the page being less than or equal to 0', () => {
    number = -1
    expect(() => validator.pageValidation(number)).toThrow(UserClientError)
  })

  test('It should throw an error for the page being non-numeric', () => {
    number = 'test'
    expect(() => validator.pageValidation(number)).toThrow(UserClientError)
  })
})
