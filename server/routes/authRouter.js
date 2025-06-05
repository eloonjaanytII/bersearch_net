const Router = require('express');
const router = new Router();
const {registerUser, updateUserDetails, signIn, сurrentUser} = require('../controllers/authController')
const authMiddleware = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { loginSchema, registerSchema } = require('../schemas/authSchema');
const ha = require('express-async-handler')


router.post('/registration/sign-up', validate(registerSchema), ha(registerUser));
router.put('/registration/personal-details', authMiddleware, ha(updateUserDetails));
router.post('/registration/sign-in', validate(loginSchema), ha(signIn))
router.get('/me', authMiddleware, ha(сurrentUser))




module.exports = router;