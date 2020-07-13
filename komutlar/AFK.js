const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const yasin = require('quick.db');

exports.run = async(client, message, args) => {
  let codeming = message
  let berk = args.slice(0).join(' ')
  if(!berk) return codeming.channel.send("Lütfen bir sebep belirt")
  
  codeming.channel.send("Başarıyla **"+berk+"** sebebiyle AFK durumundasın")
codeming.member.setNickname(`AFK | ${codeming.author.username}`);
  yasin.set(`codemingafk_${codeming.author.id}`, berk)

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'afk',
    description: 'Türkiyenin Saatini Gösterir',
    usage: 'gç'
  };
