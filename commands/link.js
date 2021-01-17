module.exports = {
  name: 'link',
  category: 'Admin',
  execute(client, message, args, MessageEmbed) {
    const usrId = args[0];
    const entry = args[1];
    if (!usrId || !entry) {
      return message.channel.send(
        new MessageEmbed()
          .setTitle('Missing arguments!')
          .setDescription('You either did not provide a user ID or an entry. Please try again.')
          .setColor('RANDOM')
      )
    }
    client.firebase.entries.addLink(usrId, entry).then((res) => {
      message.channel.send(
        new MessageEmbed()
          .setTitle('Successfully linked!')
          .setDescription(`The user with the id \`${usrId}\` has been linked with the entry \`${entry}\``)
          .setColor('RANDOM')
      )
    });
  }
}