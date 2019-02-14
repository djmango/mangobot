global.startTime = process.hrtime();
//apis
console.log("getting apis...");
global.path = require('path');
global.fs = require('fs');
global.os = require('os');
global.request = require('request');
global.sqlite3 = require('sqlite3');
global.Commando = require('discord.js-commando');
global.Discord = require('discord.js');
global.format = require('format-duration');
global.striptags = require('striptags');
global.crashreporter = require('crashreporter');
global.dateFormat = require('dateformat');
global.prettyMs = require('pretty-ms');
global.ud = require('urban-dictionary');

//pull keys file
const keys = JSON.parse(fs.readFileSync('./keys/keys.json')); //read all keys

//keys
console.log("pulling keys...");
global.token = keys.discordtoken; //discord api key
global.botSudoId = keys.botsudo; //bot sudo id

//debug setup
if (keys.dev == "true") global.prefix = "m!!"
else global.prefix = "m!"

// db stuff
console.log("initializing database..");

// check if db exists
fs.stat('./data/database.db', async function (err, stat) {
	if (err == null) {
		console.log('database found, connecting...');
		global.db = await new sqlite3.Database('./data/database.db');
	} else if (err.code == 'ENOENT') {
		// database does not exist
		console.log('database does not exist, creating and populating...')
		global.db = await new sqlite3.Database('./data/database.db');
		migrate()
	} else {
		console.log('Some other error: ', err.code);
	}
});

// db migrate function
function migrate() {
	// admins table, {id, level}
	db.exec("create table op (userId varchar(255), username varchar(255), serverId varchar(255))")

	// economy table {userId, username, value, lastRedeem}
	db.exec("create table economy (userId varchar(255), username varchar(255), value varchar(255), lastRedeem varchar(255))")
}

//bot settings
console.log("configuring commando...");
//make client global
global.client = new Commando.Client({
	owner: botSudoId,
	commandPrefix: prefix,
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
		['music', 'music commands'],
		['fun', 'commands just for fun'],
		['utility', 'generally useful commands']
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
		let localUsers = client.users.array().length;
		client.user.setPresence({
			game: {
				name: `${prefix}help | ${localUsers} users | goo.gl/qoVTdx`,
				type: 0
			}
		});
	}, 60000);
	updatePres;
});

client.on('guildCreate', (guild) => { //new guild setup
	console.log(`joined guild ${guild.name}, initializing new guild setup`);
	db.exec(`insert into op (userId, username, serverId)
values ('${guild.ownerID}', '${guild.owner.displayName}', '${guild.id}');`, function (error, results, fields) {
		if (error) throw error;
	});
	let localUsers = client.users.array().length;
	client.user.setPresence({
		game: {
			name: `${prefix}help | ${localUsers} users | goo.gl/qoVTdx`,
			type: 0
		}
	});

});

//handlers for errors and disconnects
client.on('disconnect', function (event) {
	if (event.code != 1000) {
		console.log("Discord client disconnected with reason: " + event.reason + " (" + event.code + "). Attempting to reconnect in 6s...");
		setTimeout(function () {
			client.login(token);
		}, 6000);
	}
});

client.on('error', function (err) {
	console.log("Discord client error '" + err.code + "'. Attempting to reconnect in 6s...");
	client.destroy();
	setTimeout(function () {
		client.login(token);
	}, 6000);
});

process.on('rejectionHandled', (err) => {
	console.log(err);
	console.log("an error occurred. reconnecting...");
	client.destroy();
	setTimeout(function () {
		client.login(token);
	}, 2000);
});

process.on('exit', function () {
	client.destroy();
});

client.login(token);