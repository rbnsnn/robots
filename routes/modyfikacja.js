//Routing dla strony modyfikacja

const express = require('express');
const { getModyfikacja, getModyfikacjaById, getModyfikacjaByIdWithPrams } = require('../controllers/modyfikacjaController')

const router = express.Router();

router.get('/', getModyfikacja)
router.get('/:id', getModyfikacjaById)
router.get('/:id/:productionTime/:producedParts', getModyfikacjaByIdWithPrams)

module.exports = router;