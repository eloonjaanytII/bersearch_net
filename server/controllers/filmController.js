const { UserFilms } = require("../models");
const { Film } = require("../models");
const { Film } = require("../models");

const createFilm = async (req, res, next) => {

    const {kinopoiskId, isWatched} = req.body;
    const userId = req.user.id;

    const checkFilm = await UserFilms.findOne({where: {kinopoiskId, userId}} )

    if (checkFilm) {
        return next(new Error("Фильм уже просмотрен"))
    }
    
    await UserFilmList.create({
        kinopoiskId,
        userId,
        isWatched
    });

    return res.status(201).json({ message: 'Фильм сохранён в список'});
}

const updateRating = async (req, res, next) => {

    const {kinopoiskId, rating} = req.body;
    const userId = req.user.id;

    const checkFilm = await UserFilmList.findOne({where: {kinopoiskId, userId}} )

    if (checkFilm) {
        return next(new Error("Фильм не найден"))
    }
    
    await UserFilmList.create({
        kinopoiskId,
        userId,
        nameRu,
        nameOriginal,
        posterUrl,
        year,
        filmLength,
        countries,
        genres,
        rating,
        director
    });

    return res.status(201).json({ message: 'Фильм сохранён в список'});
}



const getUserFilms = async (req, res, next) => {
            const {userId} = req.params;

            const checkFilm = await UserFilmList.findAll({where: {userId}})

            if (checkFilm.length === 0) {
                next(new Error('Рецензий у пользователя не обнаружено'))
            }

            return res.status(200).json(checkFilm);
}

module.exports = {sendFilm, getUserFilms};