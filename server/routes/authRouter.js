const Router = require('express');
const router = new Router();
const {registerUser, updateUserDetails, signIn} = require('../controllers/authController')
const {check} = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/registration/sign-up', [
    check('email', "Логин не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({min: 4, max: 20})
], registerUser);
router.put('/registration/personal-details', authMiddleware, updateUserDetails);
router.post('/registration/sign-in', signIn)



module.exports = router;