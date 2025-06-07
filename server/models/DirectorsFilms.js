const {DataTypes } = require('sequelize');
const {sequelize} = require('../db.js');
const { Director } = require('./Director.js');
const { Film } = require('./Film.js');

const DirectorsFilms = sequelize.define(
  'DirectorsFilms',
  {
    staffId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Director,
        key: "staffId"
      }
    },
    kinopoiskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Film,
        key: "kinopoiskId"
      }
    },
    isWatched: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    rating: {
        type: DataTypes.INTEGER,
        validate: { min: 0, max: 10},
    },
    favorite: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  }, 
  {
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['staffId', 'kinopoiskId'],
    },
  ],
}
);

module.exports = {DirectorsFilms};