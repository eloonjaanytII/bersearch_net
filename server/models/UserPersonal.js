const { Sequelize, DataTypes } = require('sequelize');
const {sequelize} = require('.././db.js')

const UserPersonal = sequelize.define(
  'UserPersonal',
  {
    city: DataTypes.STRING,
    status: DataTypes.STRING(100),
    gender: {
        type: DataTypes.ENUM('male', 'female'),
        allowNull: false,
        defaultValue: 'male'
    },
    color: {
        type: DataTypes.STRING(7),
        allowNull: false,
        defaultValue: '#000000',  // по умолчанию чёрный
        validate: {
            is: /^#([0-9A-Fa-f]{6})$/  // валидация HEX-кода
        }
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: false
    },
  },
  {
    timestamps: true,
  }
)

module.exports = {UserPersonal};