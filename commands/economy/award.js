const {
	Command
} = require('discord.js-commando');
const fs = require('fs');
const path = require('path');
const index = require('../../index.js');

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'award',
			group: 'economy',
			memberName: 'award',
			description: 'Awards you you with the MangoCredits.',
			examples: ['award @djmango#8778 50'],
			args: [{
				key: 'text',
				prompt: 'Who would you like the credits to go to, and how many?',
				type: 'string'
			}]
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
