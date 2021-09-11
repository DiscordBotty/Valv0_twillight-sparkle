module.exports = {
  name: 'help-staff',
  description: 'page d aide',
  execute(message, args) {
    message.channel.send("_kick `@mention` raison: Expulse un membre du serveur. Celui-ci peut revenir à l’aide d’une invitation. \n_bak-ban `@mention` `raison`: l\'extention Botty Bak-Ban est néssesaire, pour plus d'info, `_bak-help`.\n_warn `@mention` `raison` : avertir un membre du serveur. à partir de 3 warns, l'équipe sécurité de botty débattra sur un possible bakban.\n_lock : Permet de bloquer le salon sélectionné.\n_unlock : Permet de débloquer le salon sélectionné.")
    console.log("help-staff reçu !")
  },
};