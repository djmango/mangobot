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
			examples: ['say Hi there!'],
			args: [{
				key: 'text',
				prompt: 'What text would you like the bot to say?',
				type: 'string'
			}]
		});
	}
	run(msg, args) {
		index.isBotAdmin(msg)
		if (isAdminGlobal == false) return msg.reply('You are not a bot admin.');
		else {
			if (msg.mentions.channels.first()) {
				msg.delete().catch(console.error);
				msg.mentions.channels.first().send(args.text.split(" ").slice(1).join(" "));
			} else {
				msg.channel.send(args.text);
				msg.delete().catch(console.error);
			}
		}
	}
};
