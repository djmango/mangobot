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
		let message = msg.content.split(" ");

		if (message[1]) { //if looking for someone else
			let mentions = msg.mentions.users.array()[0]
			if (!mentions) return msg.reply('you must mention someone or not add any extra arguments!')
			mysqlConnection.query(`select * from economy where userId=${mentions.id}`, function (error, results, fields) {
				if (error) console.log(error);
				else if (!results[0]) {
					return msg.reply(`${mentions.username} has not registred with MangoBank!`)
				} else return msg.reply(`${mentions.username} has ${results[0].value} MangoCredits!`);
			})

		} else { //if message sender balance
			mysqlConnection.query(`select * from economy where userId=${msg.author.id}`, function (error, results, fields) {
				if (error) console.log(error);
				else if (!results[0]) {
					return msg.reply(`${msg.author.username} has not registred with MangoBank!`)
				} else return msg.reply(`${msg.author.username} has ${results[0].value} MangoCredits!`);
			})
		}
	}
};