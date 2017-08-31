const {
	Command
} = require('discord.js-commando');
const fs = require('fs');

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'register',
			group: 'economy',
			memberName: 'register',
			description: 'Registers you with the MangoBank.',
			examples: ['balance'],
		});
	}
	run(msg) {
		let economy = JSON.parse(fs.readFileSync('./data/economy.json'));
		if (!economy[msg.author.id]) {
			return msg.say('you are already registred with MangoBank!')
		}
		economy[msg.author.id] = 50;
		fs.writeFileSync('./data/economy.json', JSON.stringify(economy));
		return msg.reply(` has registered with the MangoBank! you have been given 50 MangoCredits for registering.`);
	}
};
