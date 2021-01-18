module.exports = {
	name: 'unlink',
	category: 'Admin',
	execute(client, message, args, MessageEmbed) {
		if (!args[0]) {
			return message.channel.send(
				new MessageEmbed()
					.setTitle('Invalid arguments!')
					.setDescription(`You did not provide a user id to unlink!`)
					.setColor('RANDOM')
			);
		}
		client.firebase.entries.removeLink(args[0]).then(res => {
			message.channel.send(
				new MessageEmbed()
					.setTitle('Entry unlinked!')
					.setDescription(
						`The entry linked with the user id: \`${
							args[0]
						}\` has been unlinked.`
					)
					.setColor('RANDOM')
			);
		});
	}
};
