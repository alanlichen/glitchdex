module.exports = {
	name: 'selfentry',
	category: 'Public',
	execute(client, message, args, MessageEmbed) {
		if (message.mentions.users.first()) {
			client.firebase.entries
				.getLink(message.mentions.users.first().id)
				.then(v => {
					if (!v) {
						return message.channel.send(
							new MessageEmbed().setTitle('No entry found!').setColor('RANDOM')
						);
					} else {
						client.firebase.entries.getOneEntry(v.entry).then(entry => {
							if (!entry) {
								return message.channel.send(
									new MessageEmbed()
										.setTitle('No entry found!')
										.setColor('RANDOM')
								);
							}
							message.channel.send(
								new MessageEmbed()
									.setTitle(`${message.mentions.users.first().tag}'s entry: `)
									.setDescription(entry.value)
									.setThumbnail(`https://cdn.glitchdex.tk/${entry.name}.jpg`)
									.setColor('RANDOM')
							);
						});
					}
				});
		} else {
			client.firebase.entries.getLink(message.author.id).then(v => {
				if (!v) {
					return message.channel.send(
						new MessageEmbed().setTitle('No entry found!').setColor('RANDOM')
					);
				} else {
					client.firebase.entries.getOneEntry(v.entry).then(entry => {
						if (!entry) {
							return message.channel.send(
								new MessageEmbed()
									.setTitle('No entry found!')
									.setColor('RANDOM')
							);
						}
						console.log(entry);
						console.log('hai');
						message.channel.send(
							new MessageEmbed()
								.setTitle(`${message.author.tag}'s entry: `)
								.setThumbnail(`https://cdn.glitchdex.tk/${entry.name}.jpg`)
								.setDescription(entry.value)
								.setColor('RANDOM')
						);
					});
				}
			});
		}
	}
};
