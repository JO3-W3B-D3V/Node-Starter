const UserClientError = require('./UserClientError')

class UserService {
  constructor() {
    const UserRepository = require('./UserRepository')
    this.repository = new UserRepository()
  }

  getUserById(id) {
    if (id === null || id === undefined) {
      throw new UserClientError('The provided id cannot be null')
    } else if (id <= 0) {
      throw new UserClientError('The provided id must be greater than 0')
    } else if (isNaN(id)) {
      throw new UserClientError('The provided id is not a valid number')
    }

    return this.repository.getUserById(id)
  }

  getUsersByPage(page) {
    if (page === null || page === undefined) {
      throw new UserClientError('The provided page number cannot be null')
    } else if (page <= 0) {
      throw new UserClientError('The provided page number must be greater than 0')
    } else if (isNaN(page)) {
      throw new UserClientError('The provided page numer is not a valid number')
    }

    return this.repository.getUsersByPage(page)
  }

  getTotalNumberOfPages() {
    return this.repository.getTotalNumberOfPages()
  }

  createUser(user) {
    const MINIMUM_NAME_LENGTH = 2 // Po, Jo, etc.
    const MAXIMUM_NAME_LENGTH = 50 // Just a random number.

    // User object validation.
    if (user === null || user === undefined) {
      throw new UserClientError('The provided user object is null')
    } else if (typeof user !== 'object') {
      throw new UserClientError('The wrong data type was provided for the user object')
    }

    // Forename validation.
    if (user.forename === null || user.forename === undefined) {
      throw new UserClientError('The provided forename is null')
    } else if (typeof user.forename !== 'string') {
      console.log(user.forename, typeof user.forename)
      throw new UserClientError('The wrong data type was provided for the user forename')
    } else if (user.forename.replace(/ /g, '').length < MINIMUM_NAME_LENGTH) {
      throw new UserClientError('The provided forename is too short')
    } else if (user.forename.replace(/ /g, '').length > MAXIMUM_NAME_LENGTH) {
      throw new UserClientError('Thr provided user forename is too long')
    }

    // Surname validation.
    if (user.surname === null || user.surname === undefined) {
      throw new UserClientError('The provided surname is null')
    } else if (typeof user.surname !== 'string') {
      throw new UserClientError('The wrong data type was provided for the user surname')
    } else if (user.surname.replace(/ /g, '').length < MINIMUM_NAME_LENGTH) {
      throw new UserClientError('The provided surname is too short')
    } else if (user.surname.replace(/ /g, '').length > MAXIMUM_NAME_LENGTH) {
      throw new UserClientError('Thr provided user surname is too long')
    }

    return this.repository.insertUser(user)
  }
}

module.exports = UserService
