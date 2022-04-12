const mongoose = require('mongoose')
const Schema = mongoose.Schema
//const bcrypt = require('bcryptjs')

const ChannelSchema = new Schema({
  source_url: {
    type: String,
    required: true,
    unique: true
  },
  source: {
    type: String,
    required: true,
    unique: true
  },
  home: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  }
});

ChannelSchema.path('source_url').validate((val) => {
  urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
  return urlRegex.test(val);
}, 'Invalid URL.');

ChannelSchema.path('home').validate((val) => {
  urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
  return urlRegex.test(val);
}, 'Invalid URL.');

const Channel = mongoose.model('channels', ChannelSchema)
module.exports = Channel