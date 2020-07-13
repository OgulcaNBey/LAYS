const Discord = require('discord.js')
const data = require('quick.db')

exports.run = async (client, message, args) => {
let prefix = '.'// botun prefixi

if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`Yetkin yok.`)
if(!args[0]) return message.channel.send(`Sistemi kullanmak için, ${prefix}uyarı ekle/sil/bilgi komutlarını kullanın.`)


if(args[0] === 'ekle') {
let kullanıcı = message.mentions.users.first()
if(!args[1]) return message.channel.send(`Bir kişiyi etiketlemelisin.`)
if(!kullanıcı) return message.channel.send(`${args[1]}, kullanıcısını sunucuda bulamıyorum.`)
if(kullanıcı.bot) return message.channel.send(`Botları uyaramam.`)
if(kullanıcı.id === message.author.id) return message.channel.send(`Kendini uyaramazsın.`)
let reason = args.slice(2).join(' ')

data.add(`uyarı.${message.guild.id}.${kullanıcı.id}`, +1)
const syı = await data.fetch(`uyarı.${message.guild.id}.${kullanıcı.id}`)

if(!reason) {
await message.channel.send(`${kullanıcı}, uyarıldı!\nToplam uyarı sayısı: ${syı}`)
await kullanıcı.send(`${kullanıcı}, merhaba! ${message.guild.name} sunucusunda sebepsiz bir şekilde uyarıldın. Dikkatli ol!`) 
return}

if(reason) {
await message.channel.send(`${kullanıcı}, uyarıldı!\nToplam uyarı sayısı: ${syı}`)
await kullanıcı.send(`${kullanıcı}, merhaba! ${message.guild.name} sunucusunda ${reason} sebebiyle uyarıldın. Dikkatli ol!`) 
return} }

if(args[0] === 'sil') {
let kullanıcı = message.mentions.users.first()
if(!args[1]) return message.channel.send(`Bir kişiyi etiketlemelisin.`)
if(!kullanıcı) return message.channel.send(`${args[1]}, kullanıcısını sunucuda bulamıyorum.`)
if(kullanıcı.id === message.author.id) return message.channel.send(`Kendini uyaramazsın.`)

let sayı = args[2]
if(!sayı) return message.channel.send(`Silinecek uyarı sayısını yazmadın!`)
if(isNaN(sayı)) return message.channel.send(`Silinecek uyarı sayısını yazmadın!`)
if(sayı === '0') return message.channel.send(`Beni mi kandırmaya çalışıyorsun sen?`)
const syı2 = await data.fetch(`uyarı.${message.guild.id}.${kullanıcı.id}`)
if(syı2 < sayı) return message.channel.send(`${kullanıcı}, kullanıcısının uyarı sayısı: ${syı2}! Sadece bu kadar silebilirsin.`)

data.add(`uyarı.${message.guild.id}.${kullanıcı.id}`, -sayı)
const syı = await data.fetch(`uyarı.${message.guild.id}.${kullanıcı.id}`)
await message.channel.send(`${kullanıcı}, uyarısı silindi!\nToplam uyarı sayısı: ${syı ? syı : '0'}`)
await kullanıcı.send(`${kullanıcı}, merhaba! ${message.guild.name} sunucusunda uyarın silindi. Daha dikkatli ol!`) }

if(args[0] === 'bilgi') {
let kullanıcı = message.mentions.users.first()
if(!args[1]) return message.channel.send(`Bir kişiyi etiketlemelisin.`)
if(!kullanıcı) return message.channel.send(`${args[1]}, kullanıcısını sunucuda bulamıyorum.`)

const syı2 = await data.fetch(`uyarı.${message.guild.id}.${kullanıcı.id}`)
if(!syı2) return message.channel.send(`${kullanıcı}, kullanıcısının hiç uyarısı yok.`)
await message.channel.send(`${kullanıcı}:\nToplam uyarı sayısı: ${syı2 ? syı2 : '0'}`) }
};

exports.conf = {
enabled: true,
guildOnly: false,
aliases: ['warn'],
permLevel: 0,
}

exports.help = {
name: 'uyarı'
}