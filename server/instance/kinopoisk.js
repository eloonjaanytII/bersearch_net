
const axios = require('axios');

const kinopoiskApiKey = process.env.KINOPOISK_KEY;

const kinopoisk = axios.create({
    baseUrl: 'https://kinopoiskapiunofficial.tech/api/',
    headers: {
      'X-API-KEY': kinopoiskApiKey,
      'Content-Type': 'application/json',
    },
})

module.exports = kinopoisk;