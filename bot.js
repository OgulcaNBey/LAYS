const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");//Lord Creative
const chalk = require("chalk");//Lord Creative
const moment = require("moment");//Lord Creative
var Jimp = require("jimp");//Lord Creative
const { Client, Util } = require("discord.js");//Lord Creative
const weather = require("weather-js");//Lord Creative
const fs = require("fs");//Lord Creative
const db = require("quick.db");//Lord Creative
const http = require("http");//Lord Creative
const express = require("express");//Lord Creative
require("./util/eventLoader.js")(client);//Lord Creative
const path = require("path");//Lord Creative
const request = require("request");//Lord Creative
const snekfetch = require("snekfetch");//Lord Creative
const queue = new Map();//Lord Creative
const YouTube = require("simple-youtube-api");//Lord Creative
const ytdl = require("ytdl-core");//Lord Creative
const sqlite = require ("sqlite");

const app = express();//Lord Creative
app.get("/", (request, response) => {//Lord Creative
  console.log(Date.now() + "Lord Creative  7/24 AKTİF TUTMA İŞLEMİ BAŞARILI");//Lord Creative
  response.sendStatus(200);//Lord Creative
});//Lord Creative
app.listen(process.env.PORT);//Lord Creative
setInterval(() => {//Lord Creative
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);//Lord Creative
}, 280000);//Lord Creative
//Lord Creative
var prefix = ayarlar.prefix;//Lord Creative

const log = message => {//Lord Creative
  console.log(`${message}`);//Lord Creative
};

client.commands = new Discord.Collection();//Lord Creative
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });//Lord Creative
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }//Lord Creative
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);//Lord Creative
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {//Lord Creative
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }//Lord Creative
  });
};

