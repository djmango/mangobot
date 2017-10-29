const commando = require("discord.js-commando")
const fs = require("fs");
module.exports = class getpic extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'getpic',
			group: 'general',
			memberName: 'getpic',
			description: 'Gets an avatar and sends it.',
			args: [{
				key: 'text',
				prompt: 'Whos avatar do you want me to send?',
				type: 'string'
			}]
		});
	}
	async run(msg, args) {

		var user = msg.mentions.users.first();
		var avatar = msg.author.avatarURL;
		var userav = msg.mentions.users.first();
		var avatar = userav.avatarURL;

		if (!user) {
			msg.channel.sendFile(avatar);
		} else {
			msg.channel.sendFile(user.displayAvatarURL.replace('jpg', 'png').substring(0, user.displayAvatarURL.length - 10)).catch(() => null);
			msg.channel.sendMessage(`***${msg.author}*** ***There you go! ^^***`);
		}
	}
};
