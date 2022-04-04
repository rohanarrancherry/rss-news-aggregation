const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const Editor = require('./editor')
const fiterSchema = new mongoose.Schema({
    
    listOfTags:[
        {
            name:{
            type:String,
            required:true
            }
        }
    ],
    userId:{
        type:ObjectId, ref: Editor
    }

})

module.exports = mongoose.model('Filter',fiterSchema)