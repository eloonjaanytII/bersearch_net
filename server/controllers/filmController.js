const { UserFilms } = require("../models");
const { Film } = require("../models");
const getFilmOrFetch = require("../services/getFilmorFetch");

const updateFilmFlags = async (req, res) => {

    const {kinopoiskId, isWatched, rating, favorite} = req.body;
    const userId = req.user.id;

    await UserFilms.update({isWatched, rating, favorite}, {where : {kinopoiskId, userId}});

    return res.status(201).json({ message: 'Фильм сохранён в список'});
}

const getFilm = async (req, res, next) => {

    const {kinopoiskId} = req.params;
    const film = await getFilmOrFetch(kinopoiskId);

    if (!film) {
        return next(new Error("Фильм не найден"))
    }

    return res.status(200).json(film);
}


const getUserFilmFlag = async (req, res, next) => {

    const {kinopoiskId} = req.params;
    const userId = req.user.id;

     await getFilmOrFetch(kinopoiskId);

     const [userFlags] = await UserFilms.findOrCreate({
        where: { kinopoiskId, userId },
        defaults: {
            isWatched : false,
            rating: 0,
            favorite: false
        }
        });
    if (!userFlags) {
        next(new Error("Какие-то проблемы с получением или инициализацией флажков юзера"))
    }

    return res.status(200).json(userFlags)
}

const getUserFilmFlagsAll = async (req, res, next) => {

    const {userId} = req.params;

    const data = await UserFilms.findAll({where : {userId}})

    if (!data) {
        return next(new Error("Проблемы получить флаги пользователя"))
    }

    return res.status(200).json(data)
}


const getUserFilms = async (req, res, next) => {

    const {userId} = req.params;

    const userChainList = await UserFilms.findAll({where: {userId}})

    if (userChainList.length === 0) {
        return next(new Error('У пользователя нет добавленных фильмов'))
    }

    const kinopoiskIdList = userChainList.map(el => el.kinopoiskId).filter(Boolean)

    const userFilmList = await Film.findAll({where: {kinopoiskId: kinopoiskIdList}})

    const foundListId = userFilmList.map(film => film.kinopoiskId)

    const missingFilmsId = kinopoiskIdList.filter(id => !foundListId.includes(id))

    const missingFilmsData = await Promise.all(missingFilmsId.map(id => getFilmOrFetch(id)))

    const fullUserFilmList = [...userFilmList, ...missingFilmsData]

    return res.status(200).json(fullUserFilmList);
}

module.exports = {updateFilmFlags, getUserFilms, getFilm, getUserFilmFlag, getUserFilmFlagsAll};