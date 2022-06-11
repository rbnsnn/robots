const express = require('express');
const router = express.Router();
const Form = require('../models/Form')
const Robots = require('../models/Robots')
const mongoose = require('mongoose')



router.get('/', async (req, res) => {
    const isCollectionEmpty = await mongoose.connection.db.collection('forms').estimatedDocumentCount()
    const config = { productionTimeMax, productionTimeMin, producedPartsMax, producedPartsMin } = await Robots.findOne({}).lean()

    if (isCollectionEmpty) {
        const data = await Form.find({}).lean()
        res.render('layouts/modyfikacja', { layout: 'index', data });
    } else {
        res.render('layouts/modyfikacja', { layout: 'index', emptyRecords: true })
    }
})

router.get('/:id', async (req, res) => {
    const isCollectionEmpty = await mongoose.connection.db.collection('forms').estimatedDocumentCount()
    const config = { productionTimeMax, productionTimeMin, producedPartsMax, producedPartsMin } = await Robots.findOne({}).lean()

    if (isCollectionEmpty) {
        const data = await Form.find({}).lean()
        const selectedElement = await Form.find({ id: req.params.id }).lean()

        res.render('layouts/modyfikacja', { layout: 'index', data, selectedElement, config })
    } else {
        res.render('layouts/modyfikacja', { layout: 'index', emptyRecords: true })
    }
})

router.get('/:id/:productionTime/:producedParts', async (req, res) => {
    const isCollectionEmpty = await mongoose.connection.db.collection('forms').estimatedDocumentCount()

    if (isCollectionEmpty) {
        const config = { productionTimeMax, productionTimeMin, producedPartsMax, producedPartsMin } = await Robots.findOne({}).lean()
        const productionTime = Number(req.params.productionTime)
        const producedParts = Number(req.params.producedParts)
        const oldData = await Form.find({}).lean()
        const selectedElement = await Form.find({ id: req.params.id }).lean()
        const elementToCompare = await Form.findOne({ id: req.params.id }).lean()

        if (productionTime > productionTimeMax || productionTime < productionTimeMin || producedParts > producedPartsMax || producedParts < producedPartsMin) {
            res.render('layouts/modyfikacja', { layout: 'index', data: oldData, selectedElement, config, editError: true })
        } else if (elementToCompare.productionTime === productionTime && elementToCompare.producedParts === producedParts) {
            res.render('layouts/modyfikacja', { layout: 'index', data: oldData, selectedElement, config, noChanges: true })
        } else {
            const effectivity = (producedParts / productionTime).toFixed(4)
            const editData = {
                productionTime,
                producedParts,
                effectivity
            }

            await Form.findOneAndUpdate({ id: req.params.id }, editData).lean()

            const newSelectedElement = await Form.find({ id: req.params.id }).lean()
            const data = await Form.find({}).lean()

            res.render('layouts/modyfikacja', { layout: 'index', data, selectedElement: newSelectedElement, config, edited: true })
        }
    } else {
        res.render('layouts/modyfikacja', { layout: 'index', emptyRecords: true })
    }
})

module.exports = router;