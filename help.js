module.exports = {
	entry: {
		format: 'entry <entryname>',
		description: 'Returns specified entries value.',
		category: 'Public',
		usercooldown: '5 Seconds',
		guildcooldown: 'none'
	},
	addentry: {
		format: 'addEntry <name> <value>',
		description: 'add entries into the Glitchdex database.',
		category: 'Admin',
		usercooldown: 'none',
		guildcooldown: '10 seconds'
	},
	delentry: {
		format: 'delEntry <name>',
		description: 'remove entries from the Glitchdex Database',
		category: 'Admin',
		usercooldown: 'none',
		guildcooldown: '10 seconds'
	},
	guilds: {
		format: 'guilds',
		description: 'returns how much servers the bot is currently in',
		category: 'Public',
		usercooldown: '1 hour',
		guildcooldown: 'none'
	},
	request: {
		format: 'request <name> <value>',
		description: 'request entry to be added',
		category: 'Public',
		usercooldown: '24 hours',
		guildcooldown: 'none'
	},
	entries: {
		format: 'entries',
		description: 'returns all entries in the db',
		category: 'Admin',
		usercooldown: 'none',
		guildcooldown: 'none'
	},
	link: {
		format: 'link <userid> <entryname>',
		description: 'links entry to specified user id',
		category: 'Admin',
		usercooldown: 'none',
		guildcooldown: 'none'
	},
	unlink: {
		format: 'unlink <userid>',
		description: 'unlinks user id from entry',
		category: 'Admin',
		usercooldown: 'none',
		guildcooldown: 'none'
	},
	selfentry: {
		format: 'selfEntry',
		description: "returns the entry that's linked with the users id",
		category: 'Public',
		usercooldown: '5 Seconds',
		guildcooldown: 'none'
	},
	blacklist: {
		format: 'blacklist <userid> [time in minutes]',
		description: 'Blacklist a user from the bot',
		category: 'Admin',
		usercooldown: 'none',
		guildcooldown: 'none'
	},
	unblacklist: {
		format: 'unblacklist <userid>',
		description: "Revoke a user's blacklist from the bot",
		category: 'Admin',
		usercooldown: 'none',
		guildcooldown: 'none'
	},
	eval: {
		format: 'eval <lang> <code>',
		description: 'use cool shell commands in chat',
		category: 'Public',
		usercooldown: 'none',
		guildcooldown: 'none'
	},
	reload: {
		format: 'reload',
		description: 'Reload all commands',
		category: 'Admin',
		usercooldown: 'none',
		guildcooldown: 'none'
	},
	whoisboss: {
	  format: 'whoisboss',
	  description: 'returns who the boss is',
	  category: 'Admin',
	  usercooldown: 'none',
	  guildcooldown: 'none'
	}
};
