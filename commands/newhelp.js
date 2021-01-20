const commands = require('./../help');
const cmds = require('./../commands');

module.exports = {
	name: 'help',
	category: 'Public',
	execute(client, message, args, MessageEmbed) {
		let embed = new MessageEmbed()
			.setTitle('HELP MENU')
			.setColor('RANDOM')
			.setFooter(
				`${process.env.prefix}help <category> <command>`,
				message.author.displayAvatarURL()
			)
			.setThumbnail(client.user.displayAvatarURL());
		if (!args[0]) {
			const cat = [];
			cmds.categories.forEach(v => {
				cat.push({ name: v.title, value: v.desc });
			});
			embed.addFields(cat);
		} else {
			if (args[0]) {
				if (args[1]) {
					if (
						Object.keys(commands).includes(args[1].toLowerCase()) ||
						Object.keys(commands)
							.map(c => commands[c].aliases || [])
							.flat()
							.includes(args[1].toLowerCase())
					) {
						let command = Object.keys(commands).includes(args[1].toLowerCase())
							? args[1].toLowerCase()
							: Object.keys(commands).find(
									c =>
										commands[c].aliases &&
										commands[c].aliases.includes(args[1].toLowerCase())
							  );
						if (commands[command].category === args[0]) {
							embed.setTitle(`COMMAND - ${command}`);

							if (commands[command].aliases) {
								embed.addField(
									'Command aliases',
									`\`${commands[command].aliases.join('`, `')}\``
								);
							}
							embed
								.addField('DESCRIPTION', commands[command].description)
								.addField('CATEGORY', commands[command].category)
								.addField('USER COOLDOWN', commands[command].usercooldown)
								.addField('GUILD COOLDOWN', commands[command].guildcooldown)
								.addField(
									'FORMAT',
									`\`\`\`${process.env.prefix}${commands[command].format}\`\`\``
								);
						} else {
							embed
								.setColor('RED')
								.setDescription(
									'This command does not exist in the category you specified.'
								);
						}
					} else {
						embed
							.setColor('RED')
							.setDescription('This command does not exist.');
					}
				} else {
					const cmdInCat = cmds.cmds.filter(name =>
						name.category.includes(args[0])
					);
					const cmdToAdd = [];
					cmdInCat.forEach(c => {
						cmdToAdd.push({ name: c.name, value: c.description, inline: true });
					});
					if (!Array.isArray(cmdToAdd) || !cmdToAdd.length) {
						console.log('e');
						embed
							.setColor('RED')
							.setDescription('This category does not exist.');
					} else {
						embed.addFields(cmdToAdd);
					}
				}
			} else {
				embed
					.setColor('RED')
					.setDescription(
						'This category does not exist. Please use the help command without specifying any categories to list them all.'
					);
			}
		}
		message.channel.send(embed);
	}
};
