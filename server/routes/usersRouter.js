const Router = require('express');
const router = new Router();
const {usersList} = require('../controllers/usersController')
const ha = require('express-async-handler')

router.get('/users-list', ha(usersList));


module.exports = router;