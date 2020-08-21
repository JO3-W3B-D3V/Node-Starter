class UserRepository {
  static get PER_PAGE() {
    return 10
  }

  constructor() {
    const DatabaseConnection = require('../DatabaseConnection')
    this.connection = new DatabaseConnection().getConnection()
  }

  getUserById(id) {
    return this.connection('user').where('id', id).select('*').first()
  }

  insertUser({ forename, surname }) {
    return this.connection('user').insert({ forename, surname })
  }

  getUsersByPage(page) {
    const offset = (page - 1) * UserRepository.PER_PAGE

    return this.connection('user').select('*').offset(offset).limit(10)
  }

  async getTotalNumberOfPages() {
    const max = await this.connection('user').count('id AS count').first()

    return Math.ceil(max.count / UserRepository.PER_PAGE)
  }
}

module.exports = UserRepository
