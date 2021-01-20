module.exports = {
	name: 'request',
	category: 'Public',
	execute(client, message, args, MessageEmbed) {
		const requestvalue = message.content
			.split(' ')
			.slice(2)
			.join(' ');
		let request = new MessageEmbed();
		if (args[0] === undefined) {
			message.reply(`you didn't specify a query to request`);
		}
		if (requestvalue.length < 1) {
			return message.reply(`you didn't specify a query to request`);
		} else {
			let guildname = message.guild.name;
			let username = message.author.tag;
			let guildid = message.guild.id;
			request
				.setTitle('Request:')
				.setColor('RANDOM')
				.setThumbnail(message.author.displayAvatarURL())
				.addField('Name:', args[0], true)
				.addField('Value:', requestvalue, true)
				.addField('Guild Name:', guildname, true)
				.addField('Guild ID:', guildid, true)
				.addField('User Name:', username, true)
				.addField('User ID:', message.author.id, true)
				.addField('Channel Name:', message.channel.name, true)
				.addField('Channel ID:', message.channel.id, true)
				.addField('Message ID:', message.id, true);
			let sentrequest = new MessageEmbed();
			sentrequest.setTitle('sent request').setColor('RANDOM');
			client.channels.cache.get('790766025254895616').send(request);
			message.channel.send(sentrequest);
		}
	}
};
