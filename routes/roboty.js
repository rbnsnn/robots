const express = require('express');
const { getRoboty, getRobotyWithParams } = require('../controllers/robotyController')

const router = express.Router();

router.get('/', getRoboty)
router.get('/:productionTimeMax/:productionTimeMin/:producedPartsMax/:producedPartsMin', getRobotyWithParams)

module.exports = router