const commands = require('./../help');

module.exports = {
  name: 'oldhelp',
  category: 'Public',
  execute(client, message, args, MessageEmbed) {
  let embed =  new MessageEmbed()
      .setTitle('HELP MENU')
      .setColor('RED')
      .setFooter(`Requested by: ${message.member ? message.member.displayName : message.author.username}`, message.author.displayAvatarURL())
      .setThumbnail(client.user.displayAvatarURL());
    if (!args[0])
      embed
        .setDescription(Object.keys(commands).map(command => `\`${command.padEnd(Object.keys(commands).reduce((a, b) => b.length > a.length ? b : a, '').length)}\` - ${commands[command].description}`).join('\n'));
    else {
      if (Object.keys(commands).includes(args[0].toLowerCase()) || Object.keys(commands).map(c => commands[c].aliases || []).flat().includes(args[0].toLowerCase())) {
        let command = Object.keys(commands).includes(args[0].toLowerCase())? args[0].toLowerCase() : Object.keys(commands).find(c => commands[c].aliases && commands[c].aliases.includes(args[0].toLowerCase()));
        embed
          .setTitle(`COMMAND - ${command}`)

        if (commands[command].aliases)
          embed.addField('Command aliases', `\`${commands[command].aliases.join('`, `')}\``);
        embed
          .addField('DESCRIPTION', commands[command].description)
          .addField('CATEGORY', commands[command].category)
          .addField('USER COOLDOWN', commands[command].usercooldown)
          .addField('GUILD COOLDOWN', commands[command].guildcooldown)
          .addField('FORMAT', `\`\`\`${process.env.prefix}${commands[command].format}\`\`\``);
      } else {
        embed
          .setColor('RED')
          .setDescription('This command does not exist. Please use the help command without specifying any commands to list them all.');
      }
    }
    message.channel.send(embed);
  }
}