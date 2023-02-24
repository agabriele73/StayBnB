const express = require('express');
const { Spot, Review, SpotImage, User, ReviewImage } = require('../../db/models');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Sequelize } = require('sequelize');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


// delete spot-image by imageId

router.delete('/:imageId', requireAuth, async (req, res) => {
    const userId = req.user.id
    
    const image = await SpotImage.findByPk(req.params.imageId, {include: {
        model: Spot
    }})
    if(!image) {
        res.status(404).json({
            message: "Spot image couldn't be found",
            statusCode: 404
        })
    }

    if(image.Spot.ownerId !== userId) {
        res.status(403).json({
            message: 'User not authorized',
            statusCode: 403
        })
    }
    await image.destroy()

    res.status(200).json({
        message: "Successfully deleted",
        statusCode: 200
    })
})





module.exports = router