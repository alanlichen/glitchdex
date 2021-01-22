const Database = require("@replit/database")
const db = new Database()

module.exports = {
  name: 'verify',
  category: 'Admin',
  execute(client, message, args, MessageEmbed) {
    db.set(args[0], "true").then(() => {
      message.channel.send(
        new MessageEmbed()
          .setTitle(args[0] + ' has been verified')
          .setColor('RANDOM')
      )
    });
  }
};