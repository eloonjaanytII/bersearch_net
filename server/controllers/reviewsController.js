const {Review} = require('../models/index');

const sendReview = async (req, res) => {
        try {
            const {content, kinopoiskId, title } = req.body;
            const userId = req.user.id;

            const checkReview = await Review.findOne({where: {kinopoiskId, userId}} )
            if (checkReview) {
                return res.status(400).json({message: 'Рецензия на фильм уже существует'})
            }
            
            await Review.create({
                content,
                kinopoiskId,
                userId,
                title
            });

            return res.status(201).json({ message: 'Рецензия опубликована'});

        }catch(e){
            console.log(e)
            res.status(500).json({message: 'Send review error'})
        }
}

const getUserReview = async (req, res) => {
        try {
            const {userId} = req.params;

            const checkReview = await Review.findAll({where: {userId}})
            if (checkReview.length === 0) {
                return res.status(400).json({message: 'Рецензий у пользователя не обнаружено'})
            }

            return res.status(200).json({reviews: checkReview});

        }catch(e){
            console.log(e)
            res.status(500).json({message: 'Какая-то ошибка при поиске рецензий пользователя'})
        }
}

module.exports = {sendReview, getUserReview};