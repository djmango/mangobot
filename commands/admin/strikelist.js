const {
	Command
} = require('discord.js-commando');

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'strikelist',
			group: 'admin',
			memberName: 'strikelist',
			description: 'Lists all strikes.',
			examples: ['strikelist']
		});
	}
	run(msg, args) {
		const {
			text
		} = args;
		let strikeTemp = JSON.parse(fs.readFileSync('./data/strikes.json'));
		let strikeList = ""
		for (var k in strikeTemp) strikeList = strikeList + msg.guild.members.get(k).user.username + ": " + strikeTemp[k] + ", " //, console.log(client.fetchUser(k));
		// msg.guild.members.get(k).user.username
		return msg.say(`${strikeList}`);
	}
};
