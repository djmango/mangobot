const {
    Command
} = require('discord.js-commando');

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'shorten',
            group: 'utility',
            memberName: 'shorten',
            description: 'shortens a url.',
            examples: ['shorten https://google.com']
        });
    }
    async run(msg) {
        let message = msg.content.split(" ");
        if (!message[1]) return msg.reply('you must request a url to be shortend!');
        db.exec(`select * from url where longUrl='${message[1]}'`, function (error, results, fields) {
            if (error) throw (error);
            else if (!results[0]) { //if it is a new url to be shortend
                googleUrl.shorten(message[1], function (err, shortUrl) {
                    if (err) console.log(err)
                    else {
                        db.exec(`insert into url (userId, longUrl, shortUrl, callTime) values (${msg.author.id}, '${message[1]}', '${shortUrl}', ${Date.now()})`)
                        return msg.reply(`url shortend to ${shortUrl}`);
                    }
                });
            } else if (results[0]) {
                return msg.reply(results[0].shortUrl);
            }
        })
    }
}