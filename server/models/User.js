const { Sequelize, DataTypes } = require('sequelize');
const {sequelize} = require('.././db.js')

const User = sequelize.define(
  'User',
  {
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = {User};