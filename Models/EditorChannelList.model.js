const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const User = require('./User.model')
const editorChannelListSchema = new mongoose.Schema({

    source:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    enable:{
        type:Boolean,
        required:false,
        default:true
    }

})

module.exports = mongoose.model('EditorChannelList',editorChannelListSchema)