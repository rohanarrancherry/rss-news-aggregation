const mongoose = require('mongoose');
// paginate
// time to live
// validator

const FeedSchema = mongoose.Schema({
    title: {type: String, required: true, unique: true}
})