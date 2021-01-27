module.exports = {
  name: 'unverify',
  category: 'Admin',
  execute(client, message, args, MessageEmbed) {
    client.repldb.delete(args[0]).then(() => {
      message.channel.send(
        new MessageEmbed()
          .setTitle(args[0] + ' has been unverified')
          .setColor('RANDOM')
      )
    });
  }
};