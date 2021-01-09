const { Client, MessageEmbed } = require('discord.js');
const client = new Client();
const commands = require('./help');

const Database = require('@replit/database');
const db = new Database();
const Keyv = require('keyv');
const db2 = new Keyv('sqlite://db.sqlite');

const ids = [
	'741090611842646139',
	'231628302152892427',
	'220663962616856576',
	'564164277251080208',
	'513864836279697411',
	'634860829132455937'
];
const blacklist = [];
client.on('ready', () => {
	console.log(`logged in as ${bot.user.tag}`);
	client.user.setStatus('dnd');
	client.user.setActivity('Maintenance Mode', { type: 'LISTENING' });
});

let bot = client;
client.on('message', async message => {
	if (message.author.bot) {
		return;
	}
	if (blacklist.includes(message.author.id)) {
		return;
	}
	if (!message.content.startsWith(process.env.prefix)) {
		return;
	}
	const args = message.content.slice(process.env.prefix.length).split(/ +/g);
	if (message.content.startsWith(`${process.env.prefix}unlink`)) {
		if (ids.includes(message.author.id)) {
			if (!args[1]) {
				return message.channel.send(
					new MessageEmbed()
						.setTitle('Invalid arguments!')
						.setDescription(`You did not provide a user id to unlink!`)
						.setColor('RANDOM')
				);
			}
			db2.delete(args[1]).then(() => {
				message.channel.send(
					new MessageEmbed()
						.setTitle('Entry unlinked!')
						.setDescription(
							`The entry linked with the user id: \`${
								args[1]
							}\` has been unlinked.`
						)
						.setColor('RANDOM')
				);
			});
		} else {
			return message.channel.send(
				new MessageEmbed()
					.setTitle('You are not an admin!')
					.setDescription('You must be an admin to modify entries.')
					.setFooter(
						`Requested by: ${
							message.member
								? message.member.displayName
								: message.author.username
						}`,
						message.author.displayAvatarURL()
					)
					.setColor('RANDOM')
			);
		}
	}
	if (message.content.startsWith(`${process.env.prefix}link`)) {
		if (ids.includes(message.author.id)) {
			const usrId = args[1];
			const entry = args[2];
			db2.set(usrId, entry).then(() => {
				message.channel.send(
					new MessageEmbed()
						.setTitle('Successfully linked!')
						.setDescription(
							`The user with the id \`${usrId}\` has been linked with the entry \`${entry}\``
						)
						.setColor('RANDOM')
				);
			});
		} else {
			return message.channel.send(
				new MessageEmbed()
					.setTitle('You are not an admin!')
					.setDescription('You must be an admin to modify entries.')
					.setFooter(
						`Requested by: ${
							message.member
								? message.member.displayName
								: message.author.username
						}`,
						message.author.displayAvatarURL()
					)
					.setColor('RANDOM')
			);
		}
	}
	if (message.content.startsWith(`${process.env.prefix}selfEntry`)) {
		if (message.mentions.users.first()) {
			db2.get(message.mentions.users.first().id).then(v => {
				if (v === undefined || v === null) {
					return message.channel.send(
						new MessageEmbed().setTitle('No entry found!').setColor('RANDOM')
					);
				} else {
					db.get(v).then(entry => {
						message.channel.send(
							new MessageEmbed()
								.setTitle(`${message.mentions.users.first().tag}'s entry: `)
								.setDescription(entry)
								.setColor('RANDOM')
						);
					});
				}
			});
		} else {
			db2.get(message.author.id).then(v => {
				if (v === undefined || v === null) {
					return message.channel.send(
						new MessageEmbed().setTitle('No entry found!').setColor('RANDOM')
					);
				} else {
					db.get(v).then(entry => {
						message.channel.send(
							new MessageEmbed()
								.setTitle(`${message.author.tag}'s entry: `)
								.setDescription(entry)
								.setColor('RANDOM')
						);
					});
				}
			});
		}
	}
	if (message.content.startsWith(`${process.env.prefix}entries`)) {
		if (ids.includes(message.author.id)) {
			(async () => {
				const entries = await db.list();
				let fields = [];
				let i = 0;
				entries.forEach(v => {
					i++;
					fields.push({
						name: i + '.',
						value: `[${v}](https://users.idioto.tk/view?user=${v})`,
						inline: true
					});
				});
				const e = new MessageEmbed()
					.setTitle('Entries:')
					.setColor('RANDOM')
					.addFields(fields);
				message.channel.send(e);
			})();
		} else {
			return message.channel.send(
				new MessageEmbed()
					.setTitle('You are not an admin!')
					.setDescription('You must be an admin to view all entries.')
					.setFooter(
						`Requested by: ${
							message.member
								? message.member.displayName
								: message.author.username
						}`,
						message.author.displayAvatarURL()
					)
					.setColor('RANDOM')
			);
		}
	}
	if (message.content.startsWith(`${process.env.prefix}help`)) {
		let embed = new MessageEmbed()
			.setTitle('HELP MENU')
			.setColor('RED')
			.setFooter(
				`Requested by: ${
					message.member ? message.member.displayName : message.author.username
				}`,
				message.author.displayAvatarURL()
			)
			.setThumbnail(bot.user.displayAvatarURL());
		if (!args[1])
			embed.setDescription(
				Object.keys(commands)
					.map(
						command =>
							`\`${command.padEnd(
								Object.keys(commands).reduce(
									(a, b) => (b.length > a.length ? b : a),
									''
								).length
							)}\` - ${commands[command].description}`
					)
					.join('\n')
			);
		else {
			if (
				Object.keys(commands).includes(args[1].toLowerCase()) ||
				Object.keys(commands)
					.map(c => commands[c].aliases || [])
					.flat()
					.includes(args[1].toLowerCase())
			) {
				let command = Object.keys(commands).includes(args[1].toLowerCase())
					? args[1].toLowerCase()
					: Object.keys(commands).find(
							c =>
								commands[c].aliases &&
								commands[c].aliases.includes(args[1].toLowerCase())
					  );
				embed.setTitle(`COMMAND - ${command}`);

				if (commands[command].aliases)
					embed.addField(
						'Command aliases',
						`\`${commands[command].aliases.join('`, `')}\``
					);
				embed
					.addField('DESCRIPTION', commands[command].description)
					.addField('CATEGORY', commands[command].category)
					.addField('USER COOLDOWN', commands[command].usercooldown)
					.addField('GUILD COOLDOWN', commands[command].guildcooldown)
					.addField(
						'FORMAT',
						`\`\`\`${process.env.prefix}${commands[command].format}\`\`\``
					);
			} else {
				embed
					.setColor('RED')
					.setDescription(
						'This command does not exist. Please use the help command without specifying any commands to list them all.'
					);
			}
		}
		message.channel.send(embed);
	}
	if (message.content.startsWith(`${process.env.prefix}entry`)) {
		if (!args[1]) {
			return message.channel.send(
				new MessageEmbed()
					.setTitle('Missing arguments!')
					.setDescription('You did not give me a query.')
					.setFooter(
						`Requested by: ${
							message.member
								? message.member.displayName
								: message.author.username
						}`,
						message.author.displayAvatarURL()
					)
					.setColor('RANDOM')
			);
		}

		db.get(args[1]).then(got => {
			if (got === null) {
				const embed = new MessageEmbed()
					.setTitle('That entry does not exist.')
					.setDescription('Please try again.')
					.setFooter(
						`Requested by: ${
							message.member
								? message.member.displayName
								: message.author.username
						}`,
						message.author.displayAvatarURL()
					)
					.setColor('RANDOM');
				return message.channel.send(embed);
			}
			const embed = new MessageEmbed()
				.setTitle('Results:')
				.setDescription(got)
				.setFooter(
					`Requested by: ${
						message.member
							? message.member.displayName
							: message.author.username
					}`,
					message.author.displayAvatarURL()
				)
				.setColor('RANDOM');
			message.channel.send(embed);
		});
	}
	if (message.content.startsWith(`${process.env.prefix}addEntry`)) {
		if (ids.includes(message.author.id)) {
			const name = args[1];
			const value = message.content
				.split(' ')
				.slice(2)
				.join(' ');
			db.set(args[1], '' + value + '');
			let added = new MessageEmbed()
				.setTitle('Operation complete!')
				.setDescription(
					`You can now view the entry ${name} with the command \`${
						process.env.prefix
					}entry ${name}\` or by going to https://users.idioto.tk/view?user=${name}`
				)
				.setFooter(
					`Requested by: ${
						message.member
							? message.member.displayName
							: message.author.username
					}`,
					message.author.displayAvatarURL()
				)
				.setColor('RANDOM');
			message.channel.send(added);
		} else {
			return message.channel.send(
				new MessageEmbed()
					.setTitle('You are not an admin!')
					.setDescription('You must be an admin to modify entries.')
					.setFooter(
						`Requested by: ${
							message.member
								? message.member.displayName
								: message.author.username
						}`,
						message.author.displayAvatarURL()
					)
					.setColor('RANDOM')
			);
		}
	}
	if (message.content.startsWith(`${process.env.prefix}guilds`)) {
		message.channel.send(
			new MessageEmbed()
				.setTitle('Guild count:')
				.setDescription(`I currently am in ${bot.guilds.cache.size} guilds!`)
				.setFooter(
					`Requested by: ${
						message.member
							? message.member.displayName
							: message.author.username
					}`,
					message.author.displayAvatarURL()
				)
				.setColor('RANDOM')
		);
	}
	if (message.content.startsWith(`${process.env.prefix}request`)) {
		let request = new MessageEmbed();
		const requestvalue = message.content
			.split(' ')
			.slice(2)
			.join(' ');
		request
			.setTitle('Request:')
			.setColor('RANDOM')
			.addField('Name:', args[1], true)
			.addField('Value:', requestvalue, true)
			.addField('User ID:', message.author.id, true);
		let sentrequest = new MessageEmbed();
		sentrequest.setTitle('sent request').setColor('RANDOM');
		client.channels.cache.get('790766025254895616').send(request);
		message.react('👍');
		message.channel.send(sentrequest);
	}
	if (message.content.startsWith(`${process.env.prefix}delEntry`)) {
		if (ids.includes(message.author.id)) {
			const deleted = new MessageEmbed();
			(async () => {
				await db.delete(args[1]);
				message.channel.send(
					new MessageEmbed()
						.setTitle(`Entry deleted!`)
						.setDescription(
							`Successfully deleted the entry \`${args[1]}\` from the database.`
						)
						.setFooter(
							`Requested by: ${
								message.member
									? message.member.displayName
									: message.author.username
							}`,
							message.author.displayAvatarURL()
						)
						.setColor('RANDOM')
				);
			})();
		} else {
			return message.channel.send(
				new MessageEmbed()
					.setTitle('You are not an admin!')
					.setDescription('You must be an admin to modify entries.')
					.setFooter(
						`Requested by: ${
							message.member
								? message.member.displayName
								: message.author.username
						}`,
						message.author.displayAvatarURL()
					)
					.setColor('RANDOM')
			);
		}
	}
});
bot.on('guildCreate', async guild => {
	let channelID;
	let channels = guild.channels.cache;
	channelLoop: for (let key in channels) {
		let c = channels[key];
		if (c[1].type === 'text') {
			channelID = c[0];
			break channelLoop;
		}
	}
	let channel = guild.channels.cache.get(guild.systemChannelID || channelID);
	var joined = new MessageEmbed();
	joined
		.setTitle('Joined Server!')
		.setColor('RANDOM')
		.addField(
			'Thanks for inviting me into your community on Discord',
			`you can enter ` + process.env.prefix + `help for a list of commands`,
			true
		);
	channel.send(joined);
});
client.login(process.env.discord_token);
