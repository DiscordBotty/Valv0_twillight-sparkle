module.exports = {
  name: 'lock',
  description: 'bloquer un channel',
  execute(message, args) {
    message.channel.updateOverwrite(message.channel.guild.roles.everyone, { VIEW_CHANNEL: false, SEND_MESSAGES: false });
        message.channel.send(':lock: le salon ${message.channel.name} a été bloqué!')
  }
  //fin de execute
};
  //fin de module.exports