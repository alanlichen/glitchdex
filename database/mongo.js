const mongoose = require('mongoose');
const entrySchema = require('./schema/entrySchema');
const linkSchema = require('./schema/linkSchema');
const blacklistSchema = require('./schema/blacklistSchema');

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
		},
		async addBlacklist(id) {
			const res = await blacklistSchema.findOneAndUpdate(
				{
					id: id
				},
				{
					id: id,
					blacklisted: true
				},
				{
					upsert: true
				}
			)
			return res;
		},
		async checkBlacklist(id) {
			const res = await blacklistSchema.findOne({ id: id });
			if (!res) {
                return false
			} else {
				const blacklisted = res.blacklisted
				return blacklisted
			}
		},
		async removeBlacklist(id) {
			const res = await blacklistSchema.findOneAndUpdate(
				{
					id: id
				},
				{
					id: id,
					blacklisted: false
				},
				{
					upsert: true
				}
			)
			return res;
		}
	}
};
