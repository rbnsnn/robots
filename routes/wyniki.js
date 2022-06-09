const express = require('express');
const router = express.Router();
const Form = require('../models/Form')
const mongoose = require('mongoose')

router.get('/', async (req, res) => {
    const data = await Form.find({}).lean()
    res.render('layouts/wyniki', { layout: 'index', data });
});

router.post('/generuj', async (req, res) => {

    if (req.body.amount > 0) {
        const isCollectionEmpty = await mongoose.connection.db.collection('robots').estimatedDocumentCount()

        if (isCollectionEmpty) {
            mongoose.connection.db.dropCollection('robots')
        }
        for (let i = 0; i < req.body.amount; i++) {
            const randomData = new Form({
                productionTime: Math.floor(Math.random() * (100 - 1) + 1),
                producedParts: Math.floor(Math.random() * (100 - 1) + 1),
            })
            await randomData.save()
        }
        const data = await Form.find({}).lean()
        res.render('layouts/wyniki', { layout: 'index', data })
    } else {
        const data = await Form.find({}).lean()

        res.render('layouts/wyniki', { layout: 'index', data, dataError: true })
    }
})

module.exports = router;