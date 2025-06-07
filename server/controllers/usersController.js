const {User} = require('../models/index');

const getUsersList = async (req, res, next) => {

    const {count, rows} = await User.findAndCountAll();

    if (!rows || rows.length === 0 ) {
        next(new Error("Список пользователей пуст"))
    }

    const usersList = rows.map(user => ({
        id: user.id,
        username: user.username,
    }))


    return res.json({usersList, countUsers : count, message: 'Список пользователей успешно отправлен'})
}

module.exports = {getUsersList}