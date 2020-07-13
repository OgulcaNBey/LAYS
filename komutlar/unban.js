const Discord = require('discord.js');
module.exports.run = async (client, message, args) => {
  message.delete();
  let frenzy_code = args[0]
if(!frenzy_code) return message.reply('kullanıcı id  belirt.!')
  message.guild.unban(frenzy_code);
};
exports.conf = {
  enabled:false,
  guildOnly: false,
  aliases: [],
  permlevel: 2
};
exports.help = {
  name: "unban",
  description: "Herhangi bir kullanıcının banını açarsınız.",
  usage: "unban kullanıcı"
};
//Lord Creative