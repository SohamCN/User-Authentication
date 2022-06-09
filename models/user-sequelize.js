/*const user = (sequelize, DataTypes) => {
    const User = sequelize.define(
      'user',
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
        },
        username: {
          type: DataTypes.STRING,
        },
        password: {
          type: DataTypes.STRING,
        },
      },
      {
        timestamps: true
      }
    );
  
    //User.sync();
    return User;
  };

  module.exports = user*/

const { Sequelize } = require("sequelize")

module.exports = sequelize => {
  const User = sequelize.define(
    "user",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      // phone: {
      //     type: DataTypes.INTEGER
      // },
      password: {
        type: Sequelize.STRING,
      },
    },
    { createdAt: false, updatedAt: false } /*{
        timestamps: true,
        createdAt: false, // don't add createdAt attribute
        
    }*/
  )
  return User
}
