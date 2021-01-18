module.exports = {
	name: 'ping',
	description: 'Pinging the bot',
	execute(client, message, args, MessageEmbed) {
		message.channel.send(
			new MessageEmbed()
				.setTitle('PING:')
				.addField(
					`🏓 Latency is ${Date.now() - message.createdTimestamp}ms.`,
					`API Latency is ${Math.round(client.ws.ping)}ms`,
					true
				)
				.setColor('RANDOM')
		);
	}
};
