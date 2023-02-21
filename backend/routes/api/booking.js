const express = require('express');
const { Spot, Review, SpotImage, User, ReviewImage, Booking} = require('../../db/models');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Sequelize, Op } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// get curr user bookings
router.get('/current', async (req, res) => {
    const userId = req.user.id
    const currBookings = await Booking.findAll({where: {
        userId: userId
    }, include: [
        {model: Spot, include: {
            model: SpotImage,
            attributes: ['url']
        }}
    ]
})
const updatedBookings = [];
for (let i = 0; i < currBookings.length; i++) {
  const booking = currBookings[i];
  const url = booking.Spot.SpotImages[0].url;
  const spot = booking.Spot;
  const updatedSpot = {
    ...spot.toJSON(),
    previewImage: url,
    SpotImages: undefined
  };
  const updatedBooking = {
    ...booking.toJSON(),
    Spot: updatedSpot
  };
  updatedBookings.push(updatedBooking);
}

res.json({ bookings: updatedBookings });
    
})



router.put('/:bookingId', async (req, res) => {
    const { startDate, endDate } = req.body;
    const bookingId = req.params.bookingId
    const userId = req.user.id

    const booking = await Booking.findByPk(bookingId)

    if(!booking) {
    res.status(404).json({
        message: "Spot couldn't be found",
        statusCode: 404 

    }) 
    }
    if(booking.userId !== userId) {
        res.status(403).json({
            message: "User not authorized",
            statusCode: 403
        })
    }
    const bookings = await Booking.findAll({
        where: {
            id: {[Op.ne]: bookingId},
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
    const updatedBooking = await Booking.update({
       where:{ bookingId},
        startDate,
        endDate
    })
    res.json(updatedBooking)

})



module.exports = router