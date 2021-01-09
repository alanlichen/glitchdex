module.exports = {
	categories: [
		{
			title: 'Public',
			desc: 'Commands that everyone can use'
		},
		{
			title: 'Admin',
			desc: 'Commands that only admins can use'
		}
	],
	cmds: [
		{
			name: 'entry',
			category: 'Public',
			description: 'Returns specified entries value.'
		},
		{
		name: 'reload',
		category: 'Admin',
		description: 'reloads all commands'
},
		{
			name: 'addentry',
			category: 'Admin',
			description: 'add entries into the Glitchdex database.'
		},
		{
			name: 'delentry',
			category: 'Admin',
			description: 'remove entries from the Glitchdex Database'
		},
		{
			name: 'guilds',
			category: 'Public',
			description: 'returns how much servers the bot is currently in'
		},
		{
			name: 'request',
			category: 'Public',
			description: 'request entry to be added'
		},
		{
			name: 'entries',
			category: 'Admin',
			description: 'returns all entries in the db'
		},
		{
			name: 'link',
			category: 'Admin',
			description: 'links entry to specified user id'
		},
		{
			name: 'unlink',
			category: 'Admin',
			description: 'unlinks user id from entry'
		},
		{
			name: 'selfentry',
			category: 'Public',
			description: "returns the entry that's linked with the users id"
		},
		{
			name: 'blacklist',
			category: 'Admin',
			description: 'Blacklist a user from the bot'
		},
		{
			name: 'unblacklist',
			category: 'Admin',
			description: "Revoke a user's blacklist from the bot"
		},
		{
			name: 'eval',
			category: 'Public',
			description: 'use cool shell commands in chat'
		},
		{
			name: 'reload',
			category: 'Admin',
			description: 'Reload ALL commands'
		}
	]
};
