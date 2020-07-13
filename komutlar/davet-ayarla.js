const Discord = require('discord.js')
const fs = require('fs');
var ayarlar = require('../ayarlar.json');
//let kanal = JSON.parse(fs.readFileSync("././jsonlar/sKanal.json", "utf8"));

exports.run = async (client, message, args, config) => {

  if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply(`Bu komutu kullanabilmek için **Kanalları Yönet** iznine sahip olmalısın!`);
  
  const db = require('quick.db');
  
  
  let channel = message.mentions.channels.first()
  
    if (!channel) {
        return message.reply("** Doğru Kullanım  .davettakip #kanal **")
    }

    db.set(`dKanal_${message.guild.id}`, "<#"+channel.id+">")
  
    const embed = new Discord.RichEmbed()
    .setThumbnail(message.author.avatarURL)
    .setDescription(`Merhaba,\nBundan Sonra Davet Takip Kanalı Sunucunuzda  \n${channel}  Olarak Tanımlanmıştır.\n\nİyi Eğlenceler!\n Kapatmak İçin: Bir Kanal Oluşturun davet takipi o kanala geçirin ve o kanalı silin.`)
    .setColor("RANDOM")
    message.channel.send({embed})
} 
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['davet-kanal-belirle','davetkanal','davettakip','davet-takip','davettakipayarla','davet-takip-ayarla'],
    permLevel: 0,
}
exports.help = {
    name: 'davet-takip',
    description: 'Davet kanalını ayarlar.',
    usage: 'davet-kanal-ayarla <#kanal>',
}
//Lord Creative