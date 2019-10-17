// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : process.env.DB_PASSWORD,
      database : 'kamadan-market'
    }
  },

  staging: {
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : process.env.DB_PASSWORD,
      database : 'kamadan-market'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : process.env.DB_PASSWORD,
      database : 'kamadan-market'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
