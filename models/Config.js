const mongoose = require('mongoose')

const dataSchema = mongoose.Schema({
    productionTimeMax: { type: Number, default: 100 },
    productionTimeMin: { type: Number, default: 1 },
    producedPartsMax: { type: Number, default: 100 },
    producedPartsMin: { type: Number, default: 1 },
})

module.exports = mongoose.model('config', dataSchema)