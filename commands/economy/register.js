const {
	Command
} = require('discord.js-commando');

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'register',
			group: 'economy',
			memberName: 'register',
			description: 'Registers you with the MangoBank.',
			examples: ['balance'],
		});
	}
	async run(msg) {
		let economy = JSON.parse(fs.readFileSync('./data/economy.json'));
		if (economy[msg.author.id]) {
			return msg.say('you are already registred with MangoBank!')
		}
		economy[msg.author.id] = 50;
		fs.writeFileSync('./data/economy.json', JSON.stringify(economy));
		return msg.reply(`${msg.author.username} has registered with the MangoBank! you have been given 50 MangoCredits for registering.`);
	}
};
