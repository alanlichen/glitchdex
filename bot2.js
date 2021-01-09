const { Client, MessageEmbed, Collection } = require('discord.js');
const client = new Client();
const fs = require('fs');
const Database = require('@replit/database');
const Canvas = require('canvas');
const db = new Database();
const Keyv = require('keyv');
const db2 = new Keyv('sqlite://db.sqlite');
const db3 = new Keyv('sqlite://blacklist.sqlite');
client.db = db;
client.db2 = db2;
client.db3 = db3;
client.firebase = require('./database/db');

client.commands = new Collection();
const bot = client;
const commands = fs
	.readdirSync('./commands')
	.filter(file => file.endsWith('.js'));
for (const file of commands) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const ids = [
	'741090611842646139',
	'231628302152892427',
	'220663962616856576',
	'564164277251080208',
	'513864836279697411',
	'691576874261807134',
	'552086437437374479'
];
/*client.ids = ids;*/
const blacklist = [];

client.on('ready', async () => {
	console.log(`logged in as ${client.user.tag}`);
	client.user.setStatus('online');
	client.user.setActivity('glitchdex.tk', { type: 'LISTENING' });
	let entries = db.list().then(e => {
   return e.length + ' entries'
   });
 function getActivity() {
	let myStatuses = [entries(), 'glitchdex.tk'];
		let randomStatus =
			myStatuses[Math.floor(Math.random() * myStatuses.length)];
		return '' + randomStatus + '';
	}
});

client.on('message', async message => {
	const allUsrs = client.users.cache.array();
	/*for (const user of allUsrs) {
    await db3.set(user.id, false)
  }*/
	if (!message.content.startsWith(process.env.prefix))
		return;
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
	const blacklisted = await db3.get(message.author.id);
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
		message.reply(
			'There was an issue executing that command! Please make sure you are using the command properly, then contact the owner of the bot.'
		);
	}
});
const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');
	let fontSize = 70;

	do {
		ctx.font = `${(fontSize -= 10)}px sans-serif`;
	} while (ctx.measureText(text).width > canvas.width - 300);

	return ctx.font;
};
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
client.on('guildMemberAdd', async member => {
	const channel = member.guild.channels.cache.find(ch => ch.name === 'general');
	if (!channel) return;

	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('./wallpaper.jpg');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	ctx.font = '28px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText(
		'Welcome to the server,',
		canvas.width / 2.5,
		canvas.height / 3.5
	);

	ctx.font = applyText(canvas, `${member.displayName}!`);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(
		`${member.displayName}!`,
		canvas.width / 2.5,
		canvas.height / 1.8
	);

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const avatar = await Canvas.loadImage(
		member.user.displayAvatarURL({ format: 'jpg' })
	);
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = (canvas.toBuffer(), 'welcome-image.png');

	channel.send(`Welcome to the server, ${member}!`, attachment);
});
client.login(process.env.discord_token);
