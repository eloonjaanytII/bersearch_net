const {User, Role} = require('../models/User');
const bcrypt = require("bcryptjs");
const {validationResult} = require('express-validator');
const jwt = require("jsonwebtoken");
const {secret} = require('../config');

const generateAccesToken = (id, role) => {
    const payload = {
        id,
        role
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"})
}


class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при регистрации", errors})
            }
            const {username, password} = req.body;
            const candidate = await User.findOne({where: {username}} )
            if (candidate) {
                return res.status(400).json({message: 'Пользователь уже существует'})
            }

            const salt = bcrypt.genSaltSync(7);
            const hashPassword = bcrypt.hashSync(password, salt);
            const userRole = await Role.findOne({ where: { name: "USER" } })

            if (!userRole) {
                return res.status(500).json({ message: "Роль не найдена!" });
            }

            const user = await User.create({
                username, 
                password: hashPassword, 
                roleId: userRole.id});

            return res.json('Пользователь успешно зарегистрирован')

        }catch(e){

            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res) {
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

            const token = generateAccesToken(user.id, user.roleId)  
            return res.json({token})

        }catch(e){
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }

    async getUsers(req, res) {
        try {

            const users = await User.findAll();
            res.json(users)
        }catch(e){
            console.log(e)
            res.status(400).json({message: 'Get users error'})
        }
    }

}

module.exports = new authController();