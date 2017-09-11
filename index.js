//api's
console.log("getting apis...");
const Commando = require('discord.js-commando');
const path = require('path');
const fs = require('fs');
const os = require('os');
//keys
console.log("pulling keys...");
const keys = JSON.parse(fs.readFileSync('keys.json')); //read all keys
const token = keys.discordtoken //discord api key
const yt_api_key = keys.youtubetoken //youtube api key
//vars
console.log("setting variables...");
//functions
console.log("initializing functions...");

exports.isBotAdmin = function(msg) {
	//check if messsage author is bot controller
	//author = message.member
	var adminTemp = fs.readFileSync('./botAdmins.json');
	if (msg.author.id == 193066810470301696 || adminTemp[msg.author.id]) {
		return true;
	} else {
		return false;
	}
}

//bot settings
console.log("configuring commando...");
const client = new Commando.Client({
	owner: '193066810470301696',
	commandPrefix: '~',
	disableEveryone: true
});
//make client global
global.client = new Commando.Client({
	owner: '193066810470301696',
	commandPrefix: '~',
	disableEveryone: true
});
//command groups
client.registry
	.registerDefaultTypes()
	.registerGroups([
		['general', 'general commands'],
		['admin', 'admministration commands'],
		['economy', 'economy commands']
	])
	.registerDefaultGroups()
	.registerDefaultCommands()
	.registerCommandsIn(path.join(__dirname, 'commands'));

//ready?
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	console.log(`Servers:\n${client.guilds.map(g => g.name).join("\n")}`);
	client.user.setGame('b');
});

client.login(token);
