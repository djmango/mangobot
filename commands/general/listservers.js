const {
	Command
} = require('discord.js-commando');

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'listservers',
			group: 'general',
			memberName: 'listservers',
			description: 'Lists all servers that mango bot is currently in.',
			examples: ['listservers']
		});
	}
	async run(msg) {
		return msg.say(servers);
	}
};
