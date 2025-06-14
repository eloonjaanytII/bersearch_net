const Router = require('express');
const router = new Router();
const {getUsersList, getUserData} = require('../controllers/usersController')
const ha = require('express-async-handler');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/users-list', ha(getUsersList));
router.get('/', authMiddleware, ha(getUserData))

module.exports = router;