const {
	Command
} = require('discord.js-commando');
const fs = require('fs');

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'balance',
			group: 'economy',
			memberName: 'balance',
			description: 'Shows your MangoBank balance.',
			examples: ['balance'],
		});
	}
	run(msg) {
		let economy = JSON.parse(fs.readFileSync('./data/economy.json'));
		if (!economy[msg.author.id]) {
			return msg.say('you have not registred with MangoBank! do this with \`~register.\`')
		}
		return msg.say(`you have \u180E${economy[msg.author.id]} MangoCredits!`);
	}
};
