const {
	Command
} = require('discord.js-commando');
const {
	RichEmbed
} = require('discord.js');

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'guild',
			group: 'general',
			memberName: 'guild',
			description: 'Lists properties of the current guild.',
			examples: ['guild']
		});
	}
	async run(msg) {
		if (!msg.guild) return msg.reply('This is not a guild!');
		let embed = new RichEmbed()
			.setAuthor('MangoBot')
			.setDescription('Server info:', msg.guild.iconURL)
			.setColor("ffa735")
			.addField("Server name:", `${msg.guild.name}`)
			.addField("Created at :clock4: :", `${msg.guild.createdAt}`)
			.addField("Owner:", `${msg.guild.owner.user.username}`)
			.addField("Member Count:", `${msg.guild.memberCount}`)
			.addField("Channel Count:", `${msg.guild.channels.array().length}`)
			.addField("Region:", `${msg.guild.region}`)
			.addField("Online Count:", `${msg.guild.presences.array().length}/${msg.guild.memberCount}`)
		return msg.replyEmbed(embed)
	}
};
