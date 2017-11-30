const {
	Command
} = require('discord.js-commando');

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'whois',
			group: 'utility',
			memberName: 'whois',
			description: 'Gives info on the designated user.',
			examples: ['whois @djmango$8778'],
			args: [{
				key: 'text',
				prompt: 'Who would you like to pull info on?',
				type: 'string'
			}]
		});
	}
	async run(msg, args) {
		let message = msg.content.split(" "); //take each argument
		let mentions = msg.mentions.users.array()[0]
		if (!mentions) return msg.reply('you must mention someone or not add any extra arguments!')
		var whois = args[1]
		const Discord = require('discord.js');
		let embed = new Discord.RichEmbed()
			.setAuthor(mentions.username, mentions.avatarURL)
			.setDescription(`${mentions.username}\'s info`)
			.setColor("9B59B6")
			.addField("Full Username", `${mentions.username}#${mentions.discriminator}`)
			.addField("Full ID", `${mentions.id}`)
			.addField("Joined on", mentions.createdAt)
		return msg.channel.sendEmbed(embed)
	}
};
