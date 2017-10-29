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
	async run(message, args) {
		let eightBallResponses = JSON.parse(fs.readFileSync("./data/eightBallResponses.json"));
		var flip = Math.round(Math.random() * 1);
		var posArr = eightBallResponses.pos;
		var negArr = eightBallResponses.neg;

		if (flip == 0) {
			console.log("NegArr");
			message.channel.sendMessage(negArr[Math.floor(Math.random() * negArr.length)]);
		} else {
			console.log("PosArr");
			message.channel.sendMessage(posArr[Math.floor(Math.random() * posArr.length)]);
		}
	}
}

module.exports = eightball;
