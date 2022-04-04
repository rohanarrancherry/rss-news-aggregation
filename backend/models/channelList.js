const mongoose = require('mongoose')

const channelDetailSchema = new mongoose.Schema({
    
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

module.exports = mongoose.model('ChannelDetails',channelDetailSchema)