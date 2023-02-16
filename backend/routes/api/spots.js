
const express = require('express');

const { Sequelize } = require('sequelize')

const { Spot, Review, SpotImage } = require('../../db/models');

const router = express.Router();





router.get('/', async (req, res, next) => {

    const spotsWithPreview = await Spot.scope('previewImage').findAll({})
    return res.json({Spots: spotsWithPreview})
})


module.exports = router