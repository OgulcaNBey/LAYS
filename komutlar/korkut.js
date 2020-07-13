const ayarlar = require('../ayarlar.json');

exports.run = (client, message, params) => {
    if (!message.guild) {
    const ozelmesajuyari = new Discord.RichEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('Korkut')
    return message.author.sendEmbed(ozelmesajuyari); }
    if (message.channel.type !== '..') {
      const sunucubilgi = new Discord.RichEmbed()
    .setAuthor('Ömcek korktun mu ? Korkmadın mı ?')
    .setColor('RANDOM')
    .setTimestamp()
    .setDescription('Hayalet Korktun mu ?')
        .setImage(`https://78.media.tumblr.com/452063fcc1533a028f27cba85291d644/tumblr_ms8w5wWoOT1spwp48o1_500.gif`)
    return message.channel.sendEmbed(sunucubilgi);
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'korkut'
};