module.exports = {
  name: 'selfentry',
  category: 'Public',
  execute(client, message, args, MessageEmbed) {
    if (message.mentions.users.first()) {
      client.db2.get(message.mentions.users.first().id).then(v => {
        if (v === undefined || v === null) {
          return message.channel.send(
            new MessageEmbed()
              .setTitle('No entry found!')
              .setColor('RANDOM')
          )
        } else {
          client.db.get(v).then(entry => {
            if (entry === undefined || entry === null) {
              return message.channel.send(
                new MessageEmbed()
                  .setTitle('No entry found!')
                  .setColor('RANDOM')
              )
            }
            message.channel.send(
              new MessageEmbed()
                .setTitle(`${message.mentions.users.first().tag}'s entry: `)
                .setDescription(entry)
                .setColor('RANDOM')
            )
          })
        }
      })
    } else {
      client.db2.get(message.author.id).then(v => {
        if (v === undefined || v === null) {
          return message.channel.send(
            new MessageEmbed()
              .setTitle('No entry found!')
              .setColor('RANDOM')
          )
        } else {
          client.db.get(v).then(entry => {
            if (entry === undefined || entry === null) {
              return message.channel.send(
                new MessageEmbed()
                  .setTitle('No entry found!')
                  .setColor('RANDOM')
              )
            }
            message.channel.send(
              new MessageEmbed()
                .setTitle(`${message.author.tag}'s entry: `)
                .setDescription(entry)
                .setColor('RANDOM')
            )
          })
        }
      })
    }
  }
}