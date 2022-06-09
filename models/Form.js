const mongoose = require('mongoose')

const dataSchema = mongoose.Schema({
    productionTime: { type: Number },
    producedParts: { type: Number }

})

module.exports = mongoose.model('Robot', dataSchema)