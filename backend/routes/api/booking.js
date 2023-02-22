const express = require('express');
const { Spot, Review, SpotImage, User, ReviewImage, Booking} = require('../../db/models');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Sequelize, Op, DATE } = require('sequelize');
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


// edit a spot
router.put('/:bookingId', async (req, res) => {
    const { startDate, endDate } = req.body;
    const bookingId = req.params.bookingId
    const userId = req.user.id

    const booking = await Booking.findByPk(bookingId)

    if(!booking) {
    res.status(404).json({
        message: "Booking couldn't be found",
        statusCode: 404 

    }) 
    }
    if(booking.userId !== userId) {
       return res.status(403).json({
            message: "User not authorized",
            statusCode: 403
        })
    }
    if(new Date(endDate) < new Date(startDate)) {
        return res.status(400).json({
            message: "End date must be after start date",
            statusCode: 400
        }) 
    }
    if(new Date() > new Date(endDate)) {
        return res.status(400).json({
            message: "End date must be in the future",
            statusCode: 400
        })
    }
    const existingBooking = await Booking.findOne({
        where: {
            spotId: bookingId,
            startDate: {
                [Op.lte]: new Date(endDate),
            },
            endDate: {
                [Op.gte]: new Date(startDate)
            },
            id: {
                [Op.ne]: bookingId
            },
        },
    });
    if(existingBooking) {
        return res.status(403).json(
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
    const updatedBooking = await booking.update({
        startDate: new Date(startDate),
        endDate: new Date(endDate)
        
    })
    console.log(updatedBooking)
    res.json(updatedBooking)

})


//delete a booking

router.delete('/:bookingId', async (req, res) => {
    const bookingId = req.params.bookingId
    const userId = req.user.id

        const booking = await Booking.findByPk(bookingId, {include: Spot})
        
            if(!booking) {
                return res.status(404).json({
                    message: "Booking couldn't be found",
                    statusCode: 404
                })
            }

            if(booking.startDate <= new Date()) {
                return res.status(403).json(
                    {
                        message: "Bookings that have been started can't be deleted",
                        statusCode: 403
                    })
            }
            if(booking.userId !== userId && booking.Spot.ownerId !== userId) {
                return res.status(403).json({
                    message: "User not authorized",
                    statusCode: 403
                })
            }

            await booking.destroy()

            return res.status(200).json({
                message: "Successfully deleted",
                statusCode: 200
            })
})


module.exports = router