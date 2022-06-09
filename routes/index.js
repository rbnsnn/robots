const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('layouts/main', { layout: 'index' });
});

module.exports = router;