sqlite.open(path.join(__dirname, "database.sqlite3")).then((db) => {
  client.setProvider(new SQLiteProvider(db));
});

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {//Lord Creative
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {//Lord Creative
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);
/////

//---------------------------------KOMUTLAR---------------------------------\\
//Lord Creative
///otorol///
client.on("guildMemberAdd", async (member, guild, message) => {
  let role = db.fetch(`otorolisim_${member.guild.id}`);
  let otorol = db.fetch(`autoRole_${member.guild.id}`);//Lord Creative
  let i = db.fetch(`otorolKanal_${member.guild.id}`);
  if (!otorol || otorol.toLowerCase() === "yok") return;
  else {
    try {
      if (!i) return;
      if (!role) {
        member.addRole(member.guild.roles.get(otorol));
        var embed = new Discord.RichEmbed()
          .setDescription(
            "**Sunucuya Yeni Katılan** @" +
              member.user.tag +
              " **Kullanıcısına** <@&" +
              otorol +
              ">  **Rolü verildi:white_check_mark:**"
          )
          .setColor("0x36393E")
          .setFooter(`Lays Otorol Sistemi`);
        member.guild.channels.get(i).send(embed);
      } else if (role) {
        member.addRole(member.guild.roles.get(otorol));
        var embed = new Discord.RichEmbed()
          .setDescription(
            `**Sunucuya Yeni Katılan** \`${member.user.tag}\` **Kullanıcısına** \`${role}\` **Rolü verildi.**`
          )
          .setColor("0x36393E")
          .setFooter(`Lays Otorol Sistemi`);
        member.guild.channels.get(i).send(embed);
      }
    } catch (e) {
      console.log(e);
    }
  }
});
///küfür///
client.on("message", async msg => {
  if (msg.author.bot) return;
  if (msg.channel.type === "dm") return;

  let i = await db.fetch(`küfürFiltre_${msg.guild.id}`);
  if (i == "acik") {
    const küfür = [
      "amcık",
      "yarrak",
      "orospu",
      "piç",
      "sikerim",
      "sikik",
      "amına",
      "pezevenk",
      "yavşak",
      "ananı",
      "anandır",
      "orospu",
      "evladı",
      "göt",
      "pipi",
      "sokuk",
      "yarak",
      "bacını",
      "karını",
      "amk",
      "aq",
      "mk",
      "anaskm"
    ];
    if (küfür.some(word => msg.content.toLowerCase().includes(word))) {
      try {
        if (!msg.member.hasPermission("MANAGE_WEBHOOKS")) {
          msg.delete();
          let embed = new Discord.RichEmbed()
            .setColor(0xffa300)
            .setFooter("Lays Küfür Sistemi", client.user.avatarURL)
            .setAuthor(
              msg.guild.owner.user.username,
              msg.guild.owner.user.avatarURL
            )
            .setDescription(
              "PinkCode, " +
                `***${msg.guild.name}***` +
                " adlı sunucunuzda küfür yakaladım."
            )
            .addField(
              "Küfür Eden Kişi",
              "Kullanıcı: " + msg.author.tag + "\nID: " + msg.author.id,
              true
            )
            .addField("Engellenen mesaj", msg.content, true)
            .setTimestamp();
          msg.guild.owner.user.send(embed);
          return msg.channel
            .send(
              `${msg.author}, Bu Sunucuda Küfür Edemezsin!`
            )
            .then(msg => msg.delete(25000));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!i) return;
});
///reklam///
client.on("message", async msg => {
  let antoxd = await db.fetch(`antoxd${msg.guild.id}`);
  if (antoxd === "acik") {//Lord Creative
    const reklam = ["discord.gg", "https://discordapp.com/invite/"];
    if (reklam.some(word => msg.content.includes(word))) {
      msg.delete();
    }
  }
});
///sayaç///
client.on("guildMemberAdd", async member => {
  let frenzysayı = await db.fetch(`FrenzyCode+SayaçSayı_${member.guild.id}`);
  let frenzykanal = await db.fetch(`FrenzyCode+SayaçKanal_${member.guild.id}`);
  if (!frenzysayı || !frenzykanal) return;
  let sonuç = frenzysayı - member.guild.memberCount;
  client.channels
    .get(frenzykanal)
    .send(
      ` | O Sunucumuza Yeni Biri Geldi Ve İsmi ${member}, Hoşgeldin  **${frenzysayı}** Kişiye Ulaşmak İçin  **${sonuç}** Kişi Kaldı.`
    );
});
client.on("guildMemberRemove", async member => {
  let frenzysayı = await db.fetch(`FrenzyCode+SayaçSayı_${member.guild.id}`);
  let frenzykanal = await db.fetch(`FrenzyCode+SayaçKanal_${member.guild.id}`);
  if (!frenzysayı || !frenzykanal) return;
  let sonuç = frenzysayı - member.guild.memberCount;

  client.channels
    .get(frenzykanal)
    .send(
      `> | Olamaz ${member}, Sunucudan Ayrıldı! **${frenzysayı}** Kişiye Ulaşmak İçin  **${sonuç}** Kişi Kaldı.`
    );
  return;
});

///reklam-engelle///
client.on("message", async msg => {
  if (msg.author.bot) return;
  if (msg.channel.type === "dm") return;

  let i = await db.fetch(`reklamFiltre_${msg.guild.id}`);
  if (i == "acik") {
    const reklam = [
      "discord.app",
      "discord.gg",
      "invite",
      "discordapp",
      "discordgg",
      ".com",
      ".net",//Lord Creative
      ".xyz",
      ".tk",
      ".pw",
      ".io",
      ".me",
      ".gg",
      "www.",
      "https",
      "http",
      ".gl",
      ".org",
      ".com.tr",
      ".biz",
      ".party",
      ".rf.gd",
      ".az"
    ];
    if (reklam.some(word => msg.content.toLowerCase().includes(word))) {
      try {
        if (!msg.member.hasPermission("MANAGE_GUILD")) {
          msg.delete();
          let embed = new Discord.RichEmbed()
            .setColor(0xffa300)
            .setFooter(
              "Lays BOT  -|-  Reklam engellendi.",
              client.user.avatarURL
            )
            .setAuthor(
              msg.guild.owner.user.username,
              msg.guild.owner.user.avatarURL
            )
            .setDescription(
              "Lays Reklam Sistemi, " +
                `**${msg.guild.name}**` +
                " Adlı Sunucuda Reklam Yakaladım."
            )
            .addField(
              "Reklamı yapan kişi",
              "Kullanıcı: " + msg.author.tag + "\nID: " + msg.author.id,
              true
            )
            .addField("Engellenen mesaj", msg.content, true)
            .setTimestamp();
          msg.guild.owner.user.send(embed);
          return msg.channel
            .send(`${msg.author.tag}, Reklam Yapmak Yasak!`)
            .then(msg => msg.delete(25000));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!i) return;
});
///davet-ayarla///
const invites = {};

const wait = require('util').promisify(setTimeout);

client.on('ready', () => {

  wait(1000);

  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});

client.on('guildMemberAdd', member => {



  member.guild.fetchInvites().then(guildInvites => {

    if (db.has(`dKanal_${member.guild.id}`) === false) return
    const channel = db.fetch(`dKanal_${member.guild.id}`).replace("<#", "").replace(">", "")

    const ei = invites[member.guild.id];

    invites[member.guild.id] = guildInvites;

    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);

    const davetçi = client.users.get(invite.inviter.id);
     db.add(`davet_${invite.inviter.id + member.guild.id}`,1)
let bal  = db.fetch(`davet_${invite.inviter.id + member.guild.id}`)
   member.guild.channels.get(channel).send(` ** <@${member.id}> Joined**; İnvited by **${davetçi.tag}** (`+'**'+bal+'** invites)')
  })

});
client.on("guildMemberRemove", async member => {
//Lord Creative
    member.guild.fetchInvites().then(guildInvites => {

      const ei = invites[member.guild.id];

    invites[member.guild.id] = guildInvites;

    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);

       db.subtract(`davet_${invite.inviter.id + member.guild.id}`,1)
    })
})

//------SON ÜYEMİZ-------
client.on("guildMemberAdd", async member => {
let frenzy_c = client.channels.get("715270051107831809");
frenzy_c.setName(`Son Üye : ${member.user.username}`)
})

//--------SUNUCUYA BOT KATILINCA MESAJ--------
client.on('guildMemberAdd', async member => {
if(!member.user.bot) return
  member.guild.channels.get('715268499483787314').send('Sunucuda bir bot katıldı! '+member)
})

//-------DÜZENLENEN MESAJDA KÜFÜR VE REKLAM ENGELLEME------
client.on("messageUpdate", (old, nev) => {
  if (old.content != nev.content) {
    const yasak = [
      "discord.app",
      "discord.gg",
      "invite",
      "discordapp",
      "discordgg",
      ".com",
      ".net",
      ".xyz",
      ".tk",
      ".pw",
      ".io",
      ".me",
      ".gg",
      "www.",
      "https",
      "http",
      ".gl",
      ".org",
      ".com.tr",
      ".biz",
      ".party",
      ".rf.gd",
      ".az",
      "sg",
      "oç",
      "oçe",
      "anan",
      "ananı",
      "ananı sikim",
      "anneni sikim",
      "anneni sikeyim",
      "ananı sikeyim",
      "annen",
      "ağzına",
      "ağzına sıçim",
      "ağzına sıçayım",
      "ağzına s",
      "am",
      "ambiti",
      "amını",
      "amını s",
      "amcık",
      "amcik",
      "amcığını",
      "amciğini",
      "amcığını",
      "amcığını s",
      "amck",
      "amckskm",
      "amcuk",
      "amına",
      "amına k",
      "amınakoyim",
      "amına s",
      "amunu",
      "amını",
      "amın oğlu",
      "amın o",
      "amınoğlu",
      "amk",
      "aq",
      "amnskm",
      "anaskm",
      "ananskm",
      "amkafa",
      "amk çocuğu",
      "amk oç",
      "piç",
      "amk ç",
      "amlar",
      "amcıklar",
      "amq",
      "amındaki",
      "amnskm",
      "ananı",
      "anan",
      "ananın am",
      "ananızın",
      "aneni",
      "aneni s",
      "annen",
      "anen",
      "ananın dölü",
      "sperm",
      "döl",
      "anasının am",
      "anası orospu",
      "orospu",
      "orosp,",
      "kahpe",
      "kahbe",
      "kahße",
      "ayklarmalrmsikerim",
      "ananı avradını",
      "avrat",
      "avradını",
      "avradını s",
      "babanı",
      "babanı s",
      "babanın amk",
      "annenin amk",
      "ananın amk",
      "bacı",
      "bacını s",
      "babası pezevenk",
      "pezevenk",
      "pezeveng",
      "kaşar",
      "a.q",
      "a.q.",
      "bitch",
      "çük",
      "yarrak",
      "am",
      "cibiliyetini",
      "bokbok",
      "bombok",
      "dallama",
      "göt",
      "götünü s",
      "ebenin",
      "ebeni",
      "ecdadını",
      "gavat",
      "gavad",
      "ebeni",
      "ebe",
      "fahişe",
      "sürtük",
      "fuck",
      "gotten",
      "götten",
      "göt",
      "gtveren",
      "gttn",
      "gtnde",
      "gtn",
      "hassiktir",
      "hasiktir",
      "hsktr",
      "haysiyetsiz",
      "ibne",
      "ibine",
      "ipne",
      "kaltık",
      "kancık",
      "kevaşe",
      "kevase",
      "kodumun",
      "orosbu",
      "fucker",
      "penis",
      "pic",
      "porno",
      "sex",
      "sikiş",
      "s1kerim",
      "s1k",
      "puşt",
      "sakso",
      "sik",
      "skcm",
      "siktir",
      "sktr",
      "skecem",
      "skeym",
      "slaleni",
      "sokam",
      "sokuş",
      "sokarım",
      "sokarm",
      "sokaym",
      "şerefsiz",
      "şrfsz",
      "sürtük",
      "taşak",
      "taşşak",
      "tasak",
      "tipini s",
      "yarram",
      "yararmorospunun",
      "yarramın başı",
      "yarramınbaşı",
      "yarraminbasi",
      "yrrk",
      "zikeyim",
      "zikik",
      "zkym"
    ];
    if (yasak.some(banned => nev.content.includes(banned))) {
      if (!nev.member.hasPermission("MANAGE_MESSAGES")) {
        try {
          nev.delete();
          nev.channel.send(
            `<@${nev.author.id}>, bu sunucuda mesajını düzenleyerek küfür edemez veya reklam yapamazsın!`
          );
          nev.author.send(
            `<@${nev.author.id}>, **${nev.guild.name}** adlı sunucuda mesajını düzenleyerek küfür edemez veya reklam yapamazsın!`
          );
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
});
  //KANALA-SÜREKLİ-MESAJ
  client.on('ready', () => {
    var testChannel = client.channels.find(channel => channel.id === '711856302057586729');
    setInterval (() => {
    testChannel.send(".yardım yazarak komutlarımızı görebilirsiniz. | Lütfen Üyelerimize Karşı Saygılı Olunuz");
    },18000000); // SÜRE GİRİNİZ MİLİSANİYE HALİNDE GIRINIZ ÖRNEK 5 SAAT KAÇ MİLİSANİYEDİR ONU BURAYA GİRİNİZ
    });
//AFK
client.on('message', async codeming => {
  let berk = require('quick.db')
  let codemingp = await db.fetch(`prefix_${codeming.guild.id}`) || ayarlar.prefix

  let yasinveilayda = codeming.mentions.users.first() || codeming.author
  let afkdkullanıcı = await db.fetch(`codemingafk_${codeming.author.id}`)
  let afkkullanıcı = await db.fetch(`codemingafk_${yasinveilayda.id}`)
  let sebep = afkkullanıcı

  if (codeming.author.bot) return;
 if (codeming.content.includes(`${codemingp}afk`)) return;
  if (codeming.content.includes(`<@${yasinveilayda.id}>`)) {
    if (afkdkullanıcı) {
      codeming.reply(`Artık AFK Değilsin!`)
      berk.delete(`codemingafk_${codeming.author.id}`)
      codeming.member.setNickname("");
    }
    if (afkkullanıcı) return codeming.channel.send(`**${yasinveilayda.tag}** \`${sebep}\` Sebebiyle Afk!`)
  }

  if (!codeming.content.includes(`<@${yasinveilayda.id}>`)) {
    if (afkdkullanıcı) {
      codeming.reply(`Artık AFK Değilsin!`)
      berk.delete(`codemingafk_${codeming.author.id}`)
      codeming.member.setNickname("");
    }
  }
  })
    //SA-AS
    client.on('message', async (msg, member, guild) => {
      let i = await  db.fetch(`saas_${msg.guild.id}`)
          if(i === 'açık') {
            if (msg.content.toLowerCase() === 'sa') {
            msg.reply('Aleyküm Selam Hoşgeldin');
          }
          }
        });
      //GİRİŞ-ÇIKIŞ
      //Kod Mustafa Arda = CrazyNoob#2309 'a Aittir.  CODE ARE <3
//Kod Mustafa Arda = CrazyNoob#2309 'a Aittir.  CODE ARE <3


client.on("guildMemberAdd", async member => {
  const fs = require('fs');
   let gkanal = JSON.parse(fs.readFileSync("./ayarlar/glog.json", "utf8"));
   const gözelkanal = member.guild.channels.get(gkanal[member.guild.id].resim)
   if (!gözelkanal) return;
    let username = member.user.username;
       if (gözelkanal === undefined || gözelkanal === null) return;
       if (gözelkanal.type === "text") {
           const bg = await Jimp.read("https://cdn.discordapp.com/attachments/450693709076365323/473184528148725780/guildAdd.png");
           const userimg = await Jimp.read(member.user.avatarURL);
           var font;
           if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
           else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
           else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
           await bg.print(font, 430, 170, member.user.tag);
           await userimg.resize(362, 362);
           await bg.composite(userimg, 43, 26).write("./img/"+ member.id + ".png");
             setTimeout(function () {
                   gözelkanal.send(new Discord.Attachment("./img/" + member.id + ".png"));
             }, 1000);
             setTimeout(function () {
               fs.unlink("./img/" + member.id + ".png");
             }, 10000);
       }
   })

client.on("guildMemberRemove", async member => {
  const fs = require('fs');
   let gkanal = JSON.parse(fs.readFileSync("./ayarlar/glog.json", "utf8"));
   const gözelkanal = member.guild.channels.get(gkanal[member.guild.id].resim)
   if (!gözelkanal) return;
       let username = member.user.username;
       if (gözelkanal === undefined || gözelkanal === null) return;
       if (gözelkanal.type === "text") {
                       const bg = await Jimp.read("https://cdn.discordapp.com/attachments/450693709076365323/473184546477572107/guildRemove.png");
           const userimg = await Jimp.read(member.user.avatarURL);
           var font;
           if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
           else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
           else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
           await bg.print(font, 430, 170, member.user.tag);
           await userimg.resize(362, 362);
           await bg.composite(userimg, 43, 26).write("./img/"+ member.id + ".png");
             setTimeout(function () {
                   gözelkanal.send(new Discord.Attachment("./img/" + member.id + ".png"));
             }, 1000);
             setTimeout(function () {
               fs.unlink("./img/" + member.id + ".png");
             }, 10000);
       }
   })



//Kod Mustafa Arda = CrazyNoob#2309 'a Aittir.  CODE ARE <3
//BOT-DURUM
client.on('ready', () => {
  const moment = require("moment");
require("moment-duration-format");

 setInterval(() => {
const calismasure = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
let botdurum = client.channels.find(c => c.id === '731076036497899531')//Botun sürekli mesaj atacağı kanal.
const botistatistik = new Discord.RichEmbed()
    .setColor('RED')
    .setTitle('= Bot İstatistikleri =')

.addField(`RAM`,`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/6144`)
.addField(`Çalışma Süresi`,`${calismasure}`)
.addField(`Ping`,`${client.ping}`)
.addField(`discord.js`,`v${Discord.version}`)
.addField(`Bilgi`,`${client.guilds.size.toLocaleString()} sunucu ve ${client.users.array().length} kullanıcıya hizmet veriyor.`)
.setTimestamp()
botdurum.send(botistatistik);
  }, 360000); //Milisaniye cinsinden. 1 saniye =  1000 milisaniye. Örnek Olarak 1 saat = 3600000milisaniye
});
//Botun Bulunduu sunucular
client.on('ready',function(){
  console.log('Bulunduğum Sunucular:')
  let sunucular = Array.from(client.guilds.keys())
  for(var i=0; i<sunucular.length; i++){
    console.log(`>\t${client.guilds.get(sunucular[i]).name}`)
  }
})
//TİCKET
client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  if (message.content.toLowerCase().startsWith(prefix + `ticketsistemi`)) {
    const embed = new Discord.RichEmbed()
    .setAuthor(`Lays Ticket`, client.user.avatarURL)
    .setFooter(`${message.author.tag} tarafından istendi.`, message.author.avatarURL)
    .setThumbnail(client.user.avatarURL)
    .setColor(0x00ffff)
    .setTitle(`Ticket sistemi`)
    .setDescription(`Sunucunuzdaki üyeler ile özel bir kanalda konuimanazı/yardım etmenizi sağlar. Nitekim destek talebi sistemi.`)
    .addField(`Ticket Komutları`, `**[${prefix}ticketaç]()**: Destek Bildirimi Oluşturur! \n **[${prefix}ticketkapat]()**: Ticket kapatır!`)
    message.channel.send({ embed: embed });
  }


if (message.content.toLowerCase().startsWith(prefix + `ticketaç`)) {
    const reason = message.content.split(" ").slice(1).join(" ");
    if (!message.guild.roles.exists("name", "?? | Destek Ekibi")) return message.channel.send(`Bu Sunucuda '**Destek Ekibi**' rolunü bulamadam bu y�zden ticket a�am�yorum \nE�er sunucu sahibisen, Destek Ekibi Rol�n� olu�turabilirsin.`);
    if (message.guild.channels.exists("name", "destek" + message.author.id)) return message.channel.send(`Zaten açık durumda bir ticketin var.`);
    message.guild.createChannel(`ticket-${message.author.tag}`, "text").then(c => {
        let role = message.guild.roles.find("name", "?? | Destek Ekibi");
        let role2 = message.guild.roles.find("name", "@everyone");
        c.overwritePermissions(role, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        c.overwritePermissions(role2, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false
        });
        c.overwritePermissions(message.author, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        message.channel.send(`:white_check_mark: Ticket Kanalın oluşturuldu, #${c.name}.`);
        const embed = new Discord.RichEmbed()
        .setColor(0xCF40FA)
        .addField(`Hey ${message.author.username}!`, `Başarılı bir şekilde ticket açıldı.`)
        .setTimestamp();
        c.send({ embed: embed });
        message.delete();
    }).catch(console.error);
}
if (message.content.toLowerCase().startsWith(prefix + `ticketkapat`)) {
    if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`Bu komutu kullanamazsın ticket kanalında olman gerekir.`);

    message.channel.send(`Destek Kanalını kapatmaya emin misin? kapatmak için **.kapat** yazman yeterli.`)
    .then((m) => {
      message.channel.awaitMessages(response => response.content === '.kapat', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
      .then((collected) => {
          message.channel.delete();
        })
        .catch(() => {
          m.edit('Ticket Kapatma isteğin zaman aşımına uğradı.').then(m2 => {
              m2.delete();
          }, 3000);
        });
    });
}

  //Kutay Y�KSEL Taraf�ndan Haz�rlanm��t�r. Ticari Ama�lar ��in Kullan�lmas� Yasakt�r. Telif bedeli �zerinden adli i�lem hesab�na g�re uygulama yap�lacakt�r.

});
//XiR
//Mod-log
client.on('channelCreate', channel => {
  const c = channel.guild.channels.find('name', 'mod-log');
  if (!c) return;
    let embed = new Discord.RichEmbed()
                    .addField(`Kanal oluşturuldu`, `> İsmi: \`${channel.name}\`\n> Türü: **${channel.type}**\n> ID: ${channel.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${channel.client.user.username}#${channel.client.user.discriminator}`, channel.client.user.avatarURL)

    c.send(`Yeni bi kanal oluşturuldu`,{embed})
});

client.on('channelDelete', channel => {
  const c = channel.guild.channels.find('name', 'mod-log');
  if (!c) return;
    let embed = new Discord.RichEmbed()
                    .addField(`Kanal silindi`, `> İsmi: \`${channel.name}\`\n> Türü: **${channel.type}**\n> ID: ${channel.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${channel.client.user.username}#${channel.client.user.discriminator}`, channel.client.user.avatarURL)

    c.send(`Bir kanal silindi`,{embed})
});

client.on('channelUpdate', (oldChannel, newChannel) => {
  const c = newChannel.guild.channels.find('name', 'mod-log');
  if (!c) return;

    let str = '';

    if(oldChannel.name != newChannel.name)
        str+=`> İsim: \`${oldChannel.name}\` **->** \`${newChannel.name}\`\n`;



    let embed = new Discord.RichEmbed()
                    .addField(`Kanal güncellendi`, `${str}> ID: ${oldChannel.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${oldChannel.client.user.username}#${oldChannel.client.user.discriminator}`, oldChannel.client.user.avatarURL)

    c.send(`${oldChannel.name} kanalı güncellendi`,{embed})
});

client.on('emojiCreate', emoji => {
  const c = emoji.guild.channels.find('name', 'mod-log');
  if (!c) return;

    let embed = new Discord.RichEmbed()
                    .addField(`Emoji oluşturuldu`, `> İsmi: \`${emoji.name}\`\n> GIF?: **${emoji.animated}**\n> ID: ${emoji.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${emoji.client.user.username}#${emoji.client.user.discriminator}`, emoji.client.user.avatarURL)

    c.send(`Bir emoji oluşturuldu`,{embed})
    });
client.on('emojiDelete', emoji => {
  const c = emoji.guild.channels.find('name', 'mod-log');
  if (!c) return;

    let embed = new Discord.RichEmbed()
                    .addField(`Emoji silindi`, `> İsmi: \`${emoji.name}\`\n> GIF? : **${emoji.animated}**\n> ID: ${emoji.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${emoji.client.user.username}#${emoji.client.user.discriminator}`, emoji.client.user.avatarURL)

    c.send(`Bir emoji silindi`,{embed})
    });
client.on('emojiUpdate', (oldEmoji, newEmoji) => {
  const c = newEmoji.guild.channels.find('name', 'mod-log');
  if (!c) return;

    let embed = new Discord.RichEmbed()
                    .addField(`Emoji güncellendi`, `> Eski ismi: \`${oldEmoji.name}\`\n> Yeni ismi: \`${newEmoji.name}\`\n> ID: ${oldEmoji.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${newEmoji.client.user.username}#${newEmoji.client.user.discriminator}`, newEmoji.client.user.avatarURL)

    c.send(`Bir emoji güncellendi`,{embed})
    });

client.on('guildBanAdd', async (guild, user) => {
    const channel = guild.channels.find('name', 'mod-log');
  if (!channel) return;

  const entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first())

    let embed = new Discord.RichEmbed()
                    .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
                    .addField(`Kullanıcı banlandı`, `> İsmi: \`${user.username}\`\n> ID: **${user.id}**\nSebep: **${entry.reason || 'Girilmedi'}**`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${entry.executor.username}#${entry.executor.discriminator} tarafından`, entry.executor.avatarURL)

    channel.send(`**${user.username}#${user.discriminator}** kullanıcısı, **${entry.executor.username}#${entry.executor.discriminator}** tarafından banlandı`,{embed})
});

client.on('guildBanRemove', async (guild, user) => {
    const channel = guild.channels.find('name', 'mod-log');
  if (!channel) return;

  const entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first())

    let embed = new Discord.RichEmbed()
                    .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
                    .addField(`Kullanıcının banı açıldı`, `> İsmi: \`${user.username}\`\n> ID: **${user.id}**\n`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${entry.executor.username}#${entry.executor.discriminator} tarafından`, entry.executor.avatarURL)

    channel.send(`**${user.username}#${user.discriminator}** kullanıcısının, **${entry.executor.username}#${entry.executor.discriminator}** tarafından kaldırıldı`,{embed})
});
client.on('messageDelete', async message => {
  if(message.author.bot) return

    const channel = message.guild.channels.find('name', 'mod-log');
  if (!channel) return;

    let embed = new Discord.RichEmbed()
                    .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL)
                    .addField(`Mesaj silindi`, `> Mesaj: \`${message.content}\`\n> Kanal: **${message.channel.name}**\n> ID: ${message.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${message.client.user.username}#${message.client.user.discriminator}`, message.client.user.avatarURL)

    channel.send(`**${message.author.username}#${message.author.discriminator}** tarafından gönderilen mesaj, ${message.channel} kanalından silindi`,{embed})
});

client.on('messageUpdate', async (oldMessage, newMessage) => {
      if(oldMessage.author.bot) return;
    if(oldMessage.content == newMessage.content) return;

    const channel = oldMessage.guild.channels.find('name', 'mod-log');
  if (!channel) return;

    let embed = new Discord.RichEmbed()
                    .setAuthor(`${oldMessage.author.username}#${oldMessage.author.discriminator}`, oldMessage.author.avatarURL)
                    .addField(`Mesaj güncellendi`, `> Eski mesaj: \`${oldMessage.content}\`\n> Yeni mesaj: \`${newMessage.content}\`\n> Kanal: **${oldMessage.channel.name}**\n> ID: ${oldMessage.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${oldMessage.client.user.username}#${oldMessage.client.user.discriminator}`, oldMessage.client.user.avatarURL)

    channel.send(`**${oldMessage.author.username}#${oldMessage.author.discriminator}** tarafından gönderilen mesaj, ${oldMessage.channel} kanalında güncellendi`,{embed})
});

client.on('roleCreate', async (role) => {

    const channel = role.guild.channels.find('name', 'mod-log');
  if (!channel) return;

    let embed = new Discord.RichEmbed()
.addField(`Rol oluşturuldu`, `> ismi: \`${role.name}\`\n> ID: ${role.id}`)
.setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${role.client.user.username}#${role.client.user.discriminator}`, role.client.user.avatarURL)

    channel.send(`yeni bir rol oluşturuldu`,{embed})
});

client.on('roleCreate', async (role) => {

    const channel = role.guild.channels.find('name', 'mod-log');
  if (!channel) return;

    let embed = new Discord.RichEmbed()
.addField(`Rol silindi`, `> ismi: \`${role.name}\`\n> ID: ${role.id}`)
.setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${role.client.user.username}#${role.client.user.discriminator}`, role.client.user.avatarURL)

    channel.send(`bir rol silindi`,{embed})
});

client.on('voiceStateUpdate', async (oldMember, newMember) => {

    let oldVoice = oldMember.voiceChannel;
    let newVoice = newMember.voiceChannel;


      if(!oldVoice) {
          var c = newMember.guild.channels.find('name', 'mod-log');
  if (!c) return;
        let embed = new Discord.RichEmbed()

        embed.setAuthor(`${newMember.user.username}#${newMember.user.discriminator}`, newMember.user.avatarURL)
        .addField(`Sesli kanala katıldı`, `> İsmi: \`${newMember.user.username}\`\n> ID: **${newMember.user.id}**`)
        .setTimestamp()
        .setColor("RANDOM")
        .setFooter(`${newMember.client.user.username}#${newMember.client.user.discriminator}`, newMember.client.user.avatarURL)

        c.send(`**${oldMember.user.username}#${oldMember.user.discriminator}** sesli bir kanala katıldı`,{embed})
    } else if (!newVoice) {
              var c = oldMember.guild.channels.find('name', 'mod-log');
  if (!c) return;
        let embed = new Discord.RichEmbed()

        embed.setAuthor(`${oldMember.user.username}#${oldMember.user.discriminator}`, oldMember.user.avatarURL)
        .addField(`Sesli kanaldan ayrıldı`, `> İsmi: \`${oldMember.user.username}\`\n> ID: **${oldMember.user.id}**`)
        .setTimestamp()
        .setColor("RANDOM")
        .setFooter(`${oldMember.client.user.username}#${oldMember.client.user.discriminator}`, oldMember.client.user.avatarURL)

        c.send(`**${oldMember.user.username}#${oldMember.user.discriminator}** sesli bir kanaldan ayrıldı`,{embed})
    }

});
//XiR
//BOT-PANEL
client.on('message', async message => {
  const ms = require('ms');
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  let u = message.mentions.users.first() || message.author;
  if (command === "botpaneltemizle") {
 if (!message.guild.channels.find(channel => channel.name === "Bot Kullanımı")) return message.channel.send(" Bot Panel ayarlanmamış.")
   if (!message.member.hasPermission('ADMINISTRATOR'))
  return message.channel.send(" Yetkin bulunmuyor.");
    const a = message.guild.channels.find(channel => channel.name === "Bot Kullanımı").delete()
      if(!a) return console.log("guildStats")
      const b = message.guild.channels.find(channel => channel.name === `Bellek Kullanımı: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`).delete()
      if(!b) return console.log("guildStatsMember")
      const c = message.guild.channels.find(channel => channel.name === `Kullanıcılar: ${client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`).delete()
      if(!c) return console.log("guildStatsBot")
      const d = message.guild.channels.find(channel => channel.name === `Toplam Kanal: ${client.channels.size.toLocaleString()}`).delete() //|| message.guild.channels.find(channel => channel.name === `Kanal sayısı: ${message.guild.channels.size-1}`).delete() || message.guild.channels.find(channel => channel.name === `Kanal sayısı: ${message.guild.channels.size-1}`).delete() || message.guild.channels.find(channel => channel.name === `Kanal sayısı: ${message.guild.channels.size-2}`).delete()
      if(!d) return console.log("guildStatsChannel")
         const e = message.guild.channels.find(channel => channel.name === `Ping: ${client.ping}`).delete() //|| message.guild.channels.find(channel => channel.name === `Kanal sayısı: ${message.guild.channels.size-1}`).delete() || message.guild.channels.find(channel => channel.name === `Kanal sayısı: ${message.guild.channels.size-1}`).delete() || message.guild.channels.find(channel => channel.name === `Kanal sayısı: ${message.guild.channels.size-2}`).delete()
      if(!e) return console.log("guildStatsChannel")
            const f = message.guild.channels.find(channel => channel.name === `Yapımcım: Adonis`).delete() //|| message.guild.channels.find(channel => channel.name === `Kanal sayısı: ${message.guild.channels.size-1}`).delete() || message.guild.channels.find(channel => channel.name === `Kanal sayısı: ${message.guild.channels.size-1}`).delete() || message.guild.channels.find(channel => channel.name === `Kanal sayısı: ${message.guild.channels.size-2}`).delete()
      if(!f) return console.log("guildStatsChannel")
               const g = message.guild.channels.find(channel => channel.name === `Kütüphanesi: Discord.js`).delete() //|| message.guild.channels.find(channel => channel.name === `Kanal sayısı: ${message.guild.channels.size-1}`).delete() || message.guild.channels.find(channel => channel.name === `Kanal sayısı: ${message.guild.channels.size-1}`).delete() || message.guild.channels.find(channel => channel.name === `Kanal sayısı: ${message.guild.channels.size-2}`).delete()
      if(!g) return console.log("guildStatsChannel")
      message.channel.send(" Kanallar temizlendi.")
    }
  if (command === "botpanel") {
  if (message.guild.channels.find(channel => channel.name === "Bot Kullanımı")) return message.channel.send(" Bot Paneli Zaten Ayarlanmış.")
  message.channel.send(`Bot Bilgi Kanallarının kurulumu başlatılsın mı? başlatılacak ise **yes** yazınız.`)
      if (!message.member.hasPermission('ADMINISTRATOR'))
  return message.channel.send(" Yetkin bulunmuyor.");
      message.channel.awaitMessages(response => response.content === 'yes', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
    .then((collected) => {
   message.guild.createChannel('Bot Kullanımı', 'category', [{
  id: message.guild.id,
  deny: ['SPEAK'],
  deny: ['CONNECT']
}]);

 message.guild.createChannel(`Bellek Kullanımı: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, 'voice')
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "Bot Kullanımı")));
message.guild.createChannel(`Kullanıcılar: ${client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`, 'voice')
.then(channel =>
       channel.setParent(message.guild.channels.find(channel => channel.name === "Bot Kullanımı")));
message.guild.createChannel(`Sunucular: ${client.guilds.size.toLocaleString()}  `, 'voice')
.then(channel =>
             channel.setParent(message.guild.channels.find(channel => channel.name === "Bot Kullanımı")));
message.guild.createChannel(`Toplam Kanal: ${client.channels.size.toLocaleString()}`, 'voice')
.then(channel =>
             channel.setParent(message.guild.channels.find(channel => channel.name === "Bot Kullanımı")));
message.guild.createChannel(`Ping: ${client.ping}`, 'voice')
.then(channel =>
                   channel.setParent(message.guild.channels.find(channel => channel.name === "Bot Kullanımı")));
message.guild.createChannel(`Yapımcım: Adonis`, 'voice')
.then(channel =>
                   channel.setParent(message.guild.channels.find(channel => channel.name === "Bot Kullanımı")));
message.guild.createChannel(`Kütüphanesi: Discord.js`, 'voice')
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "Bot Kullanımı")));
  message.channel.send("Bot Bilgi Paneli Ayarlandı!")

        })

}
});
//XiR

//Etiketleyince-Bot-Hakkında-Bilgi-Verme
client.on('message', msg => {
  if (msg.content === '<@730709113713197066>') {
    msg.channel.send(
      new Discord.RichEmbed()
      .setTitle("Bot Hakkında")
      .setDescription("Merhaba! \n Benim Adım Lays. Benim hakkımda bütün komutları görmek için .yardım yazabilirsin. Sana hizmet etmek için buradayım. \nSana hizmet etmekten gurur duyarım. Beni Sunucuna Eklermisin \nSunucuna Eklemek İçin için .davet \n İyi Günler Dostum!")
      .setColor("RANDOM")
    )
  }
});
//FAKEKATIL
client.on('message', async message => {
  if (message.content === '.fakekatıl') { // . yerine prefixi yaz
    client.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
      }
  });
  //FKAEAYRIL
  client.on('message', async message => {
    if (message.content === '.fakeayrıl') { // . yerine prefixi yaz
      client.emit('guildMemberRemove', message.member || await message.guild.fetchMember(message.author));
        }
    });
    //EKLENDİM-ATILDIM
    client.on('guildDelete', guild => {

      let rrrsembed = new Discord.RichEmbed()

      .setColor("RED")
      .setTitle(" Bot Kickledi ")
      .addField("Sunucu Adı:", guild.name)
      .addField("Sunucu sahibi", guild.owner)
      .addField("Sunucu Sahibi'nin ID'si", guild.ownerID)
      .addField("Sunucunun Kurulu Olduğu Bölge:", guild.region)
      .addField("Sunucudaki Kişi Sayısı:", guild.memberCount)

         client.channels.get('722351991753408513').send(rrrsembed);

      });


      client.on('guildCreate', guild => {

      let rrrsembed = new Discord.RichEmbed()

      .setColor("GREEN")
      .setTitle(" Bot Eklendi ")
      .addField("Sunucu Adı:", guild.name)
      .addField("Sunucu sahibi", guild.owner)
      .addField("Sunucu Sahibi'nin ID'si", guild.ownerID)
      .addField("Sunucunun Kurulu Olduğu Bölge:", guild.region)
      .addField("Sunucudaki Kişi Sayısı:", guild.memberCount)

         client.channels.get('722351991753408513').send(rrrsembed);

      });
//BOT-DM
client.on("message", msg => {
  var dm = client.channels.get("714472485529190460")
  if(msg.channel.type === "dm") {
  if(msg.author.id === client.user.id) return;
  const botdm = new Discord.RichEmbed()
  .setTitle(`${client.user.username} Dm`)
  .setTimestamp()
  .setColor("RED")
  .setThumbnail(`${msg.author.avatarURL}`)
  .addField("Gönderen", msg.author.tag)
  .addField("Gönderen ID", msg.author.id)
  .addField("Gönderilen Mesaj", msg.content)

  dm.send(botdm)

  }
  if(msg.channel.bot) return;
  });

  //BOT EKLENIJCE KURUCUYA Mesaj
  client.on("guildCreate", guild => {
    const eklendim = new Discord.RichEmbed()
        .setColor('GREEN')
        .setTitle("Lays'ı Sunucuzuna Eklediğiniz İçin Teşekkür Ederim")
        .addField("Ana Bilgilendirme:", `".yardım" ile yardım komutlarına ulaşabilir, ".moderasyon" ile yetkili komutlarına ulaşabilirsiniz.`)
        .addField("Aynı zamanda başka özelliklerim:", `Eğlence Moderasyon Kullanıcı ve Daha Fazlası Lays`)
        .setFooter("Lays")
        .setTimestamp()
    guild.owner.send(eklendim)
    const ekler = new Discord.RichEmbed()
        .setColor('GREEN')
        .setTitle("Discord sunucumuza gelerek hem yardım alabilir, hem Botunuzun Adı daha iyi öğrenmiş olur, hemde kendi botunuzu oluşturup yardım alabilirsiniz.")
        .setDescription(`Discord: discord sunucunuz | Sunucuya geldiğinizde botun kurucuları ile konuşabilir, bazı yardımları ise yetkililerden alabilirsiniz.`)
        .addField("Botun kurucularını öğrenmek için komutlar:", ` .yapımcım`)
        .setTimestamp()
    guild.owner.send(ekler)
});

//degisen-kanal-ismi
function otokanal1() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`711856302057586729`).setName(`Lays Bot`);
            otokanal2();
        }, 3000);
      });
}

  function otokanal2() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`711856302057586729`).setName(`Sohbet`);
            otokanal3();
        }, 3000);
      });
  }
  function otokanal3() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`711856302057586729`).setName(`Kanalı`);
            otokanal1();
        }, 3000);
      });
  }

 client.on('ready', async message => {
   otokanal1();
 })
//XiR Developer
