const UserRepository = require('../../../src/user/UserRepository')
jest.mock('../../../src/DatabaseConnection')

describe('UserRepository unit tests', () => {
  let repo
  let user

  beforeEach(() => {
    user = { forename: 'Joe', surname: 'Bloggs' }
    repo = new UserRepository()
    const mockDatabase = {
      getConnection: function () {
        return this
      },
      connection: function () {
        return this
      },
      where: function () {
        return this
      },
      select: function () {
        return this
      },
      count: function () {
        return this
      },
      first: function () {
        return this
      },
      update: function () {
        return this
      },
      delete: function () {
        return this
      },
      offset: function () {
        return this
      },
      limit: function () {
        return this
      },
      insert: function () {
        return this
      },
    }

    repo.connection = () => mockDatabase.getConnection()
  })

  test('It should get user by id with no issues', () => {
    expect(() => repo.getUserById(1)).not.toThrowError()
  })

  test('It should insert a new user with no issues', () => {
    expect(() => repo.insertUser(user)).not.toThrowError()
  })

  test('It should get a page of users with no issues', () => {
    expect(() => repo.getUsersByPage(1)).not.toThrowError()
  })

  test('It should get the total number of pages with no issues', () => {
    expect(() => repo.getTotalNumberOfPages()).not.toThrowError()
  })

  test('It should update an existing users with no issues', () => {
    user.id = 1
    expect(() => repo.updateUser(user)).not.toThrowError()
  })

  test('It should delete an existing users with no issues', () => {
    expect(() => repo.deleteUserById(1)).not.toThrowError()
  })
})
