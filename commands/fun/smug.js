const commando = require("discord.js-commando")
const fs = require("fs");

class smug extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'smug',
			group: 'fun',
			memberName: 'smug',
			description: 'Sends a smug face from an online database. Spooky!'
		});
	}
	async run(message, args) {
		message.delete()
			.catch(console.error);
		var imgNo = Math.floor(Math.random() * 58) + 1;
		message.channel.sendMessage("http://smug.moe/smg/" + imgNo + ".png")
	}
}

module.exports = smug;
