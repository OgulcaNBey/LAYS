const ayarlar = require('../ayarlar.json');
const db = require('quick.db');
const serverstats = new db.table('ServerStats');

exports.run = async(client, message, args) => {
if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`Bu komutu kullanabilmek için Yönetici İznine Sahip Olmanız gerekmektedir.`)
if(!args[0]) { return message.channel.send(`Sunucu istatistiklerini açmak için \`${ayarlar.prefix}sunucui aç\` \n Kapatmak isterseniz \`${ayarlar.prefix}sunucui kapat\``)}
if(args[0] === 'aç' || args[0] === 'open') {
let totusers = await serverstats.fetch(`Stats_${message.guild.id}`, { target: '.totusers' })
let membcount = await serverstats.fetch(`Stats_${message.guild.id}`, { target: '.membcount' })
let botcount = await serverstats.fetch(`Stats_${message.guild.id}`, { target: '.botcount' })
if(totusers !== null || membcount !== null || botcount !== null) return message.channel.send(`Sunucu istatistikleri zaten açık kapatmak isterseniz \`${ayarlar.prefix}\` sunucui kapat yazabilirsiniz.`)
if(!message.guild.me.hasPermission(`MANAGE_CHANNELS`)) return message.channel.send(`\`Kanalları Yönet\` İznine ihtiyacım var`)
	const totalsize = message.guild.memberCount;
	const botsize = message.guild.members.filter(m => m.user.bot).size;
	const humansize = totalsize - botsize;
message.guild.createChannel('Sunucu İstatistikleri', 'category', [{
  id: message.guild.id,
  deny: ['CONNECT']
}]).then(channel => {
channel.setPosition(0)
message.guild.createChannel("Toplam Kullanıcı : " + totalsize, 'voice', [{
  id: message.guild.id,
  deny: ['CONNECT']
}]).then(channel1 => {
channel1.setParent(channel.id)
let x = channel1.id
message.guild.createChannel("Üye Sayısı  : " + humansize, 'voice', [{
  id: message.guild.id,
  deny: ['CONNECT']
}]).then(channel2 => {
channel2.setParent(channel.id)
let y = channel2.id
message.guild.createChannel("Bot Sayısı : " + botsize, 'voice', [{
  id: message.guild.id,
  deny: ['CONNECT']
}]).then(async channel3 => {
channel3.setParent(channel.id)
let z = channel3.id
await serverstats.set(`Stats_${message.guild.id}`, { guildid: message.guild.id, totusers: x, membcount: y, botcount: z, categid: channel.id})
})
})
})
})
message.channel.send(`Sunucu İstatistikleri Açıldı`)
} else if (args[0] === 'kapat' || args[0] === 'close') {
  
let totusers = await serverstats.fetch(`Stats_${message.guild.id}`, { target: '.totusers' })
let membcount = await serverstats.fetch(`Stats_${message.guild.id}`, { target: '.membcount' })
let botcount = await serverstats.fetch(`Stats_${message.guild.id}`, { target: '.botcount' })
let categ = await serverstats.fetch(`Stats_${message.guild.id}`, { target: '.categid' })
if(totusers === null || membcount === null || botcount === null) return message.channel.send(`Bu sunucu için Sunucu İstatistikleri daha önce etkinleştirilmedi, bu nedenle hiçbir şeyi devre dışı bırakamıyorum.`)
  client.channels.get(totusers).delete()
  client.channels.get(membcount).delete()
  client.channels.get(botcount).delete()
  client.channels.get(categ).delete()
  
serverstats.delete(`Stats_${message.guild.id}`)
message.channel.send(`Bu sunucu için Sunucu İstatistikleri devre dışı bırakıldı. Sunucu durumunu etkinleştirme özelliğini kullanarak etkinleştirebilirsiniz.`)
}
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sunucui"],
  permLevel: 0
};

exports.help = {
  name: 'sunucupanel',
  description: 'Sunucu İstatistik Komutudur',
  usage: 'sunucupanel <aç &kapat>'
};
//XiR