const {
	Command
} = require('discord.js-commando');

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'op',
			group: 'admin',
			memberName: 'op',
			description: 'Adds designated user to the admin list.',
			examples: ['op @djmango'],
			args: [{
				key: 'text',
				prompt: 'Who would you like to add to the admin list?',
				type: 'string'
			}]
		});
	}
	run(msg, args) {
		let mentions = msg.mentions.users.array()[0]
		if (!mentions) return msg.reply('you must mention someone and not add any extra arguments!')
		mysqlConnection.query(`select * from op where userId=${msg.author.id}`, function(error, results, fields) {
			if (error) throw error;
			if (!results[0]) { //if it didnt work
				return msg.reply('You are not a bot admin.');
			}
			if (msg.author.id == botsudoid || msg.author.id == results[0].userId) { //if it did work
				mysqlConnection.query(`select * from op where userId=${mentions.id}`, function(error, results, fields) {
					if (error) throw error;
					if (!results[0]) { //if the user is not already in the list
						mysqlConnection.query(`insert into op (userId, username, serverId)
						values (${mentions.id}, '${mentions.username}', ${msg.guild.id})`, function(error, results, fields) {
							return msg.reply(`Succesfully added ${mentions.username} to the admin list!`);
						})
					} else { //if the user is already in the list
						return msg.reply(`${mentions.username} is already an admin!`);
					}
				})
			}
		});
	}
}
