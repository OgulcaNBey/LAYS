
const Discord = require('discord.js')

exports.run = (client, message, params) => {

  const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setTitle("Lays Ping Sistemi")
  .setDescription(`[Davet Et](https://discordapp.com/oauth2/authorize?client_id=730709113713197066&scope=bot&permissions=8)`)
  .addField("API Gecikmesi:", `**${client.ping}** ms!`)
  .addField("Mesaj Gecikmesi:", `**${message.createdTimestamp - message.createdTimestamp}**`)
  .setFooter(`Lays | Ping Sistemi`)
  message.channel.send(embed)
  }
exports.conf = {
  enable: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
}
exports.help = {
  name: "ping",
  description: "botun pingini gösterir.",
  usage: "ping"
}
