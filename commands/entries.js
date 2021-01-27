module.exports = {
  name: 'entries',
  category: 'Admin',
  execute(client, message, args, MessageEmbed) {
    (async () => {
      // const entries = await client.db.list()
      const entries = await client.mongo.entries.getAllEntries();
      let fields = [];
      let i=0
      entries.forEach(v => {
        i++
        fields.push({ name: i + '.', value: `[${v.name}](https://glitchdex.tk/entry?user=${v.name})`, inline: true })
      });
      const e = new MessageEmbed()
        .setTitle('Entries:')
        .setColor('RANDOM')
        .addFields(fields);
      message.channel.send(e)
    })();
  }
}