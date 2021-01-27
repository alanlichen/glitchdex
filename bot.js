const { Client, MessageEmbed, Collection } = require('discord.js');
const client = new Client();
const fs = require('fs');
const Database = require('@replit/database');


client.mongo = require('./database/mongo');

const repldb = new Database();
client.repldb = repldb;

client.commands = new Collection();
const commands = fs
	.readdirSync('./commands')
	.filter(file => file.endsWith('.js'));

commands.forEach(file => {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
})

const ids = [
	'513864836279697411',
	'564164277251080208',
	'784660883573440553',
	'231628302152892427',
	'796180682984128542',
	'552815108976279563'
];
client.ids = ids;
const blacklist = [];

client.on('ready', async () => {
	console.log(`i just stolen ${client.user.tag}'s identity lmao`);
	client.mongo.connect(process.env.MONGO);
	client.user.setActivity('glitchdex.tk', { type: 'LISTENING' });
});

client.on('message', async message => {
	const allUsrs = client.users.cache.array();
	if (!message.content.startsWith(process.env.prefix)) return;
	/*

	if(message.content){
	  return message.channel.send('Glitchdex is currently down for maintenance')
	}
    */

	if (!message.content.startsWith(process.env.prefix)) return;
	if (blacklist.includes(message.author.id)) {
		return;
	}
	const args = message.content.slice(process.env.prefix.length).split(/ +/g);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;
	if (
		client.commands.get(command).category === 'Admin' &&
		!ids.includes(message.author.id)
	) {
		console.log('e');
		return message.channel.send(
			new MessageEmbed()
				.setTitle('You are not an admin!')
				.setDescription('You must be an admin to run this command.')
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
	const blacklisted = await client.mongo.entries.checkBlacklist(
		message.author.id
	);
	if (blacklisted === true) {
		return message.channel.send(
			new MessageEmbed()
				.setTitle('You are blacklisted from the bot!')
				.setDescription('You cannot run any commands while blacklisted.')
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

	try {
		client.commands.get(command).execute(client, message, args, MessageEmbed);
	} catch (error) {
		console.error(error);
		message.channel.send(new MessageEmbed().setTitle('ERROR:').setColor('RANDOM').setDescription(
			'There was an issue executing that command! Please make sure you are using the command properly, then contact the owner of the bot.'
		));
	}
});
client.on('guildCreate', async guild => {
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
	channel.send(
		new MessageEmbed()
			.setTitle('Joined Server!')
			.setColor('RANDOM')
			.addField(
				'Thanks for inviting me into your community on Discord',
				`you can enter ${process.env.prefix}help for a list of commands`,
				true
			)
	);
});
client.on('guildMemberAdd', async member => {
	let guild = member.guild;
	let guildid = guild.id;
	let guildname = guild.name;
	const channel = guild.channels.cache.find(ch => ch.name === 'welcome');
	if (!channel) return;
	channel.send(
		new MessageEmbed()
			.addField(`WE HAVE A NEW MEMBER`, `Hello, ${member}`, true)
			.addField(
				`Welcome to ${guildname}`,
				`hope you like the community`,
				true
			)
			.setColor('RANDOM')
	);
});
client.login(process.env.discord_token);
