const Discord = require('discord.js')
const fs = require('fs')
const ayarlar = require("../ayarlar.json")
exports.run = async (client, message, args) => {

   if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply(`Bu komutu kullanabilmek için **Sunucuyu Yönet** iznine sahip olmalısın!`);
//hello
    let prefix = ayarlar.prefix

  	let kanal = JSON.parse(fs.readFileSync("./ayarlar/glog.json", "utf8"));
    	let kapat = JSON.parse(fs.readFileSync("./ayarlar/glog.json", "utf8"));
		if(!kanal[message.guild.id]) {

			const embed = new Discord.RichEmbed()
				.setDescription(`Giriş çıkışı Ayarlamadığın İçin Sıfırlayamazsın!`)
				.setColor("RED")
				.setTimestamp('Ayarlamak İçin ${prefix}giriş-çıkış-ayarla #kanal')
			message.channel.send({embed})
			return
		}

		delete kanal[message.guild.id]
		fs.writeFile("./ayarlar/glog.json", JSON.stringify(kanal), (err) => {
			console.log(err)
		})
		const embed = new Discord.RichEmbed()
			.setDescription(`Giriş Çıkış Başarıyla Sıfırlandı`)
			.setColor("RANDOM")
			.setTimestamp()
		message.channel.send({embed})
		return
	}


exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: [],
  permLevel: 0
};
//codare
exports.help = {
  name: 'giriş-çıkış-kapat', 
  description: 'Giriş çıkışı kapatır',
  usage: 'giriş-çıkış-kapat'
}