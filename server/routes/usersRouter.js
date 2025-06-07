const Router = require('express');
const router = new Router();
const {getUsersList} = require('../controllers/usersController')
const ha = require('express-async-handler')

router.get('/users-list', ha(getUsersList));


module.exports = router;