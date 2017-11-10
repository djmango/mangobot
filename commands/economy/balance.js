const {
	Command
} = require('discord.js-commando');

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'balance',
			group: 'economy',
			memberName: 'balance',
			description: 'Shows the designated user\'s MangoBank balance.',
			examples: ['balance @djmango'],
		});
	}
	async run(msg) {
		let economy = JSON.parse(fs.readFileSync('./data/economy.json'));
		let message = msg.content.split(" ");
		if (args) {
			let message = args.content.split(" ");
			let c = 1;
			for (var i = 0; i < args.length; i++) {
				message[i] = args[c]
				c++;
			}
		}
		if (message[1]) { //if looking for someone else
			let mentions = msg.mentions.users.array()[0]
			if (!mentions) return msg.reply('you must mention someone or not add any extra arguments!')
			if (!economy[mentions.id]) {
				return msg.reply(`${mentions.username} has not registred with MangoBank!`)
			}
			return msg.reply(`${mentions.username} has \`\u180E${economy[mentions.id]}\` MangoCredits!`);
		} else {
			if (!economy[msg.author.id]) {
				return msg.reply('you have not registred with MangoBank! do this with \`~register.\`')
			}
			return msg.reply(`you have \`\u180E${economy[msg.author.id]}\` MangoCredits!`);
		}
		return
	}
};
