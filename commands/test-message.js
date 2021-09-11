module.exports = {
  name: 'test-message',
  description: 'un simple test',
  execute(message, args) {

    message.channel.send("le bot est bien en ligne");
    console.log("test message reçu! ")
  }
  //fin de execute
};
  //fin de module.exports