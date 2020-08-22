class UserService {
  constructor() {
    const UserRepository = require('./UserRepository')
    const UserValidation = require('./UserValidation')

    this.repository = new UserRepository()
    this.validation = new UserValidation()
  }

  getUserById(id) {
    this.validation.idValidation(id)

    return this.repository.getUserById(id)
  }

  getUsersByPage(page) {
    this.validation.pageValidation(page)

    return this.repository.getUsersByPage(page)
  }

  getTotalNumberOfPages() {
    return this.repository.getTotalNumberOfPages()
  }

  createUser(user) {
    this.validation.validateUserObject(user)

    return this.repository.insertUser(user)
  }

  updateUser(user) {
    this.validation.validateUserObject(user)
    this.validation.idValidation(user.id)

    return this.repository.updateUser(user)
  }

  deleteUserById(id) {
    this.validation.idValidation(id)

    return this.repository.deleteUserById(id)
  }
}

module.exports = UserService
