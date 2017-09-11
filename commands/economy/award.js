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
			examples: ['award djmango 50'],
			args: [{
				key: 'text',
				prompt: 'Who would you like the credits to go to, and how many?',
				type: 'string'
			}]
		});
	}
	run(msg, args) {
		let economy = JSON.parse(fs.readFileSync('./data/economy.json'));
		let message = msg.content.split(" "); //take each argument
		if (!economy[msg.author.id]) {
			return msg.say('You are not registered with MangoBank!')
		}
		//console.log(msg.mentions.users);
		//console.log(msg.mentions.users.get());
		//console.log(msg.guild)
		//console.log(msg.guild.members.find("user.username", message[1]))
		console.log(client.users)
		//console.log(client.users.find('name', message[1]).id)
		fs.writeFileSync('./data/economy.json', JSON.stringify(economy));
		return msg.reply(`${msg.author.username}#${msg.author.discriminator} has given ${msg.mentions.users.username}#${msg.mentions.users.discriminator}`);
	}
};
