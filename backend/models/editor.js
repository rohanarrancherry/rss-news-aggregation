const mongoose = require('mongoose')
const ROLE = ["editor", "user"];
const editorSchema = new mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:ROLE,
        required:true,
        default:'user'
    }

})

module.exports = mongoose.model('Editor',editorSchema)