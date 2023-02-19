const express = require('express');
const { Spot, Review, SpotImage, User, ReviewImage } = require('../../db/models');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Sequelize } = require('sequelize');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');






// current user reviews
router.get('/current', async (req, res, next) => {
    const userId = req.user.id
    const currReviews = await Review.findAll({where: {userId: userId}, include: 
        [
            {model: Spot, attributes: ['id','ownerId', 'address', 'city', 'state', 'country', 'lat','lng', 'name', 'description', 'price'], include: [
                {
                model: SpotImage, attributes: ['url'],
                },
            ]},
            { model: User, attributes: ['id', 'firstName', 'lastName']},

            {model: ReviewImage, attributes: ['id', 'url']}
        ]
})
const modifiedCurrReviews = currReviews.map((review) => {
    let spot = review.Spot
    const urlMod = spot.SpotImages.map(obj => {
        let url = obj.url
        return {
            ...spot.toJSON(),
            previewImage: url,
            SpotImages: undefined
        }
    })
    return {
        ...review.toJSON(),
        Spot: urlMod,
    }
});

res.json({Reviews: modifiedCurrReviews});
})

// post an image to a review
router.post('/:reviewId/images', async (req, res) => {
    const userId = req.user.id
    const reviewId = parseInt(req.params.reviewId, 10)
    const { url } = req.body
    const review = await Review.findByPk(reviewId)
    if(userId !== review.userId) {
        res.status(400).json({
            message: 'user not authorized',
            statusCode: 400
        })
    }
    if(!review) {
        res.status(404).json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }
    const newReviewImage = await ReviewImage.create({
        reviewId,
        url
    })
    const images = await ReviewImage.findAll({ where: { reviewId } });
    if (images.length >= 10) {
        res.status(400).json({
            message: "Maximum number of images for this review was reached",
            statusCode: 400,
        });
        return;
    }
    res.json({id: newReviewImage.id, url: newReviewImage.url})
})



//edit a review
router.put('/:reviewId', async (req, res) => {
    const { review, stars } = req.body
    const userId = req.user.id
    const reviewId = parseInt(req.params.reviewId)
    const upReview = await Review.findByPk(req.params.reviewId)
    if(!upReview) {
        res.status(404).json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }
    if(userId !== upReview.userId) {
        res.status(400).json({
            message: 'user not authorized',
            statusCode: 400
        })

    }
    const updatedReview = await upReview.update({
        review,
        stars
    })
    res.json(updatedReview)
})


// delete a review
router.delete('/:reviewId', async (req, res, next) => {
    const review = await Review.findByPk(req.params.reviewId)
    if (!review) {
        res.status(404).json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }
    await review.destroy()
    res.status(200).json({message: "Successfully deleted", statusCode: 200})
})










module.exports = router