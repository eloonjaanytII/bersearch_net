const {User} = require('../models/index');

const getUsersList = async (req, res, next) => {

    const {count, rows} = await User.findAndCountAll();

    if (!rows || rows.length === 0 ) {
        return next(new Error("Список пользователей пуст"))
    }

    const usersList = rows.map(user => ({
        id: user.id,
        username: user.username,
    }))


    return res.json({usersList, countUsers : count, message: 'Список пользователей успешно отправлен'})
}

const getUserData = async (req, res, next) => {

    const userId = req.user.id;

    const data = await User.findOne({where : {id : userId}})

    if (!data) {
        next(new Error("Какие-то ошибки с выдачей данных юзера"))
    }

    res.status(200).json(data)

}

module.exports = {getUsersList, getUserData}