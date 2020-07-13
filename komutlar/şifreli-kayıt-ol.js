const Discord = require('discord.js');
const client = new Discord.Client();
var generator = require('generate-password');
const db = require('quick.db')
exports.run = (client, message, args) => {
    if (!args[0]) return message.channel.send('Lütfen bir argüment giriniz. `kodal / onay / kodsil / alınacak-rol / verilecek-rol` Kayıt kanalına Gelen Kullanıcalara Mesaj Atılması için Kayıt Kanalının ismini `kayıt-alanı` Yapınız. ')
  if (args[0] == 'kodal') {
    var password = generator.generate({
    length: 10,
    numbers: true,
    uppercase: true,
    excludeSimilarCharacters: true,
    strict: true,
    symbols: true
});
    message.reply("Kodunuzu özel mesajlardan size gönderdim.")
message.author.send(''+ message.author +' başarıyla kodunuz oluşturuldu. Kodunuzu `.kayıt onay '+ password +'` yazarak sunucuya girebilirsiniz.')
    db.set(`flaiscode.kayit_${message.guild.id + message.author.id + password}`, password)
  }
  if (args[0] == 'onay') {
    let sifre = args[1]
    if (!sifre) return message.channel.send('Lütfen dm den size gönderdiğim kodu .kayıt onay -kod- şeklinde giriniz.')
    let flaiscode_kod = db.fetch(`flaiscode.kayit_${message.guild.id + message.author.id + sifre}`)
    if (!flaiscode_kod) return message.channel.send('Girdiğiniz kod yanlış lütfen kontrol ediniz ve tekrar deneyiniz.')

    let alinacakrol = db.fetch(`flaiscode.kayit.alinacak_${message.guild.id}`)
    let alinacakvarmi = message.member.roles.find(rol => rol.id === alinacakrol)
    if (!alinacakvarmi) return message.channel.send('üzgünüm sizden alınacak rol ayarlanmamış, lütfen yetkililere bildiriniz.')
    let alinacaktest = message.guild.roles.get(alinacakrol || '111111111111')
    if (!alinacaktest) return message.channel.send('Alınacak rol bulunamadı, Lütfen alınacak rolu ayarlayınız.')

    let verilecekrol = db.fetch(`flaiscode.kayit.verilecek_${message.guild.id}`)
    let verilecektest = message.guild.roles.get(verilecekrol || '111111111111')
    if (!verilecektest) return message.channel.send('üzgünüm size verilecek rol ayarlanmamış, lütfen yetkililere bildiriniz.')
    
    message.member.addRole(verilecekrol)
    message.member.removeRole(alinacakrol)
    
    message.reply("Tebrikler başarıyla kayıt oldun!")
    message.author.send('Sunucuya Başarıyla Kayıt Oldunuz iyi Eğlenceler. <3')
    message.delete(30)

   db.delete(`flaiscode.kayit_${message.guild.id + message.author.id + sifre}`)
  }
  if (args[0] == 'sil') {
    if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('Yeterli izinlere Sahip Gözükmüyorsun.') 

    let sifre = args[1]
    if (!sifre) return message.channel.send('Lütfen silmek istediğiniz kodu giriniz.')
    let flaiscode_kod = db.fetch(`flaiscode.kayit_${message.guild.id + message.author.id + sifre}`)
    if (!flaiscode_kod) return message.channel.send('Silmek istediğiniz kod bulunamadı.')

    db.delete(`flaiscode.kayit_${message.guild.id + message.author.id + sifre}`)
    
    message.channel.send('`'+ sifre +'` adlı kod başarıyla silindi.')
  }
  if (args[0] == 'al�nacak-rol') {
    if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('Yeterli izinlere Sahip Gözükmüyorsun.') 

    let alinicakrol = message.mentions.roles.first() || message.guild.roles.get(args[1]) || message.guild.roles.find(rol => rol.name === args[1]);
    if (!alinicakrol) return message.channel.send('Lütfen alınacak rolü etiketleyiniz.')
    
    db.set(`flaiscode.kayit.alinacak_${message.guild.id}`, alinicakrol.id)
    
    message.channel.send('Başarıla! Alnnacak rol `'+ alinicakrol.name +'` olarak ayarlandı. Sıfırlamak için **.alınacak-rol-sıfırla** yazınız')
  }
  if (args[0] == 'alınacak-rol-sıfırla') {
    if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('Yeterli izinlere sahip gözükmüyorsunuz.') 

    let alinacakrol = db.fetch(`flaiscode.kayit.alinacak_${message.guild.id}`)
    let alinacaktest = message.guild.roles.get(alinacakrol || '111111111111')
    if (!alinacaktest) return message.channel.send('Alınacak rol ayarlanmamış! Lütfen ayarlayanız.')

    db.delete(`flaiscode.kayit.alinacak_${message.guild.id}`)
    
    message.channel.send('Başarıyla alınacak rolu sıfırladım.')
  }
if (args[0] == 'verilecek-rol') {
    if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('Yeterli izinlere Sahip Gözükmüyorsun.') 

    let verilecekrol = message.mentions.roles.first() || message.guild.roles.get(args[1]) || message.guild.roles.find(rol => rol.name === args[1]);
    if (!verilecekrol) return message.channel.send('Lütfen verilecek rolu etiketleyiniz.')
    
    db.set(`flaiscode.kayit.verilecek_${message.guild.id}`, verilecekrol.id)
    
    message.channel.send('Başarılı! Verilecek rolu `'+ verilecekrol.name +'` olarak ayarladım. Sıfırlamak için **.verilecek-rol-sıfırla** yazınız.')
  }
  if (args[0] == 'verilecek-rol-sıfırla') {
    if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('Yeterli izinlere sahip gözükmüyorsun.') 

    let verilecekrol = db.fetch(`flaiscode.kayit.verilecek_${message.guild.id}`)
    let verilecektest = message.guild.roles.get(verilecekrol || '111111111111')
    if (!verilecektest) return message.channel.send('Verilecek rol ayarlanmamış. Lütfen ayarlayın.')

    db.delete(`flaiscode.kayit.verilecek_${message.guild.id}`)
    
    message.channel.send('Başarıyla verilecek rol sıfırlandı.')
  }
	}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kayıt'],
  permLevel: 0
};

exports.help = {
  name: 'kayıt-sistemi',
  description: 'nebilm',
  usage: 'kayıt'
};