module.exports = {
  name: 'guilds',
  category: 'Public',
  execute(client, message, args, MessageEmbed) {
    message.channel.send(
      new MessageEmbed()
        .setTitle('Guild count:')
        .setDescription(`I currently am in ${client.guilds.cache.size} guilds!`)
        .setFooter(`Requested by: ${message.member ? message.member.displayName : message.author.username}`, message.author.displayAvatarURL())
        .setColor('RANDOM')
    )
  }
}