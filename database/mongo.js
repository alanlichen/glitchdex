const mongoose = require('mongoose');
const entrySchema = require('./schema/entrySchema');
const linkSchema = require('./schema/linkSchema');
module.exports = {
	blacklistSchema: require('./schema/blacklistSchema'),
	entrySchema: require('./schema/entrySchema'),
	linkSchema: require('./schema/linkSchema'),
	async connect(uri) {
		await mongoose.connect(
			uri,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false
			}
		);
		console.log('Connected to database!');
	},
	entries: {
		async addEntry(name, content) {
			const res = await entrySchema.findOneAndUpdate(
				{ name: name },
				{
					name: name,
					value: content
				},
				{ upsert: true }
			);
			return res;
		},
		async getEntry(name) {
			const res = await entrySchema.find({ name: name });
			return res;
		},
        async getOneEntry(name) {
			const res = await entrySchema.findOne({ name: name });
			return res;
        },
		async getAllEntries() {
			const data = await entrySchema.find();
			return data;
		},
		async updateEntry(name, content) {
			const res = await entrySchema.findOneAndUpdate(
				{ name: name },
				{
					name: name,
					value: content
				},
				{ upsert: true }
			);
			return res;
		},
		async removeEntry(name) {
			const res = await entrySchema.deleteOne({ name: name });
			return res;
		},
		async addLink(id, entry) {
			const res = await linkSchema.findOneAndUpdate(
				{
					id: id
				},
				{
					id: id,
					entry: entry
				},
				{ upsert: true }
			);
			return res;
		},
		async getLink(id) {
			const res = linkSchema.findOne({ id: id })
			return res
		},
		async removeLink(id) {
			const res = await linkSchema.deleteOne({ id: id })
			return res;
		}
	}
};
//what are you doing? => I am doing the link/blacklist functions, but im actually playing games rn because im bored. I just finished all the entry functions.
