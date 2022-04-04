const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const ChannelDetails = require('./channelList')
const Editor = require('./editor')
const editorChannelListSchema = new mongoose.Schema({

    editorId:{
        type:ObjectId, ref: Editor     
    },
    channelId:
      {  type:ObjectId, ref :ChannelDetails }
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