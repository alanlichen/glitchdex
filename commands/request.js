module.exports = {
  name: 'request',
  category: 'Public',
  execute(client, message, args, MessageEmbed) {
    let request = new MessageEmbed();
    const requestvalue = message.content.split(" ").slice(2).join(" ");
    request.setTitle('Request:')
    .setColor('RANDOM')
    .addField('Name:', args[0], true)
    .addField("Value:", requestvalue, true)
    .addField("User ID:", message.author.id, true);
    let sentrequest = new MessageEmbed();
    sentrequest.setTitle('sent request')
    .setColor('RANDOM');
    client.channels.cache.get('790766025254895616').send(request);
    message.react('👍');
    message.channel.send(sentrequest);
  }
}