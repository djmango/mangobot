const {
	Command
} = require('discord.js-commando');

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
		let logs = JSON.parse(fs.readFileSync('./data/logs.json'));
		let message = msg.content.split(" ");
		isBotAdmin(msg)
		if (isAdminGlobal == false) return msg.reply('You are not a bot admin.');
		else {
			let messagecount = parseInt(message[1]);
			if (messagecount > 10000) {
				return msg.reply('You cannot delete more than 10000 messages at a time!')
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
				let purgelog = []
				purgelog[0] = messagecount
				purgelog[1] = Date.now()
				// TODO: add log interface, more logs! also desktop app using electron
				logs[msg.author.id]["purge"] = purgelog; //log stuff
				fs.writeFileSync('./data/logs.json', JSON.stringify(logs));
				msg.reply(`Succesfully deleted ${messagecount} messages!`);
			}
			return
		}
	}
};
