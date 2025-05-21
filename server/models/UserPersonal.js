const { Sequelize, DataTypes } = require('sequelize');
const {sequelize} = require('../db.js');

const UserPersonal = sequelize.define(
  'UserPersonal',
  {
    city: DataTypes.STRING,
    status: DataTypes.STRING(100),
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    gender: {
        type: DataTypes.ENUM('male', 'female'),
        allowNull: true,
        defaultValue: 'male'
    },
    color: {
        type: DataTypes.STRING(7),
        allowNull: true,
        defaultValue: '#000000',  // по умолчанию чёрный
        validate: {
            is: /^#([0-9A-Fa-f]{6})$/  // валидация HEX-кода
        }
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true
    },
  },
  {
    timestamps: true,
  }
)

module.exports = {UserPersonal};