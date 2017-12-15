const {
	Command
} = require('discord.js-commando');

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'smalltalk',
			group: 'ai',
			memberName: 'smalltalk',
			description: 'Replies to your statement, with added smarts:tm:.',
			examples: ['smalltalk whats up'],
			args: [{
				key: 'text',
				prompt: 'What do you want to say to me?',
				type: 'string'
			}]
		});
	}
	async run(msg, args) {
		const {
			text
		} = args;
		let message = msg.content.split(" ");
		let statement = "";
		for (var i = 1; i < message.length; i++) {
			statement = statement + message[i] + " "
		}
		var apiairequest = apiai.textRequest(statement, {
			sessionId: '3'
		});
		apiairequest.on('response', function(response) {
			msg.say(response.result.fulfillment.speech);
		});
		apiairequest.on('error', function(error) {
			console.log(error);
		});
		apiairequest.end();
		return;
	}
};
