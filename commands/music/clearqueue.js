const {
	Command
} = require('discord.js-commando');
const fs = require('fs');

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'clearqueue',
			group: 'music',
			memberName: 'clearqueue',
			description: 'Clears entire queue.',
			examples: ['clearqueue'],
		});
	}
	run(msg) {
		return;
	}
};
