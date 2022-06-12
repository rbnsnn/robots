//Routing dla strony wyniki

const express = require('express');
const { getWyniki, getWynikiGeneruj } = require('../controllers/wynikiController')
const router = express.Router();

router.get('/', getWyniki);
router.post('/generuj', getWynikiGeneruj)

module.exports = router;