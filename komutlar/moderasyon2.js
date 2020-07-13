const Discord = require('discord.js')

exports.run = async (client, message, args) => {

  let p = '+'
  let arg = args.slice(0).join(' ');

  if (!arg[0]) {
  const embed = new Discord.RichEmbed()
  .setAuthor(message.author.username, message.author.avatarURL)
  .setColor("# 000000")
  .setDescription(`[**Lays Komutlar**]`)
  .addField(`**Moderasyon-Komutları<a:>**`,`:white_small_square: \`.sa-as\` = Sa-As Sistemi Hakkında Bilgi Verir. \n:white_small_square: \`.giriş-çıkış-ayarla\` = Resimli Hoşgeldin Görüşürüz Kanalı Ayarlarsınız. \n:white_small_square: \`.giriş-çıkış-kapat\` = Resimli Hoşgeldin Görüşürüz Sistemini Kapatırsınız. \n:white_small_square: \`.duyuruyap\` = Duyuru Yaparsınız.\n:white_small_square: \`.davettakip\` = Davet Takip Sistemi Hakkında Bilgi Verir.  \n:white_small_square: \`.sunucupanel\` = Sunucu istatistik paneli hakkında bilgi verir.`)
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
  name: 'moderasyon2',
  description: 'Gelişmiş Yardım Menüsü',
  usage: 'yardım'
}
//Lord Creative
