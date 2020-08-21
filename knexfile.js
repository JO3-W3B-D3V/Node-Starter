module.exports = {
  test: {
    client: 'sqlite3',
    connection: {
      filename: './resources/test.sqlite',
    },
    migrations: {
      directory: './resources/migrations',
    },
    useNullAsDefault: true,
  },

  development: {
    client: 'sqlite3',
    connection: {
      filename: './resources/db.sqlite',
    },
    migrations: {
      directory: './resources/migrations',
    },
    useNullAsDefault: true,
  },
}
