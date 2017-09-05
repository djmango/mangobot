const {
	Command
} = require('discord.js-commando');
const fs = require('fs');
const index = require('../../index.js');

function isBotAdmin(msg) {
	//check if messsage author is bot controller
	//author = message.member
	var adminTemp = fs.readFileSync('./botAdmins.json');
	if (msg.author.id == 193066810470301696 || adminTemp[msg.author.id]) {
		return true;
	} else {
		return false;
	}
}

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'say',
			group: 'general',
			memberName: 'say',
			description: 'Replies with the text you provide.',
			examples: ['say Hi there!'],
			args: [{
				key: 'text',
				prompt: 'What text would you like the bot to say?',
				type: 'string'
			}]
		});
	}
	run(msg, args) {
		const {
			text
		} = args;
		if (index.isBotAdmin(msg) == false) return msg.say('you are not a bot admin');
		msg.delete();
		return msg.say(`\u180E${text}`);
	}
};
