//api's
console.log("getting apis...");
global.Commando = require('discord.js-commando');
global.Discord = require('discord.js');
global.music = require('discord.js-music-v11');
global.format = require('format-duration');
global.path = require('path');
global.fs = require('fs');
global.os = require('os');
global.request = require('request');
global.striptags = require('striptags');
global.ai = require('apiai');
global.crashreporter = require('crashreporter');
global.dateFormat = require('dateformat');
global.prettyMs = require('pretty-ms');
global.imageDownloader = require('image-downloader');
global.vision = require('@google-cloud/vision')({
	projectId: 'mangobot-c6c7c',
	keyFilename: './keys/mangobot-87a8c3e04f5d.json'
});;
global.ud = require('urban-dictionary');
global.startTime = process.hrtime();
//keys
console.log("pulling keys...");
const keys = JSON.parse(fs.readFileSync('./keys/keys.json')); //read all keys
global.token = keys.discordtoken //discord api key
global.apiai = ai(keys.apiaitoken); //api.ai api key
global.yt_api_key = keys.youtubetoken //youtube api key
global.botsudoid = keys.botsudo //bot sudo id
//vars
//prob nothing here for a while, everything is locally defined
//functions
console.log("initializing functions...");
global.isBotAdmin = function(msg) {
	//check if messsage author is bot controller
	//author = message.member
	let adminTemp = fs.readFileSync('./data/botAdmins.json');
	if (msg.author.id == botsudoid || adminTemp.toString().indexOf(msg.author.id)) {
		global.isAdminGlobal = true; //i dont know why this works and the function doesnt but it does so leave it
		return true;
	} else {
		global.isAdminGlobal = false;
		return false;
	}
}

//bot settings
console.log("configuring commando...");
const client = new Commando.Client({
	owner: botsudoid,
	commandPrefix: '~',
	disableEveryone: true
});
//make client global
global.client = new Commando.Client({
	owner: botsudoid,
	commandPrefix: '~',
	disableEveryone: true
});
global.discordClient = new Discord.Client
//command groups
client.registry
	.registerDefaultTypes()
	.registerGroups([
		['general', 'general commands'],
		['admin', 'administration commands'],
		['economy', 'economy commands'],
		['wiki', 'wiki commands'],
		['ai', 'artificial intellegence commands'],
		['music', 'music commands'],
		['fun', 'commands just for fun'],
		['literature', 'commands relating to literature']
	])
	.registerDefaultGroups()
	.registerDefaultCommands()
	.registerCommandsIn(path.join(__dirname, 'commands'));

//ready?
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	global.servers = (`Servers:\n${client.guilds.map(g => g.name).join("\n")}`);
	console.log(`Servers:\n${client.guilds.map(g => g.name).join("\n")}`);
});

music(client, {
	prefix: "~", //The prefix to use for the commands
	global: false, //Whether to use a global queue instead of a server-specific queue (default false).
	maxQueueSize: 5, //The maximum queue size (default 20).
	anyoneCanSkip: true, //Allow anybody to skip the song.
	clearInvoker: false, //Clear the command message.
	volume: 50, //The default volume of the player.
});
client.login(token);
