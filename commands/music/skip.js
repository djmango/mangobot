const {
	Command
} = require('discord.js-commando');
const fs = require('fs');

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'skip',
			group: 'music',
			memberName: 'skip',
			description: 'Skips the amount of songs you ask for.',
			examples: ['skip 2'],
		});
	}
	run(msg) {
		return;
	}
};
