const {DataTypes } = require('sequelize');
const {sequelize} = require('../db.js');

const UserFilmList = sequelize.define(
  'UserFilmList',
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    kinopoiskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nameRu: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nameOriginal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    posterUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    year: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filmLength: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    countries: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    genres: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    rating: {
        type: DataTypes.INTEGER,
        validate: { min: 0, max: 10 },
    },
    editedAt: {
        type: DataTypes.DATE,
    }
  },
  {
    timestamps: true,
    indexes: [
    {
      unique: true,
      fields: ['userId', 'kinopoiskId'],
      },
    ]
  }
)

module.exports = {UserFilmList};