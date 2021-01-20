const fs = require('fs');
module.exports = {
	name: 'reload',
	category: 'Admin',
	execute(client, message, args, MessageEmbed) {
		client.commands.clear();
		const commands = fs
			.readdirSync('./commands')
			.filter(file => file.endsWith('.js'));
		for (const file of commands) {
			const command = require(`./${file}`);
			client.commands.set(command.name, command);
		}
		message.channel.send(
			new MessageEmbed()
				.setTitle('Client.commands cache cleared.')
				.setDescription(
					'I have cleared the commands in the cache and readded them.'
				)
		);
	}
};
