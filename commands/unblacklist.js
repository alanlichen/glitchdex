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
		/*
    if (client.ids.includes(usrId)) {
      return message.channel.send(
        new MessageEmbed()
          .setTitle('Man, do you really think you can do that to others?')
          .setDescription(`How would you feel if someone did it to you?`)
          .setColor('RANDOM')
      )
    }
    */
		await client.firebase.removeBlacklist(usrId);
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
