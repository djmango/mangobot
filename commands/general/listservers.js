const {
	Command
} = require('discord.js-commando');
const fs = require('fs');
const path = require('path');
const index = require('../../index.js');

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
	run(msg) {
		return msg.say(servers);
	}
};
