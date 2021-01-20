const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	id: String,
	entry: String
});

module.exports = mongoose.model('linkSchema', schema);
