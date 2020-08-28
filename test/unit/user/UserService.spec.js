const UserService = require('../../../src/user/UserService')
const UserValidation = require('../../../src/user/UserValidation')
const UserRepository = require('../../../src/user/UserRepository')
jest.mock('../../../src/user/UserValidation')
jest.mock('../../../src/user/UserRepository')

describe('UserService unit tests', () => {
  let service
  let mockValidation
  let mockRepository
  let user

  beforeEach(() => {
    service = new UserService()
    mockValidation = new UserValidation()
    mockRepository = new UserRepository()
    user = { forename: 'Joe', surname: 'Bloggs' }
  })

  test('It should get user by id with no issues', () => {
    mockValidation.idValidation.mockImplementation = (f) => f
    mockRepository.getUserById.mockResolvedValue({ ...user })
    expect(() => service.getUserById(1)).not.toThrowError()
  })

  test('It should get user by page with no issues', () => {
    mockValidation.pageValidation.mockImplementation = (f) => f
    mockRepository.getUsersByPage.mockResolvedValue([{ ...user }])
    expect(() => service.getUsersByPage(1)).not.toThrowError()
  })

  test('It should get the total number of pages with no issues', () => {
    mockRepository.getTotalNumberOfPages.mockResolvedValue(20)
    expect(() => service.getTotalNumberOfPages()).not.toThrowError()
  })

  test('It should create a new users with no issues', () => {
    mockValidation.validateUserObject.mockImplementation = (f) => f
    mockRepository.insertUser.mockResolvedValue(null)
    expect(() => service.createUser(user)).not.toThrowError()
  })

  test('It should update an existing users with no issues', () => {
    mockValidation.validateUserObject.mockImplementation = (f) => f
    mockValidation.idValidation.mockImplementation = (f) => f
    mockRepository.updateUser.mockResolvedValue(null)
    user.id = 1
    expect(() => service.updateUser(user)).not.toThrowError()
  })

  test('It should delete an existing users with no issues', () => {
    const id = 1
    mockValidation.idValidation.mockImplementation = (f) => f
    mockRepository.updateUser.mockResolvedValue(null)
    expect(() => service.deleteUserById(id)).not.toThrowError()
  })
})
