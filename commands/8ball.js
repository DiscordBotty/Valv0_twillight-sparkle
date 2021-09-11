module.exports = {
  name: '8ball',
  description: 'commande de réponse',
  execute(message, args) {

  function doMagic8BallVoodoo() {
    var rand = [':8ball: Absolument!', ':8ball: Absolument pas.', ':8ball: cest .', ':8ball: Impossible.', ':8ball: Of course.', ':8ball: I do not think so.', ':8ball: It is true.', ':8ball: It is not true.', ':8ball: I am very undoubtful of that.', ':8ball: I am very doubtful of that.', ':8ball: Sources point to no.', ':8ball: Theories prove it.', ':8ball: Reply hazy try again', ':8ball: Ask again later', ':8ball: Better not tell you now', ':8ball: Cannot predict now', ':8ball: Concentrate and ask again'];

    return rand[Math.floor(Math.random()*rand.length)];
}

   if (message.content = "8ball") {
    message.channel.send(doMagic8BallVoodoo())
    }
}
}