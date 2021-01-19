const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    id: String,
    blacklisted: Boolean,
})

module.exports = mongoose.model('blacklistSchema', schema)
