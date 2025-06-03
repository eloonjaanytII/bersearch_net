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

const updateUserDetails = async (req, res) => {
        try {
            const {gender, avatar, city, color, status } = req.body;
            const userId = req.user.id;

            await UserPersonal.update({gender, avatar, city, color, status}, {where : {userId}});

            res.json({message: 'Данные обновлены'})

        }catch(e){
            res.status(500).json({ message: 'Ошибка обновления', error });
        }
}

const signIn = async (req, res) => {
        try {

            const {username, password} = req.validated;
            const user = await User.findOne({where: {username}});
            if (!user) {
                return res.status(401).json({message: 'Пользователь с таким username не найден'})
            }

            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(401).json({message: 'Пароль неверный'})
            }

            const token = generateAccessToken(user.id)  
            return res.json({ token, userId: user.id })

        }catch(e){
            console.error("Ошибка входа:", e);
            return res.status(500).json({message: 'Ошибка валидации пользователя'})
        }
}


module.exports = {registerUser, updateUserDetails, signIn};