module.exports = {
  test: {
    client: 'sqlite3',
    connection: {
      filename: './resources/test.sqlite',
    },
    migrations: {
      directory: './resources/migrations',
    },
    seeds: {
      directory: './resources/seeds',
    },
    useNullAsDefault: true,
  },

  otherTest: {
    client: 'sqlite3',
    migrations: {
      directory: './resources/other',
    },
    connection: {
      filename: './resources/othertest.sqlite',
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
    seeds: {
      directory: './resources/seeds',
    },
    useNullAsDefault: true,
  },
}
