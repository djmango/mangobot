const {
	Command
} = require('discord.js-commando');
const fs = require('fs');

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'pause',
			group: 'music',
			memberName: 'pause',
			description: 'Pauses audio playback.',
			examples: ['pause'],
		});
	}
	run(msg) {
		return;
	}
};
