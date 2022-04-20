const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const ttl = require('mongoose-ttl');
const TIME_TO_LIVE = 60 * 60 * 24 * 2 * 1000;

const FeedSchema = mongoose.Schema({
    title: {type: String, required: true, unique: true},
    link: {type: String, required: true},
    author: String,
    guid: {type: String, unique: true},
    contentSnippet: String,
    categories: [{type: String, lowercase: true}],
    isoDate: {type: Date, required: true},
    source: {type: String, required: true},
    image: {url: String, width: Number, height: Number, unit: String},
    favicon: {type: String, required: true, default: '/'}
});

FeedSchema.plugin(mongoosePaginate);
FeedSchema.plugin(ttl, {ttl: TIME_TO_LIVE});

module.exports = mongoose.model('Feed', FeedSchema);