const Discord = require('discord.js')
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')

exports.run = async(client, message, args) => {
    var bymayfe = args[0];
  if(!bymayfe) return message.channel.send("** :x: Bir seçenek belirtin** (**ayarla** - **kapat**)");

      if (!message.guild) {
    const ozelmesajuyari = new Discord.RichEmbed()
    .setColor("# 808080")
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('Sadece herhangi bir sunucudan mesaj gönderebilirim.:relaxed: ')
    return message.author.sendEmbed(ozelmesajuyari); }

  if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(':x: Otorol ayarlamak için `Rolleri Yönet` yetkisine sahip olman gerek.')

  
    if (bymayfe == 'ayarla' || bymayfe == 'aç') {
 let rol = message.mentions.roles.first() || message.guild.roles.get(args.join(' '))
  let newRole;
  let tworole;
  if (!rol) return message.channel.send(' :x: Otorol ayarlamanız için bir rol etiketlemeniz gerek. `.otorol ayarla @Üye #kanal`')
  else newRole = message.mentions.roles.first().id
  let isim = message.mentions.roles.first().name  
  let otorolkanal = message.mentions.channels.first();
  if (!otorolkanal) return message.channel.send(' :x: Otorol ayarlamanız için bir rol etiketlemeniz gerek. `.otorol ayarla @Üye #kanal`')
    db.set(`otorolisim_${message.guild.id}`, isim)
  let i = await  db.set(`otorolKanal_${message.guild.id}`, message.mentions.channels.first().id)
  let otorol = await db.set(`autoRole_${message.guild.id}`, newRole)
  if (!message.guild.roles.get(newRole)) return message.channel.send(" :x: Etiketlediğiniz rol bulunamadı, etiketlediğiniz rolün etiketlenebilirliğinin aktif olduğundan emin olunuz.")
    message.channel.send(`Otorol, <@&${newRole}> mesaj kanalı <#${i}> olarak ayarlandı :white_check_mark:`)  
     
  } 

  if (bymayfe == 'kapat' || bymayfe == 'sıfırla') {
    

    
    
    db.delete(`otorolisim_${message.guild.id}`)
        db.delete(`otorolKanal_${message.guild.id}`)
    db.delete(`autoRole_${message.guild.id}`)

    message.channel.send(`Otorolü başarıyla kapattım.`)
  }
};
  
  
    
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['oto-rol'],
    permLevel: 0
}

exports.help = {
    name: 'otorol',
    description: 'Sunucuya giren kullanıcıya seçtiğiniz rolü otomatik verir.',
    usage: 'otorol <@rol>'
}
//Lord Creative