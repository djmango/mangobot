const {
	Command
} = require('discord.js-commando');

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'strike',
			group: 'admin',
			memberName: 'strike',
			description: 'Strikes the user.',
			examples: ['strike @mangobot'],
			args: [{
				key: 'text',
				prompt: 'Who would you like to strike?',
				type: 'string'
			}]
		});
	}
	async run(msg, args) {
		const {
			text
		} = args;
		let strikeTemp = JSON.parse(fs.readFileSync('./data/strikes.json'));
		let message = msg.content.split(" "); //take each argument
		let mentions = msg.mentions.users.array()[0]
		if (!mentions) return msg.reply('you must mention someone or not add any extra arguments!')
		isBotAdmin(msg)
		if (isAdminGlobal == false) return msg.reply('You are not a bot admin.');
		else {
			if (!strikeTemp[mentions.id]) { //add user to strike
				strikeTemp[mentions.id] = 1
			} else {
				strikeTemp[mentions.id] = strikeTemp[mentions.id] + 1
			}
			fs.writeFileSync('./data/strikes.json', JSON.stringify(strikeTemp));
			return msg.say(`${mentions.username} has been striked by ${msg.author.username}! This puts them at ${strikeTemp[mentions.id]} strikes!`);
		}
	}
};
