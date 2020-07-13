const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, args) => {
    const embed = new Discord.RichEmbed()

        .setTitle(`${client.user.username} Davet Menüsü  `)
        .setDescription(`:white_small_square:**Botun Davet Linki İçin** [TIKLA](https://discordapp.com/oauth2/authorize?client_id=730709113713197066&scope=bot&permissions=8) \n:white_small_square:**Destek Sunucusu İçin** [TIKLA](https://discord.gg/MCPCjJ9)`)
        .setThumbnail(client.user.avatarURL)
        .setFooter(`${message.author.username} Başarıyla ${ayarlar.prefix}davet Sistemi Kullandı!`, message.author.avatarURL)
    .setColor(`# 000000`)
    return message.channel.sendEmbed(embed);


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
};

exports.help = {
  name: 'davet',
  description: '',
  usage: 'davet'
};
//Lord Creative
