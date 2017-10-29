const {
	Command
} = require('discord.js-commando');

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'award',
			group: 'economy',
			memberName: 'award',
			description: 'Awards a user with MangoCredits (admin only).',
			examples: ['award @djmango$8778 50'],
			args: [{
				key: 'text',
				prompt: 'Who would you like the credits to go to, and how many?',
				type: 'string'
			}]
		});
	}
	run(msg, args) {
		let economy = JSON.parse(fs.readFileSync('./data/economy.json'));
		let message = msg.content.split(" "); //take each argument
		let mentions = msg.mentions.users.array()[0]
		if (!mentions) return msg.reply('you must mention someone or not add any extra arguments!')
		isBotAdmin(msg)
		if (isAdminGlobal == false) return msg.reply('You are not a bot admin.');
		else {
			if (!economy[msg.author.id]) return msg.reply('You are not registered with MangoBank!')
			if (!economy[mentions.id]) return msg.reply(`${mentions.username} is not registered with MangoBank!`)
			if (!message[2]) return msg.reply('Try again, use the correct format(~award @djmango 50)!')
			economy[mentions.id] = economy[mentions.id] + parseInt(message[2])
			fs.writeFileSync('./data/economy.json', JSON.stringify(economy));
			return msg.say(`${msg.author.username} has awarded ${mentions.username} ${message[2]} MangoCredits`);
		}
	}
};
