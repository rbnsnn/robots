//Routing dla strony opinia

const express = require('express');
const { getOpinia, postOpinia } = require('../controllers/opiniaController')

const router = express.Router();

router.get('/', getOpinia)
router.post('/', postOpinia)

module.exports = router