module.exports = {
  name: 'unlock',
  description: 'débloquer un channel',
  execute(message, args) {
    message.channel.updateOverwrite(message.channel.guild.roles.everyone, { VIEW_CHANNEL: true, SEND_MESSAGES: true });
        message.channel.send(" Le salon **${message.channel.name}** à été débloqué avec succès.")
  }
  //fin de execute
  
  
};
  //fin de module.exports