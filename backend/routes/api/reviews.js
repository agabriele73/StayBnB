const express = require('express');
const { Spot, Review, SpotImage, User, ReviewImage } = require('../../db/models');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Sequelize } = require('sequelize');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


router.get('/current', async (req, res, next) => {
    const userId = req.user.id

    const currReviews = await Review.findAll({where: {userId: userId}, include: 
        [
            
            { model: User, attributes: ['id', 'firstName', 'lastName']},
            {model: Spot, attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']},
            {model: ReviewImage, attributes: ['id', 'url']}
        ]
})
    
    res.json(currReviews)
})



router.delete('/:reviewId', async (req, res, next) => {
    
    const review = await Review.findByPk(req.params.reviewId)

    if (!review) {
        res.status(404).json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }


    await review.destroy(

        res.status(200).json(
            {
                "message": "Successfully deleted",
                "statusCode": 200
            }
        )
    )

})
module.exports = router