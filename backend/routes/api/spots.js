const express = require('express');
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Sequelize, Op } = require('sequelize');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
// ...




// get all spots
router.get('/', async (req, res, next) => {
    const page = Number(req.query.page) || 1;
    const size = Number(req.query.size) || 20;
    const minLat = Number(req.query.minLat);
    const maxLat = Number(req.query.maxLat);
    const minLng = Number(req.query.minLng);
    const maxLng = Number(req.query.maxLng);
    const minPrice = Number(req.query.minPrice) || 0;
    const maxPrice = Number(req.query.maxPrice) || Number.MAX_SAFE_INTEGER;


    const whereClause = {
        lat : {[Op.between]: [minLat || -90, maxLat || 90] },
        lng: {[Op.between]: [minLng || -180, maxLng || 180] },
        price: {[Op.between]: [minPrice, maxPrice]}
    }
    const {count, rows} = await Spot.findAndCountAll({
        where: whereClause,
            include: [
                {
                model: SpotImage, 
                attributes: ['url']
                },
                {
                model: Review, 
                attributes: ['stars']
                }
            ],
            //     attributes: [
            //         'id',
            //         'ownerId', 
            //         'address', 
            //         'city', 
            //         'state', 
            //         'country', 
            //         'lat',
            //         'lng', 
            //         'name', 
            //         'description', 
            //         'price', 
            //         [Sequelize.col('SpotImage.url'), 'previewImage']
            // ],
            offset: (page - 1) * size,
            limit: size
        })
        console.log(rows)
            const starsArr = rows.map(spot => spot.Reviews.map(review => review.stars))
            const avgStars = starsArr.map(stars => {
            let avg
            const sum = stars.reduce((total, star) => total + star, 0)
            avg = sum / stars.length
            return avg
        })
        
        const spotsWithKeys = rows.map((spot, index) => {
            let url = spot.SpotImages[0].url
            let spotToReturn = {
                ...spot.toJSON(),
                previewImage: url,
                avgRating: avgStars[index],
                Reviews: undefined,
                SpotImages: undefined
        }
        return spotToReturn
    })
    res.status(200).json({Spots: spotsWithKeys,
    page,
    size: Math.min(size, count)    
    })
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
                attributes: [
                    'id',
                    'ownerId', 
                    'address', 
                    'city', 
                    'state', 
                    'country', 
                    'lat',
                    'lng', 
                    'name', 
                    'description', 
                    'price', 
                    [Sequelize.col('SpotImages.url'), 'previewImage']
            ]})
        const starsArr = associatedSpots.map(spot => { 
            return spot.Reviews.map(review => review.stars)})
        const avgStars = starsArr.map(stars => {
            let avg
        const sum = stars.reduce((total, star) => total + star, 0)
            avg = sum / stars.length
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
    res.status(201).json({
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

// create a review for a spot based on spotId
router.post('/:spotId/reviews', async (req, res, next) => {
        const userId = req.user.id
        const spotId = parseInt(req.params.spotId, 10)
        const { review, stars } = req.body
        const spot = await Spot.findByPk(spotId)
        if(!spot) {
            res.status(404).json({
                message: "Spot couldn't be found",
                statusCode: 404
            })
        }
        const existingReview = await Review.findOne({where: {spotId: spotId, userId: userId}})
        if(existingReview) {
            res.status(403).json({
                message: "User already has a review for this spot",
                statusCode: 403
            })
        }
        const newReview = await Review.create({
            userId,
            spotId,
            review,
            stars
        })
        res.status(201).json(newReview)
    })

// get reviews of a spot
router.get('/:spotId/reviews', async (req, res, next) => {
        const spotId = req.params.spotId
        const reviews = await Review.findAll({ where: {spotId},include: [
                {model: User, attributes: ['id', 'firstName', 'lastName']},
                {model: ReviewImage, attributes: ['id', 'url']}
            ]
        })
        if(!reviews.length) {
            return res.status(404).json({
                message: 'Spot couldnt be found',
                statusCode: 404
            })
        }
        res.status(200).json(reviews)
    })

    // create a booking
    router.post('/:spotId/bookings', async (req, res) => {
        const { startDate, endDate } = req.body;
        const spotId = parseInt(req.params.spotId, 10);
        const userId = req.user.id

        const spot = await Spot.findByPk(spotId)

        if(!spot) {
        res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404 

        }) 
        }
        if(spot.ownerId === userId) {
            res.status(403).json({
                message: "you cannot book your own spot",
                statusCode: 403
            })
        }
        const bookings = await Booking.findAll({
            where: {
                spotId,
                [Op.or]: [
                    {
                        startDate: {[Op.lte]: startDate},
                        endDate: {[Op.gte]: startDate}
                    },
                    {
                        startDate: {[Op.lte]: endDate},
                        endDate: {[Op.gte]: endDate}
                    },
                    {
                        startDate: {[Op.gte]: startDate},
                        endDate: {[Op.lte]: endDate}
                    }
                ]
            }
        });
        if(bookings.length) {
            res.status(403).json(
                {
                    "message": "Sorry, this spot is already booked for the specified dates",
                    "statusCode": 403,
                    "errors": {
                    "startDate": "Start date conflicts with an existing booking",
                    "endDate": "End date conflicts with an existing booking"
                    }
                }
                
            )
        }
        const newBooking = await Booking.create({
            spotId,
            userId,
            startDate,
            endDate
        })
        res.json(newBooking)

    })
    

    // find spots bookings with spotId

    router.get('/:spotId/bookings', async (req, res) => {
        const userId = req.user.id
        const spotId = parseInt(req.params.spotId, 10)
        const spot = await Spot.findByPk(spotId)
        if(!spot){
            res.status(404).json({
                message: "Spot couldn't be found",
                statusCode: 404
            })
        }
        if(spot.ownerId === userId){
        const ownersBookings = await Booking.findAll({where: {spotId: spotId}, include: {
            model: User, attributes: ['id', 'firstName', 'lastName']  
        }})
            return res.json({Bookings: ownersBookings})
        } else {
            const bookings = await Booking.findAll({where: {spotId: spotId}, attributes: ['spotId', 'startDate', 'endDate']})
            return res.json({Bookings: bookings})
        }
    })
module.exports = router