// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      //diretório do banco de dados
      filename: './src/database/db.sqlite'
    },
    migrations: {
      //diretório das migrations
      directory: './src/database/migrations'
    },
    //o sqlite nao suporta inserção de default values para as colunas no banco de dados
    useNullAsDefault: true,
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
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
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
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
