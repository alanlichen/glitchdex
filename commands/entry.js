module.exports = {
	name: 'entry',
	category: 'Public',
	execute(client, message, args, MessageEmbed) {
		if (!args[0]) {
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

		client.firebase.entries.getOneEntry(args[0]).then(got => {
			if (!got) {
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
				.setThumbnail(`https://cdn.glitchdex.tk/${args[0]}.jpg`)
				.setDescription(got.value)
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
};
