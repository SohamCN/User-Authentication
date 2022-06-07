const pg = require('pg');

const postgresDB = async() => {
    try {
        //postgres connection string
        await new pg.Client(process.env.POSTGRES_CONNECTION_STRING);
        console.log('Postgres connected');
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = postgresDB


