const {DataTypes} = require('sequelize');
const {sequelize} = require('../db.js');
const kinopoisk = require('../instance/kinopoisk.js');

const Film = sequelize.define(
  'Film',
  {
    kinopoiskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    nameRu: {
      type: DataTypes.STRING
    },
    nameEn: {
      type: DataTypes.STRING
    },
    nameOriginal: {
      type: DataTypes.STRING,
    },
    posterUrl: {
      type: DataTypes.STRING,
    },
    ratingKinopoisk: {
      type: DataTypes.FLOAT, 
    },
    year: {
      type: DataTypes.INTEGER , 
    },
    filmLength: {
        type: DataTypes.INTEGER , 
    },
    slogan: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING
    },
    shortDescription: {
        type: DataTypes.STRING
    },
    countries: {
        type: DataTypes.JSONB
    },
    genres: {
        type: DataTypes.JSONB
    }
  },
  {
    timestamps: true,
  }
)

module.exports = {Film};



const getFilmDetail = async (id) => {
    const response = await kinopoisk.get(`v2.2/films/${id}`)
    return response.data
}

const getStaff = async (filmId) => {
    const response = await kinopoisk.get('v1/staff', {params: {filmId}})
    return response.data
}
