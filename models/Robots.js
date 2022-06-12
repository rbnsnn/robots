const mongoose = require('mongoose')

//Schema z konfiguracją generowania robotów i z wartościami domyślnymi
const dataSchema = mongoose.Schema({
    productionTimeMax: { type: Number, default: 100 },
    productionTimeMin: { type: Number, default: 1 },
    producedPartsMax: { type: Number, default: 100 },
    producedPartsMin: { type: Number, default: 1 },
})

module.exports = mongoose.model('robots', dataSchema)