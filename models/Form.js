const mongoose = require('mongoose')

//Schema dla pojedynczego robota
const dataSchema = mongoose.Schema({
    id: { type: Number },
    productionTime: { type: Number },
    producedParts: { type: Number },
    effectivity: { type: Number }

})

module.exports = mongoose.model('form', dataSchema)