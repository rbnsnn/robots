const mongoose = require('mongoose')

const dataSchema = mongoose.Schema({
    id: { type: Number },
    productionTime: { type: Number },
    producedParts: { type: Number },
    effectivity: { type: Number }

})

module.exports = mongoose.model('form', dataSchema)