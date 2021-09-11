module.exports = {
  name: "serverinfo",
  description: "Display information about the current server",
  async execute(message, args) {
    // If the message is in a server
    if (message.guild) {
      let admins = "";
      message.guild.members.cache.array().forEach(member => {
        if (member.hasPermission("ADMINISTRATOR")) {
          admins += member.displayName + ", ";
        }
      });
      admins = admins.slice(0, admins.lastIndexOf(","));
      const embed = {
        embed: {
          color: 3447003,
          title: message.guild.name,
          thumbnail: {
            url: message.guild.iconURL()
          },
          fields: [
            {
              name: "Admins",
              value: admins
            },
            {
              name: "Date de création",
              value: `${message.guild.createdAt.toDateString()} at ${message.guild.createdAt.toTimeString()}`
            },
            {
              name: "nombres de salons",
              value: message.guild.channels.cache.size
            },
            {
              name: "nombres d'humain",
              // Filter the members list to only include non-bots
              value: message.guild.members.cache.filter(member => !member.user.bot)
                .size
            },
            {
              name: "nombres de robot",
              // Filter the list to only include bots
              value: message.guild.members.cache.filter(member => member.user.bot)
                .size
            }
          ],
          timestamp: new Date(),
          footer: {
            text: `ID: ${message.guild.id}`
          }
        }
      };
      return message.channel.send(embed);
    }
    else {
      // The message was sent in a DM, can't retrieve the server info
      return message.reply(
        ":warning: - tu dois envoyer cette commande depuis un serveur."
      );
    }
  }
};