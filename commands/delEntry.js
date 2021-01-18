module.exports = {
	name: 'delentry',
	category: 'Admin',
	execute(client, message, args, MessageEmbed) {
		(async () => {
			await client.firebase.entries.removeEntry(args[0]);
			// await client.db.delete(args[0]);
			message.channel.send(
				new MessageEmbed()
					.setTitle(`Entry deleted!`)
					.setDescription(
						`Successfully deleted the entry \`${args[0]}\` from the database.`
					)
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
		})();
	}
};
