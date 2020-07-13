const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')
const sahip = ayarlar.sahip;

exports.run = function(client, message, args) {
//Komutun Kodları
  if(message.author.id === sahip){
    const a = args.join(' ');
    if(!a) return message.channel.send('**Bir ID gir**')
    const z = client.users.find(n => n.id === a)
    message.channel.send(
    new Discord.RichEmbed()
      .setTitle('Kullanıcı bilgileri')
      .addField('**Adı**',z.username)
      .addField('**Tam adı**',z.tag)
.setColor('GREEN')
    )
  }
};

exports.conf = {
  enabled: true,//True => Komut açık, False => Komut kapalı 
  guildOnly: false, //True => Sadece Servere Özel, False => Heryerde kullanılabilir
  aliases: ['id'],//Komutun farklı kullanımları ÖR: !ping, !p
  permLevel: 0 //kimlerin kullanabileceğini  (bot.js dosyasında perm leveller yazıyor)
};

exports.help = {
  name: 'kullanıcıbul',//Komutun adı (Komutu girerken lazım olucak)

  description: 'ID ile kullanıcı bulur(Özel Komut)',//Komutun Açıklaması
    category: 'botsahip',// Komutun olduğu kategori. kategoriler: bot-sunucu-yetkili-kullanıcı
  usage: 'kullanıcıbul [ID]' //komutun kullanım şekli; ÖR: !ban @Kullanıcı
}
