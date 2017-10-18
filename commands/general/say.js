const {
	Command
} = require('discord.js-commando');
const fs = require('fs');
const index = require('../../index.js');

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'say',
			group: 'general',
			memberName: 'say',
			description: 'Replies with the text you provide.',
			examples: ['speak Hi there!'],
			args: [{
				key: 'text',
				prompt: 'What text would you like the bot to say?',
				type: 'string'
			}]
		});
	}
	run(msg, args) {
		if (index.isBotAdmin(msg) == false) return msg.reply('You are not a bot admin.');
		const {
			text
		} = args;
		msg.delete();
		return msg.say(`\u180E${text}`);
	}
};
