const { UserFilmList } = require("../models");

const sendFilm = async (req, res, next) => {

    const {kinopoiskId, nameRu, nameOriginal, posterUrl, year, filmLength, countries, genres, rating=0} = req.body;
    const userId = req.user.id;

    const checkFilm = await UserFilmList.findOne({where: {kinopoiskId, userId}} )

    if (checkFilm) {
        return next(new Error("Рецензия на фильм уже существует"))
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
        rating
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