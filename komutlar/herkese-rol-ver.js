const Discord = require('discord.js');
//var ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {
  
  const db = require('quick.db');
  

  let role = message.mentions.roles.first()
  
  if (!role) { 
    
    var embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription("Sunucudaki herkese verilmesini istediğiniz rolü etiketlemelisiniz!")
    message.channel.send(embed)
    
    return
  }
  
  /*if (!message.guild.roles.get(role)) {
    var embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription("Sunucuda `" + role + "` isminde bir rol bulunmuyor!")
    message.channel.send(embed)
    
    return;
  }*/
  
  message.channel.send("Sunucudaki herkese `" + role.name + "` adlı rol veriliyor... Bu biraz zaman alabilir.")
  
  var rol = message.guild.roles.get(role.id);
  
  try {
    message.guild.members.forEach(async (user, id) => {
     user.addRole(rol)
  });
  } catch(e){
      //console.log(e.stack);
  }
  
  setTimeout(function() {
  
    message.channel.send("Sunucudaki herkese başarıyla `" + role.name + "` adlı rol verildi!")
    
  }, 60000)
  
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["herkese-rol-ver"],
    permLevel: 4,
    kategori: "premium"
  };
  
  exports.help = {
    name: 'toplu-rol-ver',
    description: 'İstediğiniz rolü sunucudaki herkese verir.',
    usage: 'toplu-rol-ver <@rol>'
  };