const {
	Command
} = require('discord.js-commando');

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'updatepres',
			group: 'admin',
			memberName: 'updatepres',
			description: 'Updates mangobot presence.',
			examples: ['updatepres']
		});
	}
	async run(msg) {
		let localUsers = client.users.array().length
		client.user.setPresence({
			game: {
				name: `!~help | ${localUsers} users | goo.gl/qoVTdx`,
				type: 0
			}
		})
		return msg.say('presence updated succesfully!')
	}
}
