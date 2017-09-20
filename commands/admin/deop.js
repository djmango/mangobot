const {
	Command
} = require('discord.js-commando');
const fs = require('fs');
const index = require('../../index.js');

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'deop',
			group: 'admin',
			memberName: 'deop',
			description: 'Removes designated user from the admin list.',
			examples: ['deop @djmango'],
			args: [{
				key: 'text',
				prompt: 'Who would you like to remove from the admin list?',
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
		if (!adminList[mentions.username]) return msg.reply(`${mentions.username} not an admin!`);
		delete adminList[mentions.username]
		fs.writeFileSync('./data/botAdmins.json', JSON.stringify(adminList)), (err) => {
			if (err) throw err;
		}
		return msg.reply(`Succesfully removed ${mentions.username} from the admin list!`);
	}
};
