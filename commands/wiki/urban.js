const {
	Command
} = require('discord.js-commando');

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'urban',
			group: 'wiki',
			memberName: 'urban',
			description: 'Searches a query on Urban Dictionary.',
			examples: ['urban Spoons'],
			args: [{
				key: 'text',
				prompt: 'What would you like to search for?',
				type: 'string'
			}]
		});
	}
	run(msg, args) {
		let message = msg.content.split(" ");
		let messagefull = "";
		for (var i = 1; i < message.length; i++) {
			messagefull = messagefull + message[i] + " "
		}
		ud.term(messagefull, function(error, entries, tags, sounds) {
			if (error) {
				console.error(error.message)
				msg.reply(`The query \`${messagefull}\` returned no results or returned an error.`);
			} else {
				let embed = new Discord.RichEmbed()
					.setTitle(`:pencil: ${entries[0].word}`)
					.setAuthor('Urban Dictionary', 'http://i.imgur.com/qv7WT83.png')
					.setDescription(`${entries[0].definition} [Read more](${entries[0].permalink})`)
					.addField('Example', `${entries[0].example}`)
					.setColor(0xf4b342)
					.setFooter(`Urban Dictionary post pulled on ${new Date()}`)
				msg.channel.send({
					embed
				});
			}
		})
	}
};
