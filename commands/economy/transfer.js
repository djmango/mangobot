const {
	Command
} = require('discord.js-commando');

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'transfer',
			group: 'economy',
			memberName: 'transfer',
			description: 'Transfers MangoCredits from your accoutn to someone else\'s.',
			examples: ['transfer @djmango$8778 50']
		});
	}
	async run(msg) {
		let message = msg.content.split(" "); //take each argument
		//TODO: make sure that edge cases are handled, no negatives, spoofing
	}
};
