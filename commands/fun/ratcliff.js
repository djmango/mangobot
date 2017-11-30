const commando = require("discord.js-commando")

class eightball extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'ratcliff',
            group: 'fun',
            memberName: 'ratcliff',
            description: 'i dont know why'
        });
    }
    async run(msg) {
        let ratcliffResponses = JSON.parse(fs.readFileSync("./data/ratcliff.json"));
        let randomnumber = Math.floor(Math.random() * ratcliffResponses.responses.length);
        return msg.reply(ratcliffResponses.responses[randomnumber]);
    }
}

module.exports = eightball;