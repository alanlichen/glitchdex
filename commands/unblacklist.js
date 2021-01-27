module.exports = {
	name: 'unblacklist',
	category: 'Admin',
	async execute(client, message, args, MessageEmbed) {
		let usrId;
		if (message.mentions.users.first()) {
			usrId = message.mentions.users.first().id;
		} else {
			usrId = args[0];
		}
		if (!usrId) {
			return message.channel.send(
				new MessageEmbed()
					.setTitle('No user given!')
					.setDescription(`Please provide a user to unblacklist.`)
					.setColor('RANDOM')
			);
		}
		/*if (client.ids.includes(usrId)) {
			return message.channel.send(
				new MessageEmbed()
					.setTitle('You cannot unblacklist admins!')
					.setDescription(`Please be nice.`)
					.setColor('RANDOM')
			);
<<<<<<< HEAD
		}
		await client.mongo.entries.removeBlacklist(usrId);
=======
    }*/
		await client.firebase.entries.removeBlacklist(usrId);
>>>>>>> d82dce710e861d14209a159527382db76b2c5558
		message.channel.send(
			new MessageEmbed()
				.setTitle('User was unblacklisted!')
				.setDescription(
					`The user with the id \`${usrId}\` was unblacklisted from the bot.`
				)
				.setColor('RANDOM')
		);
	}
};
