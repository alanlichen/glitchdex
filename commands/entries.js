module.exports = {
  name: 'entries',
  category: 'Admin',
  execute(client, message, args, MessageEmbed) {
    (async () => {
      const entries = await client.db.list()
      let fields = [];
      let i=0
      entries.forEach(v => {
        i++
        fields.push({ name: i + '.', value: `[${v}](https://glitchdex.tk/entry?user=${v})`, inline: true })
      });
      const e = new MessageEmbed()
        .setTitle('Entries:')
        .setColor('RANDOM')
        .addFields(fields);
      message.channel.send(e)
    })();
  }
}