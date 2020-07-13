const Discord = require('discord.js');


exports.run = async function(client, message) {
  const guild = message.guild;
  const bots = message.guild.members.filter(a=>a.user.bot).size;
  const users = message.guild.members.filter(a=>a.user.bot ==false).size;
  const voicech = guild.channels.filter(a=>a.type =='voice').map(a=>a.members.size);
  var voiceusers=0;
  for(var i=0;i<voicech.length;i++) {
  voiceusers+=voicech[i];
   };
  const reg= message.guild.region;
  const name = message.guild.name;
  const cht = guild.channels.filter(a=>a.type == 'text').size
  const chv = guild.channels.filter(a=>a.type == 'voice').size
  const defr = `everyone`
  const verify = guild.verificationLevel
  var v1 =""
  if(verify ==0) v1 ='Güvenlik Yok.'
  if(verify ==1) v1 ='Güvenlik seviyesi düşük.'
  if(verify ==2) v1 ='Güvenlik seviyesi orta düzey.'
  if(verify ==3) v1 ='Güvenlik seviyesi üst düzey.'
  if(verify ==4) v1 ='Güvenlik seviyesi max düzey.'
  const crat = guild.createdAt.toLocaleString()
  var afkch =''
  if(guild.afkChannel !=null) afkch = `Var \`${guild.afkChannel.name}\``
  if(guild.afkChannel ==null) afkch = 'Yok'
  const emojis = guild.emojis.map(a=>a).join('~')
  const rols = guild.roles.filter(a=>a.name !='@everyone').map(w=>w).join('-')
  var e=''
  if(emojis.length <1) e='Emoji yok'
  if(emojis.length >=1) e= `Bunlarda emojiler ${emojis}`
  const onmem = guild.members.filter(a=>a.user.presence.status !='offline').filter(a=>a.user.bot ==false).size
  const embed = new Discord.RichEmbed()
  .setColor(message.member.highestRole.hexColor)
  .setTitle(`${name} Sunucusu hakkında bilgi.`)
  .setFooter(`${message.member.user.username} Tarafından istenildi.`,message.author.avatarURL)
  .addField('İsmi:',name,true)
  .addField('Sunucu sahibi:',message.guild.owner.user.tag)
  .addField('Üye sayısı (Botlar Hariç):',users,true)
  .addField('Bot sayısı:',bots,true)
  .addField('Güvenlik seviyesi:',`${v1}  \`${verify}\``)
  .addField('Kurulma tarihi:',crat)
  .addField('Varsayılan rol:',defr,true)
  .addField('Yazışma kanalı sayısı:',cht,true)
  .addField('Sesli kanal sayısı',chv,true)
  .addField('Aktif üye sayısı:',onmem,true)
  .addField('Seslideki üye sayısı:',`**${voiceusers}**`,true)
  .addField('Sunucu bölgesi:',reg,true)
  .addField('AFK kanalı:',afkch,true)
  .setImage(message.guild.iconURL)
  .setThumbnail(message.guild.owner.user.avatarURL)

  await message.channel.send(embed)
  const embed2 = new Discord.RichEmbed()
  .setColor(message.member.highestRole.hexColor)
  .setTitle(`${name} Sunucusu hakkında geri kalanlar`)
  .addField('Sunucudaki roller:',rols)
  .addField('Toplam emoji sayısı:',guild.emojis.size)
  await message.channel.send(embed2)
  message.channel.send(e)
};

exports.conf = {
  enabled: true, //komutut açtık
  guildOnly: false, //sadece servere özel yapmadık
  aliases: ['serverinfo'], //farklı çağrılar ekledik
  permLevel: 0 //kimlerin kullanabileceğini yazdık (bot.js dosyasında perm leveller yazıyor)
};

exports.help = {
  name: 'sunucubilgi', //adını belirledik (kullanmak için gereken komut)
  description: 'Sunucu bilgi.', //açıklaması
  usage: 'sunucubilgi' //komutun kullanım şekli (mesela hava <bölge>)
};
