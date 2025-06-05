const {User, UserPersonal} = require('../models/index');
const bcrypt = require("bcryptjs");
const generateAccessToken = require('../utils/generateToken');

const registerUser = async (req, res, next) => {

    const {email, password, username} = req.validated;

    const candidate = await User.findOne({where: {email}} )

    if (candidate) {
        next(new Error (JSON.stringify({status: 409, message: "Пользователь уже существует"})))
    }

    const salt = bcrypt.genSaltSync(7);
    const hashPassword = bcrypt.hashSync(password, salt);

    const user = await User.create({
        email,
        password: hashPassword,
        username
    });

    await UserPersonal.create({ userId: user.id });

    const token = generateAccessToken(user.id);
    return res.status(201).json({ token, userId: user.id });
}

const updateUserDetails = async (req, res, next) => {

    const {gender, avatar, city, color, status } = req.body;
    const userId = req.user.id;

    await UserPersonal.update({gender, avatar, city, color, status}, {where : {userId}});
    res.json({message: 'Данные обновлены'})
}

const signIn = async (req, res, next) => {

    const {username, password} = req.validated;
    const user = await User.findOne({where: {username}});

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword || !user) {
        next(new Error(JSON.stringify({status: 400, message: 'Вы ввели некорректный юзернейм или пароль'})))
    }

    const token = generateAccessToken(user.id)  
    return res.json({ token, userId: user.id })

}

const сurrentUser = async (req, res, next) => {

    const user = await User.findByPk(req.user.id);

    if (!user) {
        next(new Error(JSON.stringify({status: 404, message: 'Пользователь не найден'})))
    }

    return res.json({userId: user.id})
}


module.exports = {registerUser, updateUserDetails, signIn, сurrentUser};