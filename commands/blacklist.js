const toMilliseconds = require('@sindresorhus/to-milliseconds');

module.exports = {
  name: 'blacklist',
  category: 'Admin',
  async execute(client, message, args, MessageEmbed) {
    let usrId;
    if (message.mentions.users.first()) {
      usrId = message.mentions.users.first().id
    } else {
      usrId = args[0]
    }
    if (!usrId) {
      return message.channel.send(
        new MessageEmbed()
          .setTitle('No user given!')
          .setDescription(`Please provide a user to blacklist.`)
          .setColor('RANDOM')
      )
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
   /*
    if (args[1]) {
      const ms = toMilliseconds({
        minutes: parseInt(args[1])
      })
      await client.firebase.set(usrId, true, ms)
    } else {
      await client.firebase.set(usrId, true)
    }
    */
    await client.firebase.entries.addBlacklist(usrId)
    message.channel.send(
      new MessageEmbed()
        .setTitle('User was blacklisted!')
        .setDescription(`The user with the id \`${usrId}\` was blacklisted from the bot.`)
        .setColor('RANDOM')
    )
  }
}