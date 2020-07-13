const Discord = require('discord.js');  //KOMUTLARA ATILACAK//
const ms = require('parse-ms');
exports.run = async(client, message, args) => {
  let okul = new Date('2021-01-01:00:00')
    let zaman = ms(okul - Date.now())
    message.channel.send(`Yılbaşının kutlanmasına **${zaman.days}** gün **${zaman.hours}** saat **${zaman.minutes}** dakika kaldı!`)
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["yılbaşı", "yeniyıl"],
  permLevel: 0
};  //Mode XL CODE//
exports.help = {
  name: 'yılbaşı',
  description: '',
usage: "yılbaşı"
};