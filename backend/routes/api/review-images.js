const express = require('express');
const { Spot, Review, SpotImage, User, ReviewImage } = require('../../db/models');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Sequelize } = require('sequelize');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// delete a review by Id

router.delete('/:imageId', async (req, res) => {
    const userId = req.user.id
    const reviewImage = await ReviewImage.findByPk(req.params.imageId, {
        include: {
            model: Review
        }
    })
    if(!reviewImage) {
        res.status(404).json({
            message: "Review couldn't bne found",
            statusCode: 404
        })
    }
    if(reviewImage.Review.userId !== userId) {
        res.status(403).json({
            message: "User not authorized",
            statusCode: 403
        })
    }
    await reviewImage.destroy()
    res.status(200).json({
        message: "Successfully deleted",
        statusCode: 200
    })
})


module.exports = router