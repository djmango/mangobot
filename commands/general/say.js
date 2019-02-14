const {
	Command
} = require('discord.js-commando');

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
	async run(msg, args) {
		db.exec(`select * from op where userId=${msg.author.id}`, function(error, results, fields) {
			if (error) throw error;
			if (!results[0]) { //if it didnt work
				return msg.reply('You are not a bot admin.');
			}
			if (msg.author.id == botsudoid || msg.author.id == results[0].userId) { //if it did work
				if (msg.mentions.channels.first()) {
					msg.delete().catch(console.error);
					msg.mentions.channels.first().send(args.text.split(" ").slice(1).join(" "));
				} else {
					msg.channel.send(args.text);
					msg.delete().catch(console.error);
				}
			}
		})
	}
};
