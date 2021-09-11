const fs = require('fs');
const Discord = require('discord.js');
const { CommandoClient } = require('discord.js-commando');
const client = new Discord.Client();
const config = require('./config.json');
const Database = require("@replit/database");
const db = new Database();
const winston = require('winston');
const { MessageButton, MessageActionRow } = require('discord-buttons')
const myConsole = new console.Console(fs.createWriteStream('./msgs.txt'));
client.commands = new Discord.Collection();
require('discord-buttons')(client);

const blockedUsers = ['719463073416609854', 'id2'];
client.on('interactionCreate', interaction => {
	if (blockedUsers.includes(interaction.user.id)) return
  message.channel.send("vous êtes bak ban, vous ne pouvez pas executer de commende");
});

client.on('ready', () => client.logger.log('info', 'Le bot est en ligne!'));
client.on('debug', m => client.logger.log('debug', m));
client.on('warn', m => client.logger.log('warn', m));
client.on('error', m => client.logger.log('error', m));

//initialisation du système de log
client.logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'log' })
  ],
  format: winston.format.printf((log) => `[${new Date().toLocaleString()}] - [${log.level.toUpperCase()}] - ${log.message}`)
});



process.on('uncaughtException', error => client.logger.log('error', error));

//le bot fera ceci dès son allumage
client.on("ready", function() {
  client.user.setActivity('activity', { type: 'LISTENING' });
  client.user.setStatus('dnd');
});

client.on("ready", async () => {
  console.log(`${client.user.username} est en ligne sur ${client.guilds.size} serveurs!`);
});

//ici, on dit que les commendes ce trouvent dans le fichier "commands"
const commandFiles = fs.readdirSync('./commands')
.filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
};

// ici, ce sont les réponses de la commandes *8ball
function doMagic8BallVoodoo() {
  var rand = [':8ball: Absolument!', ':8ball: Absolument pas.', ':8ball: cest .', ':8ball: Impossible.', ':8ball: bien sur.', ':8ball: Je ne crois pas.', ':8ball: c\'est vrai.', ':8ball: c\'est pas vrai.', ':8ball: I am very undoubtful of that.', ':8ball: I am very doubtful of that.', ':8ball: Sources point to no.', ':8ball: Theories prove it.', ':8ball: Reply hazy try again', ':8ball: Ask again later', ':8ball: Better not tell you now', ':8ball: Cannot predict now', ':8ball: Concentrate and ask again'];
  return rand[Math.floor(Math.random()*rand.length)];
};


//on définit ici le préfixe du bot (ici "*") et le message d'erreur.
client.on('message', message => {
  if (!message.content.startsWith("*") || message.author.bot) return;

  const args = message.content.slice("*".length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
      console.error(error);
        message.reply('hmmm... cette commende ne fontionne pas comme il faut. l\'équipe technique à été prévenu et va essayer de regler ce problème au plus vite!');
  }
});

client.on("message", message => {
    if (message.author.bot) return; // ignore bots

    // if the user is not on db add the user and change his values to 0
    if (!db[message.author.id]) db[message.author.id] = {
        xp: 0,
        level: 0
      };
    db[message.author.id].xp++;
    let userInfo = db[message.author.id];
    if(userInfo.xp > 100) {
        userInfo.level++
        userInfo.xp = 0
        message.reply("Felicitation, tu as augmenté d'un niveau! ")
    }
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd === "info") {
        let userInfo = db[message.author.id];
        let member = message.mentions.members.first();
        let embed = new Discord.MessageEmbed()
        .setColor(0x4286f4)
        .addField("Niveau", userInfo.level)
        .addField("XP", userInfo.xp+"/100");
        if(!member) return message.channel.send(embed)
        let memberInfo = db[member.id]
        let embed2 = new Discord.MessageEmbed()
        .setColor(0x4286f4)
        .addField("Niveau", memberInfo.level)
        .addField("XP", memberInfo.xp+"/100")
        message.channel.send(embed2)
    }
    fs.writeFile("./database.json", JSON.stringify(db), (x) => {
        if (x) console.error(x)
      });
})


//commande help
client.on("message", function(message) {
  if (message.content === "*help") {
    const helpEmbed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('page d\' aide')
      .setURL('https://discord.js.org/')
      .setAuthor('botty.js v0.1-bêta', '', '')
      .setDescription('**commande pour le staff:**\n> *help-staff \n**commande pour les outils:**\n> *help-utility \n**commande pour les tickets:**\n> indisponible \n**aide pour les niveaux:** \n> *help-level \n**aide pour le premium:**\n> indisponible')
      .setThumbnail('')
      .setTimestamp()
      .setFooter('le bot étant encore en développement, certaines fonctionnalités sont susceptibles de ne pas être disponible.', '');

    message.channel.send(helpEmbed);
    console.log("help reçu!");
  }
});

client.on("message", function(message) {
  if (message.content === "*bak-help") {
    const bakhelpEmbed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Information sur le système BAK-BAN')
      .setURL('https://github.com/betawolfy/botty.js/blob/main/BAKBAN.md')
      .setAuthor('botty.js v0.1-bêta', '', '')
      .setDescription('Botty Anti Hack est un nouveau genre de technique de bannissement et d\'anti raid. le principe est que si vous avez été banni pour une cause grave (contenu sexuellement explicite, partage de donnes personnelles, raid), vous serez banni de tout les serveurs sécurisés par botty.')
      .setThumbnail('')
      .setTimestamp()
      .setFooter('vous voulez ajouter le bot sur votre serveur? rendez-vous sur le support. *support', '');

    message.channel.send(bakhelpEmbed);
    console.log("help bak-ban reçu!");
  }
});

