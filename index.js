//apis
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
});
global.mysql = require('mysql');
global.ud = require('urban-dictionary');
global.startTime = process.hrtime();
//keys
console.log("pulling keys...");
const keys = JSON.parse(fs.readFileSync('./keys/keys.json')); //read all keys
global.token = keys.discordtoken; //discord api key
global.apiai = ai(keys.apiaitoken); //api.ai api key
global.yt_api_key = keys.youtubetoken; //youtube api key
global.botsudoid = keys.botsudo; //bot sudo id
//vars
//prob nothing here for a while, everything is locally defined
//functions
console.log("initializing functions...");

//connect to mysql server
console.log("connecting to mysql server..");
let db_config = ({
	host: 'localhost',
	user: 'root',
	password: keys.mysql,
	database: 'mangobot'
});

function handleDisconnect() {
	const keys = JSON.parse(fs.readFileSync('./keys/keys.json')); //read all keys
	global.mysqlConnection = mysql.createConnection(db_config); // Recreate the connection, since the old one cannot be reused.
	mysqlConnection.connect(function (err) { // The server is either down
		if (err) { // or restarting (takes a while sometimes).
			console.log('error when connecting to db:', err);
			setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
		} // to avoid a hot loop, and to allow our node script to
		// process asynchronous requests in the meantime.
		else {
			console.log("successfully connected to mysql server!");
		}
	});

	mysqlConnection.on('error', function (err) {
		console.log('db error', err);
		if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
			handleDisconnect(); // lost due to either server restart, or a
		} else { // connnection idle timeout (the wait_timeout
			throw err; // server variable configures this)
		}
	});
}

handleDisconnect();

//bot settings
console.log("configuring commando...");
//make client global
global.client = new Commando.Client({
	owner: botsudoid,
	commandPrefix: 'm!',
	disableEveryone: true,
	unknownCommandResponse: false
});
global.discordClient = new Discord.Client();
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
	let localUsers = client.users.array().length;
	let updatePres = setInterval(function () {
		client.user.setPresence({
			game: {
				name: `m!help | ${localUsers} users | goo.gl/qoVTdx`,
				type: 0
			}
		});
	}, 60000);
	updatePres;
});

client.on('guildCreate', (guild) => {
	console.log(`joined guild ${guild.name}, initializing new guild setup`);
	mysqlConnection.query(`INSERT INTO op (userId, username, serverId)
VALUES ('${guild.ownerID}', '${guild.owner.displayName}', '${guild.id}');`, function (error, results, fields) {
		if (error) throw error;
	});
	let localUsers = client.users.array().length;
	client.user.setPresence({
		game: {
			name: `m!help | ${localUsers} users | goo.gl/qoVTdx`,
			type: 0
		}
	});

});
//music lib cuz im lazy
music(client, {
	prefix: "m!", //The prefix to use for the commands
	global: false, //Whether to use a global queue instead of a server-specific queue (default false).
	maxQueueSize: 5, //The maximum queue size (default 20).
	anyoneCanSkip: true, //Allow anybody to skip the song.
	clearInvoker: false, //Clear the command message.
	volume: 50, //The default volume of the player.
});
client.login(token);