const {
	Command
} = require('discord.js-commando');
const {
	RichEmbed
} = require('discord.js');

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'invite',
			group: 'general',
			memberName: 'invite',
			description: 'Displays bot invite link.',
			examples: ['invite'],
		});
	}
	async run(msg) {
		return msg.say('invite link: https://goo.gl/qoVTdx')
	}
};
