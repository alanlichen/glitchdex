module.exports = {
	name: 'request',
	category: 'Public',
	execute(client, message, args, MessageEmbed) {
		let request = new MessageEmbed();
		const requestvalue = message.content
			.split(' ')
			.slice(2)
			.join(' ');
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
			.addField('Message ID:', message.id, true);
		let sentrequest = new MessageEmbed();
		sentrequest.setTitle('sent request').setColor('RANDOM');
		client.channels.cache.get('790766025254895616').send(request);
		message.react('👍');
		message.channel.send(sentrequest);
	}
};
