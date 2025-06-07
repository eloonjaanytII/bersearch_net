const {DataTypes } = require('sequelize');
const {sequelize} = require('../db.js');
const { Actor } = require('./Actor.js');
const { Film } = require('./Film.js');

const ActorsFilms = sequelize.define(
  'ActorsFilms',
  {
    staffId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Actor,
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
  }, 
  {
  timestamps: true,
  indexes: [
      {
        unique: true,
        fields: ['staffId', 'kinopoiskId']
      }
    ]
  }
);

module.exports = {ActorsFilms};