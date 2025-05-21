const {User, UserPersonal} = require('../models/index');
const bcrypt = require("bcryptjs");
const {validationResult} = require('express-validator');
const generateAccessToken = require('../utils/generateToken');

const registerUser = async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при регистрации", errors})
            }
            const {email, password} = req.body;
            const candidate = await User.findOne({where: {email}} )
            if (candidate) {
                return res.status(400).json({message: 'Пользователь уже существует'})
            }

            const salt = bcrypt.genSaltSync(7);
            const hashPassword = bcrypt.hashSync(password, salt);

            const user = await User.create({
                email,
                password: hashPassword
            });

            await UserPersonal.create({ userId: user.id });

            const token = generateAccessToken(user.id);
            return res.status(201).json({ token, userId: user.id });

        }catch(e){
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
}

const updateUserDetails = async (req, res) => {
        try {
            const {username, gender, avatar, city, color, status } = req.body;
            const userId = req.user.id;

            await User.update({username}, {where: {id: userId}});
            await UserPersonal.update({gender, avatar, city, color, status}, {where : {userId}});

            res.json({message: 'Данные обновлены'})

        }catch(e){
            res.status(500).json({ message: 'Ошибка обновления', error });
        }
}

const signIn = async (req, res) => {
        try {

            const {username, password} = req.body;
            const user = await User.findOne({where: {username}});
            if (!user) {
                res.status(400).json({message: 'Пользователь с таким username не найден'})
            }

            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                res.status(400).json({message: 'Пароль неверный'})
            }

            const token = generateAccessToken(user.id)  
            return res.json({token, message: 'Вы вошли'})

        }catch(e){
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
}


module.exports = {registerUser, updateUserDetails, signIn};