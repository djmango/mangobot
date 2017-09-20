const {
	Command
} = require('discord.js-commando');
const fs = require('fs');
const index = require('../../index.js');

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'op',
			group: 'admin',
			memberName: 'op',
			description: 'Adds designated user to the admin list.',
			examples: ['op @djmango'],
			args: [{
				key: 'text',
				prompt: 'Who would you like to add to the admin list?',
				type: 'string'
			}]
		});
	}
	run(msg, args) {
		const {
			text
		} = args;
		let adminList = JSON.parse(fs.readFileSync('./data/botAdmins.json'));
		let message = msg.content.split(" ");
		let mentions = msg.mentions.users.array()[0]
		if (index.isBotAdmin(msg) == false) return msg.reply('You are not a bot admin.');
		if (adminList[mentions.username]) return msg.reply(`${mentions.username} is already an admin!`);
		adminList[mentions.username] = mentions.id
		fs.writeFileSync('./data/botAdmins.json', JSON.stringify(adminList)), (err) => {
			if (err) throw err;
		}
		return msg.reply(`Succesfully added ${mentions.username} to the admin list!`);
	}
};
