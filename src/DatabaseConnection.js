class DatabaseConnection {
  constructor() {
    const knex = require('knex')
    const configuration = require('../knexfile') // cspell: disable-line
    const config = configuration[process.env['ENV']]
    this.connection = knex(config)
  }

  getConnection() {
    return this.connection
  }
}

module.exports = DatabaseConnection
