const commando = require('discord.js-commando');

module.exports = class who extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'who',
			group: 'fun',
			memberName: 'who',
			description: 'Ask question and receive a random answer.',
			examples: ['who will get married in their lifetime?'],

			args: [{
				key: 'question',
				prompt: 'ask me a question! Don\'t be shy...',
				type: 'string'
			}]
		});
	}

	async run(message, args) {
		let mentions = msg.mentions.users.array()[0]
		if (!mentions) return msg.reply('you must mention someone or not add any extra arguments!')
		const random = message.channel.guild.members.filter(member => member.presence.status === 'online').random().user;
		return message.channel.sendMessage(`${message.author} asked: \`who ${args.question}\`: **${random.username}**#${random.discriminator}`);
	}
};
