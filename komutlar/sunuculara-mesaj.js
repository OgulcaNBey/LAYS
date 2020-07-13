const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = async(client, message, args) => {
if(message.author.id !== ayarlar.sahip) return message.channel.send(":x: Yetkiniz Bulunmamaktadır.!");
if(!args[0]){
        return message.channel.send("Lütfen tüm sunuculara göndereceğim mesajı giriniz..")
        }
let sunucular = client.guilds;
try {
    sunucular.forEach((g) => {
        let Kanal = g.channels.filter(c => c.type === "text").first();
        Kanal.send(args.join(" "));
    });
} catch(err) {
    console.log("Mesaj Gönderilemedi");
}

}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sunucumesajat","sunucularamesajat","guildsend"],
  permLevel: 0
};

exports.help = {
  name: 'sunucumesaj',
  description: 'Botunuzun Bulunduğu Tüm Sunuculara Mesaj Atarsınız.',
  usage: 'sunucumesaj'
};
//XiR