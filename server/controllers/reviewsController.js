const {Review} = require('../models/index');

const createReview = async (req, res, next) => {

    const {content, kinopoiskId, title } = req.body;
    const userId = req.user.id;

    const checkReview = await Review.findOne({where: {kinopoiskId, userId}})

    if (checkReview) {
        return next(new Error("Рецензия на фильм уже существует"))
    }
    
    await Review.create({
        content,
        kinopoiskId,
        userId,
        title
    });

    return res.status(201).json({ message: 'Рецензия опубликована'});
}

const getUserReview = async (req, res, next) => {
    
    const {userId} = req.params;

    const checkReview = await Review.findAll({where: {userId}})
    if (checkReview.length === 0) {
        return next(new Error('Рецензий у пользователя не обнаружено'))
    }

    return res.status(200).json({reviews: checkReview});
}

module.exports = {createReview, getUserReview};