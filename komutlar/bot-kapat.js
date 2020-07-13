const Discord = require("discord.js")

exports.run = async(client, message) => {
  if(message.author.id !== "418081929980674070") return message.channel.send("Sen kim beni kapatmak kim?!") 
  const embed = new Discord.RichEmbed()
  .setColor("RED")
  .setDescription("Bot kapatılıyor!")
  message.channel.send(embed).then(() => {
  process.exit()
})
}

exports.conf = {
  aliases: []
}
exports.help = {
  name: "kapat"
}