//commande help
client.on("message", function(message) {
  if (message.content === "*help-level") {
    const helpLevelEmbed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('aide à propos du système de niveau')
      .setURL('https://discord.js.org/')
      .setAuthor('botty.js v0.1-bêta', '', '')
      .setDescription('*info: montrer votre niveau \n chaque niveau est passé par palier de 100 messages. à certains palier de niveau: \n -un badge est donné dans *userinfo; \n -une récompence est donné (priorité dans le traitement des ticket et/ou report; \n accès à certaines commendes) \n info par rapport au système: \n l\'équipe support se reserve le droit de retirer ou ajouter des niveau selon le comportement des utilisateurs. pour finir, les niveaux sont interserveurs: vous aurez le même niveau sur tout les serveurs botty secure.')
      .setThumbnail('')
      .setTimestamp()
      .setFooter('le bot étant encore en développement, certaines fonctionnalités sont susceptibles de ne pas être disponible.', '');

    message.channel.send(helpLevelEmbed);
    console.log("help reçu!");
  }
});

client.on('messageDelete', async message => {
  // Ignore direct messages
  if (!message.guild) return;
  const fetchedLogs = await message.guild.fetchAuditLogs({
    limit: 1,
    type: 'MESSAGE_DELETE',
  });
  // Since there's only 1 audit log entry in this collection, grab the first one
  const deletionLog = fetchedLogs.entries.first();

  // Perform a coherence check to make sure that there's *something*
  if (!deletionLog) return console.log(`A message by ${message.author.tag} was deleted, but no relevant audit logs were found.`);

  // Now grab the user object of the person who deleted the message
  // Also grab the target of this action to double-check things
  const { executor, target } = deletionLog;

  // Update the output with a bit more information
  // Also run a check to make sure that the log returned was for the same author's message
  if (target.id === message.author.id) {
    console.log(`A message by ${message.author.tag} was deleted by ${executor.tag}.`);
  } else {
    console.log(`A message by ${message.author.tag} was deleted, but we don't know by who.`);
  }
});

client.on('guildMemberRemove', async member => {
  const fetchedLogs = await member.guild.fetchAuditLogs({
    limit: 1,
    type: 'MEMBER_KICK',
  });
  // Since there's only 1 audit log entry in this collection, grab the first one
  const kickLog = fetchedLogs.entries.first();

  // Perform a coherence check to make sure that there's *something*
  if (!kickLog) return console.log(`${member.user.tag} left the guild, most likely of their own will.`);

  // Now grab the user object of the person who kicked the member
  // Also grab the target of this action to double-check things
  const { executor, target } = kickLog;

  // Update the output with a bit more information
  // Also run a check to make sure that the log returned was for the same kicked member
  if (target.id === member.id) {
    console.log(`${member.user.tag} left the guild; kicked by ${executor.tag}?`);
  } else {
    console.log(`${member.user.tag} left the guild, audit log fetch was inconclusive.`);
  }
});

client.on('guildBanAdd', async (guild, user) => {
  const fetchedLogs = await guild.fetchAuditLogs({
    limit: 1,
    type: 'MEMBER_BAN_ADD',
  });
  // Since there's only 1 audit log entry in this collection, grab the first one
  const banLog = fetchedLogs.entries.first();

  // Perform a coherence check to make sure that there's *something*
  if (!banLog) return console.log(`${user.tag} was banned from ${guild.name} but no audit log could be found.`);

  // Now grab the user object of the person who banned the member
  // Also grab the target of this action to double-check things
  const { executor, target } = banLog;

  // Update the output with a bit more information
  // Also run a check to make sure that the log returned was for the same banned member
  if (target.id === user.id) {
    console.log(`${user.tag} got hit with the swift hammer of justice in the guild ${guild.name}, wielded by the mighty ${executor.tag}`);
  } else {
    console.log(`${user.tag} got hit with the swift hammer of justice in the guild ${guild.name}, audit log fetch was inconclusive.`);
  }
});

client.on('message', msg => {
    if(msg.author.bot) return;
      const currentDate = new Date();
      const guildTag = msg.channel.type === 'text' ? `[${msg.guild.name}]` : '[DM]';
      const channelTag = msg.channel.type === 'text' ? `[#${msg.channel.name}]` : '';
      myConsole.log(`${currentDate}${guildTag}${channelTag} ${msg.author.tag}: ${msg.content}`);
});

client.on('message', async message => {
  if(message.content === "*button-test"){
  const button = new MessageButton()
    .setLabel("ca")
    .setStyle("red")
    .setID("btn1")
  const button1 = new MessageButton()
    .setLabel("marche")
    .setStyle("red")
    .setID("btn2")
  const button2 = new MessageButton()
    .setLabel("normalement")
    .setStyle("red")
    .setID("btn3")
          let row = new MessageActionRow()
          .addComponents(button, button1, button2);
  
  message.channel.send("is it work?", row)
  

  }
})


client.on('clickButton', async (button) => {
  if(button.id === "btn1"){
    await button.reply.defer()
    await button.message.channel.send("yep, ca marche")
  }
});
client.on('clickButton', async (button) => {
  if(button.id === "btn2"){
    await button.reply.defer()
    await button.message.channel.send("yep, ca marche")
  }
});
client.on('clickButton', async (button) => {
  if(button.id === "btn3"){
    await button.reply.defer()
    await button.message.channel.send("yep, ca marche")
  }
});

require('./server')();
client.login('NDgwMDMyMjYwOTkzNTgxMDU2.W3bm4Q.egUcjUJ6s4szsZo7eDlGIstcoDY');