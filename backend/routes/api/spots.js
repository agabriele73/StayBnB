
const express = require('express');



const { Spot, Review, SpotImage } = require('../../db/models');
const { setTokenCookie } = require('../../utils/auth');

const router = express.Router();





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


router.post('/', async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body

    const createSpot = await Spot.create({
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


module.exports = router