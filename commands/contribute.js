module.exports = {
	name: 'contribute',
	category: 'Public',
	execute(client, message, args, MessageEmbed) {
		message.channel.send(
			new MessageEmbed()
				.setColor('RANDOM')
				.addField(
					'Contribute via Github',
					`https://github.com/selectthegang/glitchdex`,
					true
				)
		);
	}
};
