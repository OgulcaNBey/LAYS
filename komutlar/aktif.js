const Discord = require('discord.js');
exports.run = (client, message, args) => { 
  
  let DarkTeam = message.guild.members.filter(m => m.presence.status !== "offline").size
  
  message.channel.send('**'+message.guild.name+'** Sunucusunda şu anda toplam **'+DarkTeam+'** Aktif üye bulunuyor!')
  
  
  };
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: [], 
  permLevel: 0
};

exports.help = {
  name: 'aktif',
  description: 'taslak', 
  usage: 'aktif'
};