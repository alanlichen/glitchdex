module.exports = {
	name: 'whoisboss',
	category: 'Admin',
	execute(client, message, args, MessageEmbed) {
		message.channel.send(
			new MessageEmbed()
				.setColor('RANDOM')
				.addField('the boss is ', `<@564164277251080208>`, true)
		);
	}
};
