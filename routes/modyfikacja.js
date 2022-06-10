const express = require('express');
const router = express.Router();
const Form = require('../models/Form')
const Config = require('../models/Config')
const mongoose = require('mongoose')

router.get('/', async (req, res) => {
    const isCollectionEmpty = await mongoose.connection.db.collection('forms').estimatedDocumentCount()

    if (isCollectionEmpty) {
        const data = await Form.find({}).lean()
        res.render('layouts/modyfikacja', { layout: 'index', data });
    } else {
        res.render('layouts/modyfikacja', { layout: 'index', emptyRecords: true })
    }
})

router.get('/:id', async (req, res) => {
    const isCollectionEmpty = await mongoose.connection.db.collection('forms').estimatedDocumentCount()

    if (isCollectionEmpty) {
        const data = await Form.find({}).lean()
        const selectedElement = await Form.find({ id: req.params.id }).lean()

        res.render('layouts/modyfikacja', { layout: 'index', data, selectedElement })
    } else {
        res.render('layouts/modyfikacja', { layout: 'index', emptyRecords: true })
    }
})

router.get('/:id/:productionTime/:producedParts', async (req, res) => {
    const isCollectionEmpty = await mongoose.connection.db.collection('forms').estimatedDocumentCount()
    const { productionTimeMax, productionTimeMin, producedPartsMax, producedPartsMin } = await Config.findOne({}).lean()



    if (isCollectionEmpty) {
        const productionTime = Number(req.params.productionTime)
        const producedParts = Number(req.params.producedParts)

        if (productionTime > productionTimeMax || productionTime < productionTimeMin || producedParts > producedPartsMax || producedParts < producedPartsMin) {
            const selectedElement = await Form.find({ id: req.params.id }).lean()
            const data = await Form.find({}).lean()

            res.render('layouts/modyfikacja', { layout: 'index', data, selectedElement, editError: true })
        } else {
            const effectivity = (producedParts / productionTime).toFixed(4)
            const editData = {
                productionTime,
                producedParts,
                effectivity
            }

            await Form.findOneAndUpdate({ id: req.params.id }, editData)

            const selectedElement = await Form.find({ id: req.params.id }).lean()
            const data = await Form.find({}).lean()

            res.render('layouts/modyfikacja', { layout: 'index', data, selectedElement })
        }
    } else {
        res.render('layouts/modyfikacja', { layout: 'index', emptyRecords: true })
    }
})

module.exports = router;