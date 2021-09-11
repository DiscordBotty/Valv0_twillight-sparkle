module.exports = {
  name: 'warn',
  description: 'avertir quelqu\'un',
  execute(message, args) {

    let dUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(":x: - Vous ne pouvez pas utiliser cette commande! la permission ADMINISTRATEUR est demandé. ")
    if (!dUser) return message.channel.send(":x: - Ce membre n'existe pas.")
    let dMessage = args.join(" ").slice(22);
    if (dMessage.length < 1) return message.reply(':warning: - une raison de kick est nécessaire. ')

    dUser.send(`${dUser}, vous avez été warn pour la raison:  ${dMessage} sur le serveur ${message.guild.name}. faites attention!`)

    message.channel.send(`${dUser} a été averti pour la raison: ${dMessage}.`)
    console.log(`${dUser} have been warned for doing ${dMessage} in the server ${message.guild.name}`)
  }
  //fin de execute
};
  //fin de module.exports