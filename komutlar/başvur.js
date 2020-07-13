const Discord = require('discord.js');
//RuffLys#1006
exports.run = (client,message,args) => {


const isim = args[0]
if(!isim) return message.channel.send(
    new Discord.RichEmbed()
    .setColor('RED')//RuffLys#1006
    .setTitle(':x: Hata :x:')
    .setDescription('**Kullanım:** İsim,Yaş,Günlük Aktiflik Süresi,İstediğin Yetki'))

const yaş = args[1]
if(!yaş) return message.channel.send(
    new Discord.RichEmbed()
    .setColor('RED')//RuffLys#1006
    .setTitle(':x: Hata :x:')
    .setDescription('Yaşını belirtmedin?'))

const aktiflik = args[2]
if(!aktiflik) return message.channel.send(
    new Discord.RichEmbed()
    .setColor('RED')//RuffLys#1006
    .setTitle(':x: Hata :x:')
    .setDescription('Günlük Aktiflik süreni belirtmedin?'))

const yetki = args.slice(3).join(' ')
if(!yetki) return message.channel.send(
    new Discord.RichEmbed()
    .setColor('RED')//RuffLys#1006
    .setTitle(':x: Hata :x:')
    .setDescription('Hangi yetkiyi istediğini belirtmedin?'))


message.channel.send(
    new Discord.RichEmbed()
    .setColor('RED')//RuffLys#1006
    .setTitle(':white_check_mark: Başarılı :white_check_mark:')
    .setDescription('Başvurun başarıyla gönderildi!'))


client.channels.get('715103338001203201').send(
    new Discord.RichEmbed()
    .setColor('GREEN')
    .setTitle('Yeni Başvuru!')//RuffLys#1006
    .setAuthor(message.guild.name, message.guild.userURL)
    .setThumbnail(message.author.avatarURL)
      .addField('Başvuruyu Yapan', `**${message.author.tag}**`)
      .addField('İsmi', isim)
      .addField('Yaşı', yaş)//RuffLys#1006
      .addField('Günlük Aktiflik Süresi', aktiflik)
      .addField('Başvurduğu Yetki', yetki)
    .setFooter(`${message.author.username} Tarafından Başvuruldu`, message.author.avatarURL, `${message.author.Date} Kanalında kullanıldı.`)
    )
    }//RuffLys#1006


exports.conf = {
	enabled : true,
	guildOnly : false,
	aliases : ['başvur'],
	permLevel : 0
}//RuffLys#1006

exports.help = {
	name : 'başvur',
	description : 'Yetkili Başvuru Sistemi',
	usage : 'başvur'
}//RuffLys#1006
