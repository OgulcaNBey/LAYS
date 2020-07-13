const Discord = require('discord.js')

exports.run = async (client, message, args) => {
  
  let p = '+'
  let arg = args.slice(0).join(' ');
  
  if (!arg[0]) {
  const embed = new Discord.RichEmbed()
  .setAuthor(message.author.username, message.author.avatarURL)
  .setColor(0xF001FA)
  .setDescription(`[**Lays-Komutlar**]`)
  .addField(`**Yeni-Komutlar**`,` \`.davet-takip\` = Sunucuda Kimin Kaç Davet Yaptığını Görürsünüz.\n  \`.resimliyazı\` = Resimli Yazı Atar.
`)
  return message.channel.sendEmbed(embed);
  
      
       
  }
   
  
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yardım','help','y'],
  permlevel: 0
};

exports.help = {
  name: 'yeni-komutlar',
  description: 'Gelişmiş Yardım Menüsü',
  usage: 'yardım'
}
//Lord Creative