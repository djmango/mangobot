const {
	Command
} = require('discord.js-commando');
const {
	RichEmbed
} = require('discord.js');

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'info',
			group: 'general',
			memberName: 'info',
			description: 'Displays bot info.',
			examples: ['info'],
		});
	}
	async run(msg, client) {
		var uptime = format((process.hrtime()[0] - startTime[0]) * 1000);
		var memory = (Math.round(1 * os.freemem()) / 1000000 + "/" + Math.round(1 * os.totalmem()) / 1000000);
		var cpu = (os.cpus()[0].model);
		var cpuUse = ("1 min: " + os.loadavg()[0] + "5 min: " + os.loadavg()[1] + "15 min: " + os.loadavg()[2])

		let embed = new RichEmbed()
			.setAuthor('MangoBot')
			.setDescription(msg.author.username, msg.author.displayAvatarURL)
			.setColor("ffa735")
			.addField("Bot Uptime :clock4:", `${uptime}`)
			.addField("Server Uptime :clock12:", `${format(os.uptime() * 1000)}`)
			.addField("CPU", `${cpu}`)
			.addField("Cores", `${os.cpus().length}`)
			.addField("Memory (mb)", `${memory}`)
			.addField("OS", `ubuntu server 16.04 lts 64bit`)
		return msg.replyEmbed(embed)
	}
};
