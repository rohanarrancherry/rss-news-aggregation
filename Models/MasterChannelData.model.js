const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const MasterChannelDataSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    tags:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    }

})

module.exports = mongoose.model('MasterChannelData',MasterChannelDataSchema)