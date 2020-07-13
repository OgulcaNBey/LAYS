const Discord = require('discord.js');
const db = require('quick.db')
exports.run = async(client, message, args) => {
let onlycode = db.fetch(`onlycode.botbakim`)
if(onlycode) {
message.channel.send(`Bot başarıyla bakım modundan çıkarıldı.`)
db.delete(`onlycode.botbakim`)
};

if(!onlycode) {
message.channel.send(`Botu başarıyla bakıma aldınız, bakımdan çıkarmak için aynı mesaj yazınız.`)
db.set(`onlycode.botbakim`, 'aktif')
}};

exports.conf = {
enabled: true,
guildOnly: false,
aliases: [`bakim`],
permLevel: 0
};

exports.help = {
name: 'bakım',
description: 'Botu bakıma alırsınız.',
usage: 'bakım'
};