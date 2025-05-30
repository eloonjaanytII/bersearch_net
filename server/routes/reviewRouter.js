const Router = require('express');
const router = new Router();
const {sendReview, getUserReview} = require('../controllers/reviewsController')
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, sendReview);
router.get('/user-review/:userId', getUserReview)


module.exports = router;