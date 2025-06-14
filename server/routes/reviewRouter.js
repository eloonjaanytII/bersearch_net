const Router = require('express');
const router = new Router();
const {createReview, getUserReview} = require('../controllers/reviewsController')
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createReview);
router.get('/user-review/:userId', getUserReview)


module.exports = router;