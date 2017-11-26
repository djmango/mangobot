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
	async run(msg) {
		mysqlConnection.query(`select * from economy where userId=${msg.author.id}`, function (error, results, fields) {
			if (error) throw (error);
			if (!results[0]) { //if the user not in the list
				return msg.reply(`you are not registered with MangoBank!`);
			}
			let oldValue = results[0].value;
			let lastRedeem = results[0].lastRedeem;
			if (Date.now() - parseInt(lastRedeem) < 86400000) {
				return msg.reply(`you have already redeemed your daily credits. please wait ${prettyMs(parseInt((Date.now() - (parseInt(lastRedeem) + 86400000)) * -1))}`);
			} else if (results[0]) { //if the user in the list
				mysqlConnection.query(`update economy set value=${praseInt(oldValue) + 100}, lastRedeem=${Date.now()} where userId=${msg.author.id}`, function (error, results, fields) {
					return msg.reply(`${msg.author.username} has been given 100 MangoCredits!`);
				})
			}
		})
	}
}