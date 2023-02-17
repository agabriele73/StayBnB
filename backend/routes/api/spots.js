const express = require('express');
const { Spot, Review, SpotImage, User } = require('../../db/models');
const { setTokenCookie } = require('../../utils/auth');
const sequelize = require('sequelize')
const router = express.Router();




// get all spots
router.get('/', async (req, res, next) => {
    
        const spotsWithPreview = await Spot.scope('spotsWithPreview').findAll()
    
        const spotsPreview = spotsWithPreview.map(spot => {
            
        const urls = spot.previewImage.map(image => image.url)
        const stars = spot.avgRating.reduce((sum, rating) => sum + rating.stars, 0) / spot.avgRating.length

        
        return{
            ...spot.toJSON(),
            previewImage: urls[0],
            avgRating: stars
        }
    })
    return res.json({Spots: spotsPreview})
})

// create a spot
router.post('/', async (req, res, next) => {
    const { ownerId, address, city, state, country, lat, lng, name, description, price } = req.body

    const createSpot = await Spot.create({
        ownerId: ownerId,
        address: address,
        city: city,
        state: state,
        country: country,
        lat: lat,
        lng: lng,
        name: name,
        description: description,
        price: price
    })
    
    

    res.json({newSpot: createSpot})
})



// get all spots by current user
router.get('/current', async (req, res, next) => {
    try {
        const userId = req.user.id
        const spotsWithPreview = await Spot.scope('spotsWithPreview').findAll({where: {ownerId: userId}})
    
        const userSpots = spotsWithPreview.map(spot => {
            
        const urls = spot.previewImage.map(image => image.url)
        const stars = spot.avgRating.reduce((sum, rating) => sum + rating.stars, 0) / spot.avgRating.length

        
        return{
            ...spot.toJSON(),
            previewImage: urls[0],
            avgRating: stars
        }
    })
    
        res.status(200).json({Spots: userSpots})
    } catch(error) {
        if(!req.user) {
            throw new Error('no user logged in')
        }
    }
})


// get spots by :spotId

router.get('/:spotId', async (req, res, next) => {
    let spotId = req.params.spotId
    try {
        const spot = await Spot.findByPk(spotId, {
            include: [
                { model: SpotImage, as: 'previewImage',attributes: ['id', 'url', 'previewImg'] },
                { model: User, as: 'Owner', attributes: ['id', 'firstName', 'lastName']},
                { model: Review, as: 'avgRating'}
            ]
        })
        if (!spot) {
            const error = new Error(`Spot with ID ${spotId} not found`);
            error.status = 404;
            throw error;
        }
        const stars = spot.avgRating.reduce((sum, rating) => sum + rating.stars, 0) / spot.avgRating.length
        const totalReviews = spot.avgRating.length
        const spotData = {...spot.toJSON(), avgRating: stars, numReviews: totalReviews}
        spotData.SpotImage = spot.previewImage
        delete spotData.previewImage
        res.json(spotData)
    } catch(err) {
        next(err)
    }
})

module.exports = router