const {DataTypes } = require('sequelize');
const {sequelize} = require('../db.js');

const Review = sequelize.define(
  'Review',
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    kinopoiskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
        type: DataTypes.INTEGER,
        validate: { min: 0, max: 10 },
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    publishedAt: {
        type: DataTypes.DATE,
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
  ],
  }
)

module.exports = {Review};