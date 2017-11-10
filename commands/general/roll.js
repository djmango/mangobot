const {
	Command
} = require('discord.js-commando');

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'roll',
			group: 'general',
			memberName: 'roll',
			description: 'Randomly rolls a number in the range you ask for.',
			examples: ['roll 6'],
			args: [{
				key: 'text',
				prompt: 'What is the desired max integer?',
				type: 'string'
			}]
		});
	}
	async run(msg, args) {
		const {
			text
		} = args;
		let message = msg.content.split(" ");
		let maxval = parseInt(message[1]);
		if ((maxval > 10000) || (maxval < 1)) {
			return msg.reply('You cannot roll more than 10000 or less than 1!')
		}
		let min = Math.ceil(0);
		let max = Math.floor(maxval);
		return msg.channel.send(Math.floor(Math.random() * (max - min) + min));
	}
};
