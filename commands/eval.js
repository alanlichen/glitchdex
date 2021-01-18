const Eval = require('open-eval');
const ev = new Eval();
module.exports = {
	name: 'eval',
	category: 'Public',
	execute(client, message, args, MessageEmbed) {
		const lang = args[0];
		const code = message.content
			.split(' ')
			.slice(2)
			.join(' ');
		if (lang === undefined) {
			message.channel.send(
				'you must specify the language and code your wanting to test, Example: 9!eval python3 print("money")'
			);
		} else if (code === undefined) {
			message.channel.send(
				'you must specify the language and code your wanting to test, Example: 9!eval python3 print("money")'
			);
		} else {
			ev.eval(lang, code).then(data => message.channel.send(data.output));
		}
	}
};
