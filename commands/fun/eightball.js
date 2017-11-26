const commando = require("discord.js-commando")
const fs = require("fs");

class eightball extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'eightball',
			group: 'fun',
			memberName: 'eightball',
			description: 'Ask a question to the MAGIC eightball. It will answer.',
			args: [{
				key: 'text',
				prompt: 'Ask a question to the magic eightball!',
				type: 'string'
			}]
		});
	}
	async run(msg, args) {
		let messages = new Array();
		messages[0] = "No";
		messages[1] = "Not today";
		messages[2] = "It is decidedly so";
		messages[3] = "Without a doubt";
		messages[4] = "Yes definitely";
		messages[5] = "You may rely on it";
		messages[6] = "As I see it yes";
		messages[7] = "Most likely";
		messages[8] = "Outlook good";
		messages[10] = "Signs point to yes";
		messages[11] = "Reply hazy try again";
		messages[12] = "Ask again later";
		messages[13] = "Better not tell you now";
		messages[14] = "Cannot predict now";
		messages[15] = "Concentrate and ask again";
		messages[16] = "Don't count on it";
		messages[17] = "My reply is no";
		messages[18] = "My sources say no";
		messages[19] = "Outlook not so good";
		messages[20] = "Very doubtful";
		let randomnumber = Math.floor(Math.random() * 21);
		return msg.reply(messages[randomnumber]);
	}
}

module.exports = eightball;
