const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('get')
    res.render('layouts/opinia', { layout: 'index' })
})

router.post('/', (req, res) => {
    res.render('layouts/opinia', { sended: true })
})

module.exports = router