/*const pg = require('pg');

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

module.exports = postgresDB*/
const Sequelize = require('sequelize');

const sequelize = new Sequelize('userdb','postgres','password',{
    dialect:'postgres',
    host:'localhost'
})

let connected = async()=>{
    try {
        await sequelize.authenticate();
        console.log('PostgresSql Database Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    }
    module.exports = {connected, sequelize}


