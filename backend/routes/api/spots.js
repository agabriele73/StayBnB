
const express = require('express');

const { Spot } = require('../../db/models');

const router = express.Router();





router.get('/', async (req, res, next) => {
    const Spots = await Spot.findAll()
    
    return res.json({ Spots: Spots})
})


module.exports = router