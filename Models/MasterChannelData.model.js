const mongoose = require('mongoose')
const MasterChannelDataSchema = new mongoose.Schema({

    source: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('MasterChannelData', MasterChannelDataSchema)