const {
	Command
} = require('discord.js-commando');
const fs = require('fs');
const index = require('../../index.js');

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'purge',
			group: 'admin',
			memberName: 'purge',
			description: 'Purges the amount of messages you ask for.',
			examples: ['purge 4'],
			args: [{
				key: 'text',
				prompt: 'How many messages would you like to purge?',
				type: 'string'
			}]
		});
	}
	run(msg, args) {
		const {
			text
		} = args;
		let message = msg.content.split(" ");
		if (index.isBotAdmin(msg) == false) return msg.say('You are not a bot admin');
		let messagecount = parseInt(message[1]);
		if (messagecount > 10000) {
			msg.reply('You cannot delete more than 10000 messages at a time!')
		}
		if (messagecount > 100) {
			messagecount = messagecount / 100;
			for (var i = 0; i < messagecount; i++) {
				msg.channel.fetchMessages({
					limit: 100
				}).then(messages => msg.channel.bulkDelete(messages))
			}
			msg.reply(`Succesfully deleted ${messagecount * 100} messages!`);
		} else {
			msg.delete();
			msg.channel.fetchMessages({
				limit: messagecount
			}).then(messages => msg.channel.bulkDelete(messages))
			msg.reply(`Succesfully deleted ${messagecount} messages!`);
		}
		return
	}
};