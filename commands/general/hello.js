const {
  Command
} = require('discord.js-commando');

module.exports = class ReplyCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'hello',
      group: 'general',
      memberName: 'hello',
      description: 'Replies with a Message.',
      examples: ['hello']
    });
  }
  run(msg) {
    return msg.say('Hi, I\'m awake!');
  }
};
