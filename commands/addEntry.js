module.exports = {
	name: 'addentry',
	category: 'Admin',
	async execute(client, message, args, MessageEmbed) {
		const name = args[0];
		const value = message.content
			.split(' ')
			.slice(2)
			.join(' ');
		await client.firebase.entries.addEntry(args[0], '' + value + '');
		let added = new MessageEmbed()
			.setTitle('Operation complete!')
			.setDescription(
				`You can now view the entry ${name} with the command \`${
					process.env.prefix
				}entry ${name}\` or by going to https://glitchdex.tk/entry?user=${name}`
			)
			.setFooter(
				`Requested by: ${
					message.member ? message.member.displayName : message.author.username
				}`,
				message.author.displayAvatarURL()
			)
			.setColor('RANDOM');
		message.channel.send(added);
	}
};
