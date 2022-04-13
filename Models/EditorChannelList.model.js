const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const User = require('./User.model')
const editorChannelListSchema = new mongoose.Schema({

    editorId:{
        type:ObjectId, ref: User     
    }
    ,
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
    },
    enable:{
        type:Boolean,
        required:false,
        default:true
    }

})

module.exports = mongoose.model('EditorChannelList',editorChannelListSchema)