const {
	Command
} = require('discord.js-commando');
const fs = require('fs');

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'leave',
			group: 'music',
			memberName: 'leave',
			description: 'Leaves the voice channel if in one.',
			examples: ['leave'],
		});
	}
	run(msg) {
		return;
	}
};
