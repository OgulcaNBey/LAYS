const Discord = require('discord.js')

exports.run = async (client, message, args) => {

  let p = '+'
  let arg = args.slice(0).join(' ');

  if (!arg[0]) {
  const embed = new Discord.RichEmbed()
  .setAuthor(message.author.username, message.author.avatarURL)
  .setColor(0xF001FA)
  .setDescription(`[**Lays-Komutlar**]`)
  .addField(`**Kullanıcı-Komutları<a:>**`,`:white_small_square: \`.ping\` = Botun Pingini gösterir. \n:white_small_square: \`.avatar\` = Avatarını gösterir.\n:white_small_square: \`.rolbilgi\` = Rol hakkında bilgi alırsınız. \n:white_small_square: \`.kullanıcıbilgim\` = Bilgilerinizi Gösterir. \n:white_small_square: \`.komutsayısı\` = Bottaki Komut Sayısını Gösterir. \n:white_small_square: \`.yapımcım\` = Botun Yapımcısını Gösterir. \n:white_small_square: \`.canlıdestek\` = Canlı Destek Talebi Açarsınız. \n:white_small_square: \`.istatistik\` = Botun İstatistiklerini Gösterir. \n:white_small_square: \`.afk\` = Belirtdiğiniz Sebepte Afk Olursunuz.`)
  return message.channel.sendEmbed(embed);



  }


}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kullanıcı'],
  permlevel: 0
};

exports.help = {
  name: 'kullanıcı',
  description: 'Gelişmiş Yardım Menüsü',
  usage: 'yardım'
}
//Lord Creative
