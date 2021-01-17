const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    userID: String,
    blacklisted: Boolean,
})

module.exports = mongoose.model('blacklistSchema', schema)