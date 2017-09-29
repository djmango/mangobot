const {
	Command
} = require('discord.js-commando');
const fs = require('fs');

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'volume',
			group: 'music',
			memberName: 'volume',
			description: 'Adjusts volume for audio playback.',
			examples: ['volume 20'],
		});
	}
	run(msg) {
		return;
	}
};
