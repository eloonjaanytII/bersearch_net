const Router = require('express');
const router = new Router();
const {sendFilm, getUserFilms} = require('../controllers/filmController')
const ha = require('express-async-handler');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/', authMiddleware, ha(sendFilm));
router.get('/user-films/:userId', ha(getUserFilms));


module.exports = router;