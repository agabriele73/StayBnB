const express = require('express');
const { Spot, Review, SpotImage, User } = require('../../db/models');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Sequelize } = require('sequelize');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
// ...




// get all spots
router.get('/', async (req, res, next) => {
    
    //         const spotsPreview = spotsWithPreview.map(spot => {
        // const spotsWithPreview = await Spot.findAll()
        const spotsWithPreviewandAvgRating = await Spot.findAll({
            include: [
                {
                model: SpotImage, attributes: []
                },
                {
                model: Review, attributes: ['stars']
                }
            ],
                attributes: ['id','ownerId', 'address', 'city', 'state', 'country', 'lat','lng', 'name', 'description', 'price', [Sequelize.col('SpotImages.url'), 'previewImage']
                //[Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgRating']
            ]
        })

        const starsArr = spotsWithPreviewandAvgRating.map(spot => {
            return spot.Reviews.map(review => review.stars)})
        //console.log(starsArr)
        
        
        const avgStars = starsArr.map(stars => {
            let avg
            const sum = stars.reduce((total, star) => total + star, 0)
            avg = sum / stars.length
          //  console.log(avg)
            return avg
        })
        
        const spotsWithKeys = spotsWithPreviewandAvgRating.map((spot, index) => {
            spot.Reviews = spot.avgRating 
            delete spot.Reviews
            return {
                ...spot.toJSON(),
                avgRating: avgStars[index],
                Reviews: undefined
        
        
        } 
        
        
        
    })
            
    
        res.status(200).json({Spots: spotsWithKeys})



})

// create a spot
router.post('/', async (req, res, next) => {
    const userId = req.user.id
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    if(!address || !city || !state || !country || !description || !price) {
        res.status(400).json({
            "message": "Validation Error",
            "statusCode": 400,
            "errors": {
            "address": "Street address is required",
            "city": "City is required",
            "state": "State is required",
            "country": "Country is required",
            "lat": "Latitude is not valid",
            "lng": "Longitude is not valid",
            "name": "Name must be less than 50 characters",
            "description": "Description is required",
            "price": "Price per day is required"
            }
        })
    }
    const createSpot = await Spot.create({
        ownerId: userId,
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
    
    

    res.status(201).json({newSpot: createSpot})
})



// get all spots by current user
router.get('/current', async (req, res, next) => {
    
        const userId = req.user.id
        const associatedSpots = await Spot.findAll({where: {ownerId: userId}, 
            include: [
                {
                model: SpotImage, attributes: []
                },
                {
                model: Review, attributes: ['stars']
                }
            ],
                attributes: ['id','ownerId', 'address', 'city', 'state', 'country', 'lat','lng', 'name', 'description', 'price', [Sequelize.col('SpotImages.url'), 'previewImage']
                //[Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgRating']
            ] })
    
            
        

        const starsArr = associatedSpots.map(spot => {
            console.log(spot) 
            return spot.Reviews.map(review => review.stars)})
        //console.log(starsArr)
        
        
        const avgStars = starsArr.map(stars => {
            let avg
            const sum = stars.reduce((total, star) => total + star, 0)
            avg = sum / stars.length
          //  console.log(avg)
            return avg
        })
        
        const spotsWithKeys = associatedSpots.map((spot, index) => {
            spot.Reviews = spot.avgRating 
            delete spot.Reviews
            return {
                ...spot.toJSON(),
                avgRating: avgStars[index],
                Reviews: undefined
        
        
        } 
        
        
        
    })
            
    
        res.status(200).json({Spots: spotsWithKeys})

})


// get spots by :spotId

router.get('/:spotId', async (req, res, next) => {
    let spotId = req.params.spotId

        const spot = await Spot.findByPk(spotId, {
            include: [
                { model: SpotImage, attributes: ['id', 'url', 'previewImg'] },
                { model: User, attributes: ['id', 'firstName', 'lastName']},
                { model: Review }
            ]
        })
        if (!spot) {
            
            res.status(404).json({message: "Spot couldn't be found", statusCode: 404})
    
        }

        const starsArr = spot.Reviews.map(reviews=> reviews.stars)

        const avg = starsArr.reduce((total, stars) => total + stars, 0) / starsArr.length
        
        
        res.json({
                id: spot.id,
                ownerId:spot.ownerId,
                address: spot.address,
                city: spot.city,
                state: spot.state,
                country: spot.country,
                lat: spot.lat,
                lng: spot.lng,
                name: spot.name,
                description: spot.description,
                price: spot.price,
                createdAt: spot.createdAt,
                updatedAt: spot.updatedAt,
                numReviews: spot.Reviews.length,
                avgStarRating: avg, 
                SpotImages: spot.SpotImages, 
                Owner: spot.User,
            })
})

// edit a spot
router.put('/:spotId', async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)
    if(!spot) {
        res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    const userId = req.user.id
    if(spot.ownerId !== userId) {
        res.status(400).json({
            message: 'not authorized to edit'
        })
    }
    const {
        address, city, state, country, lat, lng, name, description, price
    } = req.body;

    if (!address || !city || !state || !country || !lat || !lng || !name || !description || !price) {
        return res.status(400).json({ 
            "message": "Validation Error",
            "statusCode": 400,
            "errors": {
                "address": "Street address is required",
                "city": "City is required",
                "state": "State is required",
                "country": "Country is required",
                "lat": "Latitude is not valid",
                "lng": "Longitude is not valid",
                "name": "Name must be less than 50 characters",
                "description": "Description is required",
                "price": "Price per day is required"
            }
        });
    }

    const updatedSpot = await spot.update({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
    });

    return res.json({
        updatedSpot
    })
})

// create an image for a spot by id
router.post('/:spotId/images', async (req, res, next) => {
    const userId = req.user.id
    
    const { url, previewImg } = req.body

    const spot = await Spot.findByPk(req.params.spotId)

    if(!spot) {
        res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    if(userId !== spot.ownerId) {
        res.status(400).json({
            message: 'user not authorized'
        })
        
    } 
    
    
    const spotId = parseInt(req.params.spotId, 10)

    const newImage = await SpotImage.create({
        spotId: spotId,
        url: url,
        previewImg: previewImg
    })

    res.json({
        id: newImage.id,
        url: newImage.url,
        previewImg: newImage.previewImg
    })
})



// delete a spot
router.delete('/:spotId', async (req, res, next) => {
    const userId = req.user.id
    const spotId = parseInt(req.params.spotId, 10)
    
    
    
    const spot = await Spot.findByPk(spotId, {where: {ownerId: userId}})
    if(!spot) res.status(404).json({
        "message": "Spot couldn't be found",
        "statusCode": 404
    })
    if(spot.ownerId !== req.user.id) {
        res.status(400).json({
            message: 'user not authorized',
            statusCode: 400
        })
    }
    
    

    await spot.destroy()

    res.status(200).json({
        message: 'Successfully deleted',
        statusCode: 200
    })
})
const validateLogin = [
    check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
    check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
    handleValidationErrors
    ];


    router.post('/:spotId/reviews', validateLogin, async (req, res, next) => {})




module.exports = router