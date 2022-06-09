const express = require('express');
const router = express.Router();
const Form = require('../models/Form')
const mongoose = require('mongoose')

router.get('/', async (req, res) => {
    const isCollectionEmpty = await mongoose.connection.db.collection('forms').estimatedDocumentCount()

    if (isCollectionEmpty) {
        const data = await Form.find({}).lean()
        const mostEffective = await Form.find({}).sort("-effectivity").limit(1).lean()
        res.render('layouts/wyniki', { layout: 'index', data, mostEffective });
    } else {
        res.render('layouts/wyniki', { layout: 'index', emptyRecords: true })
    }

});

router.post('/generuj', async (req, res) => {

    if (req.body.amount > 0 && req.body.amount <= 100) {
        const isCollectionEmpty = await mongoose.connection.db.collection('forms').estimatedDocumentCount()

        if (isCollectionEmpty) {
            mongoose.connection.db.dropCollection('forms')
        }
        for (let i = 0; i < req.body.amount; i++) {
            const productionTime = Math.floor(Math.random() * (100 - 1) + 1)
            const producedParts = Math.floor(Math.random() * (100 - 1) + 1)
            const effectivity = (producedParts / productionTime).toFixed(4)

            const randomData = new Form({
                id: i,
                productionTime,
                producedParts,
                effectivity
            })
            await randomData.save()
        }
        const data = await Form.find({}).lean()
        const mostEffective = await Form.find({}).sort("-effectivity").limit(1).lean()

        res.render('layouts/wyniki', { layout: 'index', data, mostEffective })
    } else {
        const data = await Form.find({}).lean()
        const mostEffective = await Form.find({}).sort("-effectivity").limit(1).lean()

        res.render('layouts/wyniki', { layout: 'index', data, mostEffective, dataError: true })
    }
})

module.exports = router;