const commando = require("discord.js-commando")
const fs = require("fs");

class ridea extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'ridea',
			group: 'literature',
			memberName: 'ridea',
			description: 'Creates a random idea.'
		});
	}
	async run(message, args) {
		let randomideas = JSON.parse(fs.readFileSync("./data/randomideas.json"));
		var partA = randomideas.adjectives[Math.floor(Math.random() * randomideas.adjectives.length)];
		var partB = randomideas.locations[Math.floor(Math.random() * randomideas.locations.length)];
		var partC = randomideas.genres[Math.floor(Math.random() * randomideas.genres.length)];
		var partD = randomideas.genres[Math.floor(Math.random() * randomideas.genres.length)];
		var partE = randomideas.roles[Math.floor(Math.random() * randomideas.roles.length)];
		var partF = randomideas.gender[Math.floor(Math.random() * randomideas.gender.length)];
		var partG = randomideas.characterTypes[Math.floor(Math.random() * randomideas.characterTypes.length)];
		var partH = randomideas.characterAdjectives[Math.floor(Math.random() * randomideas.characterAdjectives.length)];
		var partI = randomideas.perks[Math.floor(Math.random() * randomideas.perks.length)];
		var partJ = randomideas.perks[Math.floor(Math.random() * randomideas.perks.length)];
		var partK = randomideas.perks[Math.floor(Math.random() * randomideas.perks.length)];
		var partL = randomideas.debuffs[Math.floor(Math.random() * randomideas.debuffs.length)];

		message.channel.sendMessage("*Setting: *" + "A " + partA + " " + partB + "|*Genres: *" + partC + ", " + partD +
			"| " + "*" + partE + "*" + ": A " + partF + " " + partH + " " + partG + ". The characters positive features include " +
			partI + ", " + partJ + " and " + partK + "." + " Unfortunately, the character is rather " + partL + ".");

	}
}

module.exports = ridea;
