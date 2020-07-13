const ayarlar = require('../ayarlar.json');
exports.run = function(client, message, args) { 
  
if ( message.author.id != ayarlar.sahip ){
   message.channel.send("Bu komutu yanlızca **kurucum** kullanabilir.")
  }else{

message.channel.send(`Kurucu mesajı`);
  }  
  };

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["tst"],
  permLevel: 0
};

module.exports.help = {
  name: 'test',
};