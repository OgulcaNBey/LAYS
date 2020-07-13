const Discord = require('discord.js');
exports.run = (client, message, params) => {
  const embed = new Discord.RichEmbed()
  .setDescription('')
  .setColor(0x00ffff)
  .addField("**》 Beni Yapan Şahsiyet 《**", `<@418081929980674070>`)

  return message.channel.sendEmbed(embed);
};
exports.conf = {  //komutlara
  enabled: true,
  guildOnly: false,
  aliases: ['yapımcım'],
  permLevel: 0
};
exports.help = {
  name: 'yapımcım',
  description: 'Botun Yapımcısını Gösterir',
  usage: 'yapımcım'
};
