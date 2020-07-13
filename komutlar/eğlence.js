const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
var prefix = ayarlar.prefix;
exports.run = (client, message, args) => {
  
    const juke = new Discord.RichEmbed()
    .setColor('GOLD')
    .setAuthor(`Lays | Eğlence Komutları`, client.user.avatarURL) 
      .setDescription('**[Website Yakında]()**')
.setThumbnail(client.user.avatarURL)
      .addField('**Komutlar:**', '`espri`, `rip`, `kralol`,  `yazı-tura`,  `alkış`, `dcdekiyıkık`, `tkm`,`aşkölçer`, `stresçarkı`, `yılbaşı`,')
    .setFooter(``, client.user.avatarURL)
    .setTimestamp()
    message.channel.send(juke).catch()

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'eğlence',
      category: 'Yardım',
      description: 'Yardım kategorilerini gösteir.',
};