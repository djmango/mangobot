const {
	Command
} = require('discord.js-commando');
const fs = require('fs');
const index = require('../../index.js');

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'listop',
			group: 'admin',
			memberName: 'listop',
			description: 'Lists all users in the admin list.',
			examples: ['listop']
		});
	}
	run(msg) {
		let adminList = JSON.parse(fs.readFileSync('./data/botAdmins.json'));
		let admins = "";
		for (var k in adminList) admins = admins + k + ", ";
		return msg.channel.send(`${admins} are all admins`);
	}
};
