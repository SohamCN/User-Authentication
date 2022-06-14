const Sequelize = require('sequelize');
const db = require('../database/postgres-connection');

const User = db.sequelize.define('user',{
    id:{
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    username:{
        type: Sequelize.STRING,
        allowNull: false
    }, 
    password: {
        type: Sequelize.STRING,
        allowNull: false
      },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: {
              msg: "Must be a valid email address",
            }
          }
      },
    phone: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });
  
  module.exports = User;