module.exports = {
  name: 'say',
  description: 'le bot répète tes mots',
  execute(message, args) {
    let text = args.join(" ");
  message.delete();
  message.channel.send(text);
  }
  //fin de execute
};
  //fin de module.exports