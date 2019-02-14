const {
	Command
} = require('discord.js-commando');

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'end',
			group: 'admin',
			memberName: 'end',
			description: 'Ends all bot functions safely.',
			examples: ['end']
		});
	}
	async run(msg) {
		if (msg.author.id == botSudoId) {
			msg.reply('going down now!').then(value => {
				process.exit()
			});
		} else {
			return msg.reply('you cant kill me! that right is reserved for djmango.');
		}
	}
};
