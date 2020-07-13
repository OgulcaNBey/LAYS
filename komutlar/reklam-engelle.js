const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async(client, message, args) => {

  if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(`❌ | Bu komudu kullanabilmek için "Sunucuyu Yönet" yetkisine sahip olman gerek.`)
  if (!args[0]) return message.channel.send(`❌ | Reklam engelleme sistemini açmak için \`.reklam aç\` yazabilirsiniz. \n❌ | Reklam filtresini kapatmak için \`.reklam kapat\` yazabilirsiniz. `)
  if (args[0] !== 'aç' && args[0] !== 'kapat') return message.channel.send(`❌ | Reklam engelleme sistemini açmak için \`.reklam aç\` yazabilirsiniz. \n❌ | Reklam filtresini kapatmak için \`.reklam kapat\` yazabilirsiniz. `)

    if (args[0] == 'aç') {
    db.set(`reklamFiltre_${message.guild.id}`, 'acik')
    let i = await db.fetch(`reklamFiltre_${message.guild.id}`)
  message.channel.send(` | Reklam Filtresi başarıyla ayarlandı.`)    
     
    }


  if (args[0] == 'kapat') {
    
    let üye = await db.fetch(`reklamFiltre_${message.guild.id}`)
    if (!üye) return message.channel.send(`Reklam filtresini açtığına emin misin?.`)
    
    
    db.delete(`reklamFiltre_${message.guild.id}`)
    
    message.channel.send(` | Reklam filtresi başarılı bir şekilde kapatıldı.`)
  }
 
};


exports.conf = {
 enabled: true,
 guildOnly: false,
  aliases: ['reklam', 'reklam-filtresi', 'reklamfiltresi', 'reklam-filtre', 'reklamfiltre'],
 permLevel: 3
};

exports.help = {
 name: 'reklam-engelleme',
 description: 'reklamm',
 usage: 'Reklam'
};
//Lord Creative