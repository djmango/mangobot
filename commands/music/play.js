const {
	Command
} = require('discord.js-commando');
const fs = require('fs');

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'play',
			group: 'music',
			memberName: 'play',
			description: 'Searches for the provided query on YouTube.',
			examples: ['play bag raiders shooting stars'],
		});
	}
	run(msg) {
		return;
	}
};
