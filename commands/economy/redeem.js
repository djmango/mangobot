const {
	Command
} = require('discord.js-commando');

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'redeem',
			group: 'economy',
			memberName: 'redeem',
			description: 'Redeems your daily MangoCredits.',
			examples: ['redeem'],
		});
	}
	run(msg) {
		let economy = JSON.parse(fs.readFileSync('./data/economy.json'));
		let logs = JSON.parse(fs.readFileSync('./data/logs.json'));
		//structure: id:type:data
		//current structure: id:redeem:timestamp
		if (!economy[msg.author.id]) return msg.reply('You are not registered with MangoBank!')
		if (!logs[msg.author.id]) logs[msg.author.id] = {}
		console.log(Date.now() - logs[msg.author.id]["redeem"])
		if (Date.now() - parseInt(logs[msg.author.id]["redeem"]) < 86400000) {
			return msg.reply(`you have already redeemed your daily credits. please wait ${prettyMs(parseInt((Date.now() - (logs[msg.author.id]["redeem"] + 86400000)) * -1))}`);
		}
		logs[msg.author.id]["redeem"] = Date.now(); //log timestamp
		economy[msg.author.id] = parseInt(economy[msg.author.id]) + 100
		fs.writeFileSync('./data/economy.json', JSON.stringify(economy));
		fs.writeFileSync('./data/logs.json', JSON.stringify(logs));
		return msg.reply(`you now have \`\u180E${economy[msg.author.id]}\` MangoCredits!`);
	}
};
