module.exports = {  
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    migrations: {
        directory: __dirname + '/database/migrations'
    }
}