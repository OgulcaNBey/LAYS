const Discord = require('discord.js');
exports.run = (client, message, args) => {
  let fc = 3
    let frenzy_spoiler = args.slice(0).join(' ');
    if (frenzy_spoiler.length < fc) return message.reply('Ne yazayım patron!');
    message.delete();
message.channel.send(`||${frenzy_spoiler}||`)
};
exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'spoileryaz',
  description: 'spoiler yazı',
  usage: 'spoiler yazı'
};
