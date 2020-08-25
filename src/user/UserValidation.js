const UserClientError = require('./UserClientError')
const isNull = require('../libs/isNull')

class UserValidation {
  validateUserObject(user) {
    const MINIMUM_NAME_LENGTH = 2 // Po, Jo, etc.
    const MAXIMUM_NAME_LENGTH = 50 // Just a random number.
    const FULL_NAME_REGEX = /^(([A-Za-z]+[-']?)*([A-Za-z]+)?\s)+([A-Za-z]+[-']?)*([A-Za-z]+)?$/
    const PART_NAME_REGEX = /^[a-zA-Z'-]{2,50}$$/

    // User object validation.
    if (isNull(user)) {
      throw new UserClientError('The provided user object is null')
    } else if (typeof user !== 'object') {
      throw new UserClientError('The wrong data type was provided for the user object')
    }

    // Forename validation.
    if (isNull(user.forename)) {
      throw new UserClientError('The provided forename is null')
    } else if (typeof user.forename !== 'string') {
      console.log(user.forename, typeof user.forename)
      throw new UserClientError('The wrong data type was provided for the user forename')
    } else if (user.forename.replace(/ /g, '').length < MINIMUM_NAME_LENGTH) {
      throw new UserClientError('The provided forename is too short')
    } else if (user.forename.replace(/ /g, '').length > MAXIMUM_NAME_LENGTH) {
      throw new UserClientError('The provided user forename is too long')
    }

    // Surname validation.
    if (isNull(user.surname)) {
      throw new UserClientError('The provided surname is null')
    } else if (typeof user.surname !== 'string') {
      throw new UserClientError('The wrong data type was provided for the user surname')
    } else if (user.surname.replace(/ /g, '').length < MINIMUM_NAME_LENGTH) {
      throw new UserClientError('The provided surname is too short')
    } else if (user.surname.replace(/ /g, '').length > MAXIMUM_NAME_LENGTH) {
      throw new UserClientError('The provided user surname is too long')
    }

    // Test the names against the regex.
    if (!PART_NAME_REGEX.test(user.forename)) {
      throw new UserClientError('The provided user forename did not match the regular expression')
    } else if (!PART_NAME_REGEX.test(user.surname)) {
      throw new UserClientError('The provided user surname did not match the regular expression')
    } else if (!FULL_NAME_REGEX.test(`${user.forename} ${user.surname}`)) {
      throw new UserClientError('The provided user complete name did not match the regular expression')
    }
  }

  idValidation(id) {
    if (isNull(id)) {
      throw new UserClientError('The provided id cannot be null')
    } else if (id <= 0) {
      throw new UserClientError('The provided id must be greater than 0')
    } else if (isNaN(id)) {
      throw new UserClientError('The provided id is not a valid number')
    }
  }

  pageValidation(page) {
    if (isNull(page)) {
      throw new UserClientError('The provided page number cannot be null')
    } else if (page <= 0) {
      throw new UserClientError('The provided page number must be greater than 0')
    } else if (isNaN(page)) {
      throw new UserClientError('The provided page number is not a valid number')
    }
  }
}

module.exports = UserValidation
