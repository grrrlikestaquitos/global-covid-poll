module.exports = {  
    development: {
        client: 'postgresql',
        connection: {
          database: 'global-covid-poll',
        },
        migrations: {
          directory: __dirname + '/database/migrations'
        }
      },
    
      production: {
        client: 'postgresql',
        connection: process.env.DATABASE_URL,
        pool: {
          min: 2,
          max: 10
        },
        migrations: {
          directory: __dirname + '/database/migrations'
        }
      }
}