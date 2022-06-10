const express = require('express');
const router = express.Router();
const Robots = require('../models/Robots')
const mongoose = require('mongoose')



router.get('/', async (req, res) => {
    const config = await Robots.findOne({}).lean()
    res.render('layouts/roboty', { layout: 'index', config })

})

router.get('/:productionTimeMax/:productionTimeMin/:producedPartsMax/:producedPartsMin', async (req, res) => {
    const productionTimeMax = Number(req.params.productionTimeMax)
    const productionTimeMin = Number(req.params.productionTimeMin)
    const producedPartsMax = Number(req.params.producedPartsMax)
    const producedPartsMin = Number(req.params.producedPartsMin)

    const oldConfig = await Robots.findOne({}).lean()
    const config = {
        productionTimeMax,
        productionTimeMin,
        producedPartsMax,
        producedPartsMin
    }
    if (productionTimeMax === oldConfig.productionTimeMax && productionTimeMin === oldConfig.productionTimeMin && producedPartsMax === oldConfig.producedPartsMax && producedPartsMin === oldConfig.producedPartsMin) {
        res.render('layouts/roboty', { layout: 'index', config: oldConfig, noChanges: true })
    } else if (productionTimeMin > productionTimeMax || producedPartsMin > producedPartsMax) {
        res.render('layouts/roboty', { layout: 'index', config: oldConfig, editError: true })
    } else if (productionTimeMax <= 0 || productionTimeMin <= 0 || producedPartsMax <= 0 || producedPartsMin <= 0) {
        res.render('layouts/roboty', { layout: 'index', config: oldConfig, valueError: true })
    } else {

        const newConfig = await Robots.findOneAndUpdate({ id: req.params.id }, config).lean()
        res.render('layouts/roboty', { layout: 'index', config, edited: true })
    }
})

module.exports = router