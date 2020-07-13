const Discord = require('discord.js');
exports.run = async (client, message, args) => { 
let prefix = '.'
let yardım = new Discord.RichEmbed()  
.setAuthor(`${client.user.username}`, client.user.avatarURL)
.setColor('# 000000')
.addField('Lays BOT',`
**.moderasyon** : Moderasyon Komutlarını Açar.
**.moderasyon2** : Moderasyon 2 Komutlarını Açar
**.kullanıcı** : Kullanıcı Komutları Açar.
**.yeni-komutlar** : Yeni Komutları Açar.
**.eğlence** : Eğlence Komutlarını Açar.`)
.setFooter(`${message.author.tag} Tarafından İstendi.`, message.author.avatarURL)
.setThumbnail(client.user.avatarURL)
 message.channel.send(yardım) 
  };
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: ["help"], 
  permLevel: 0
};
exports.help = {
  name: 'yardım'
};
//Lord Creative