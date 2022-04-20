const mongoose = require('mongoose');

const FeedLogSchema = mongoose.Schema({
    user: {type: String, required: true},
    newsLink: {type: String, required: true},
    source: {type: String, required: true},
    timestamp: {type: String, required: true}
});

module.exports = mongoose.model("FeedLog", FeedLogSchema);