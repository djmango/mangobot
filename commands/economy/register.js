const {
	Command
} = require('discord.js-commando');

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'register',
			group: 'economy',
			memberName: 'register',
			description: 'Registers you with the MangoBank.',
			examples: ['register'],
		});
	}
	async run(msg) {
		db.exec(`select * from economy where userId=${msg.author.id}`, function (error, results, fields) {
			if (error) console.log(error);
			else if (!results[0]) { //if the user is not already in the list
				db.exec(`insert into economy (userId, username, value, lastRedeem)
						values (${msg.author.id}, '${msg.author.username}', 50, ${Date.now()})`, function (error, results, fields) {
						return msg.reply(`Succesfully registered ${msg.author.username} with MangoBank! You have been given 50 MangoCredits for registering.`);
					})
			} else { //if the user is already in the list
				return msg.reply(`${msg.author.username} is already registered with MangoBank!`);
			}
		})
	}
};
