const express = require('express');
const router = express.Router();
const Form = require('../models/Form')
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

    const effectivity = (req.params.producedParts / req.params.productionTime).toFixed(4)

    const editData = {
        id: req.params.id,
        productionTime: req.params.productionTime,
        producedParts: req.params.producedParts,
        effectivity
    }

    await Form.findOneAndReplace({ id: req.params.id }, editData)

    if (isCollectionEmpty) {
        const data = await Form.find({}).lean()
        const selectedElement = await Form.find({ id: req.params.id }).lean()

        res.render('layouts/modyfikacja', { layout: 'index', data, selectedElement })
    } else {
        res.render('layouts/modyfikacja', { layout: 'index', emptyRecords: true })
    }
})

module.exports = router;