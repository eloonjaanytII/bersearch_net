const {DataTypes } = require('sequelize');
const {sequelize} = require('../db.js');

const Actor = sequelize.define(
  'Actor',
  {
    staffId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nameEn: {
      type: DataTypes.STRING
    },
    nameRu: {
      type: DataTypes.STRING,
    },
    posterUrl: {
      type: DataTypes.STRING,
    },
    sex: {
        type: DataTypes.STRING
    },
    birthplace: {
        type: DataTypes.STRING
    }
  },
  {
    timestamps: true,
  }
)

module.exports = {Actor};
