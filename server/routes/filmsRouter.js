const Router = require('express');
const router = new Router();
const {updateFilmFlags, getUserFilms, getFilm, getUserFilmFlag, getUserFilmFlagsAll} = require('../controllers/filmController')
const ha = require('express-async-handler');
const authMiddleware = require('../middleware/authMiddleware');

router.get("/film/:kinopoiskId", ha(getFilm));
router.get("/user-films/:userId", ha(getUserFilms));   

router.get("/film-flag/:kinopoiskId", authMiddleware, ha(getUserFilmFlag));
router.get("/film-flags/:userId", ha(getUserFilmFlagsAll));   

router.put('/', authMiddleware, ha(updateFilmFlags));


module.exports = router;